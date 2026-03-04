import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { readFileSync, writeFileSync } from "node:fs";
import type { ServerResponse } from "node:http";

const STATE_FILE = "./cocktail-state.json";

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf-8"));
  } catch {
    return { counts: new Array(12).fill(0), soldOut: new Array(12).fill(false) };
  }
}

function cocktailSyncPlugin() {
  let state = loadState();
  const sseClients = new Set<ServerResponse>();

  function broadcast() {
    const data = `data: ${JSON.stringify(state)}\n\n`;
    sseClients.forEach((res) => res.write(data));
  }

  return {
    name: "cocktail-sync",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/state" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(state));

        } else if (req.url === "/api/update" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              state = JSON.parse(body);
              writeFileSync(STATE_FILE, JSON.stringify(state));
              broadcast();
              res.end("ok");
            } catch {
              res.statusCode = 400;
              res.end("bad request");
            }
          });

        } else if (req.url === "/api/events" && req.method === "GET") {
          res.setHeader("Content-Type", "text/event-stream");
          res.setHeader("Cache-Control", "no-cache");
          res.setHeader("Connection", "keep-alive");
          res.write(`data: ${JSON.stringify(state)}\n\n`);
          sseClients.add(res);
          req.on("close", () => sseClients.delete(res));

        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    cocktailSyncPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
