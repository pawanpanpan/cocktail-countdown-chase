import { useState, useEffect, useCallback } from "react";
import { cocktails } from "@/data/cocktails";

const CHANNEL_NAME = "cocktail-sync";
const STORAGE_KEY = "cocktail-counts";
const SOLDOUT_KEY = "cocktail-soldout";

interface SyncMessage {
  type: "update";
  counts: number[];
  soldOut: boolean[];
}

export const useCocktailSync = () => {
  const [cocktailCounts, setCocktailCounts] = useState<number[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure array length matches cocktails
        if (parsed.length < cocktails.length) {
          return [...parsed, ...new Array(cocktails.length - parsed.length).fill(0)];
        }
        return parsed;
      } catch {
        return new Array(cocktails.length).fill(0);
      }
    }
    return new Array(cocktails.length).fill(0);
  });

  const [soldOut, setSoldOut] = useState<boolean[]>(() => {
    const stored = localStorage.getItem(SOLDOUT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.length < cocktails.length) {
          return [...parsed, ...new Array(cocktails.length - parsed.length).fill(false)];
        }
        return parsed;
      } catch {
        return new Array(cocktails.length).fill(false);
      }
    }
    return new Array(cocktails.length).fill(false);
  });

  const [channel] = useState(() => new BroadcastChannel(CHANNEL_NAME));

  useEffect(() => {
    const handleMessage = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === "update") {
        setCocktailCounts(event.data.counts);
        setSoldOut(event.data.soldOut);
      }
    };

    channel.addEventListener("message", handleMessage);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try { setCocktailCounts(JSON.parse(event.newValue)); } catch {}
      }
      if (event.key === SOLDOUT_KEY && event.newValue) {
        try { setSoldOut(JSON.parse(event.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      channel.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [channel]);

  const broadcast = useCallback((counts: number[], so: boolean[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    localStorage.setItem(SOLDOUT_KEY, JSON.stringify(so));
    channel.postMessage({ type: "update", counts, soldOut: so } as SyncMessage);
  }, [channel]);

  const increment = useCallback((index: number) => {
    const newCounts = [...cocktailCounts];
    newCounts[index] = cocktailCounts[index] + 1;
    setCocktailCounts(newCounts);
    broadcast(newCounts, soldOut);
  }, [cocktailCounts, soldOut, broadcast]);

  const decrement = useCallback((index: number) => {
    if (cocktailCounts[index] <= 0) return;
    const newCounts = [...cocktailCounts];
    newCounts[index] = cocktailCounts[index] - 1;
    setCocktailCounts(newCounts);
    broadcast(newCounts, soldOut);
  }, [cocktailCounts, soldOut, broadcast]);

  const toggleSoldOut = useCallback((index: number) => {
    const newSoldOut = [...soldOut];
    newSoldOut[index] = !newSoldOut[index];
    setSoldOut(newSoldOut);
    broadcast(cocktailCounts, newSoldOut);
  }, [cocktailCounts, soldOut, broadcast]);

  const reset = useCallback(() => {
    const newCounts = new Array(cocktails.length).fill(0);
    const newSoldOut = new Array(cocktails.length).fill(false);
    setCocktailCounts(newCounts);
    setSoldOut(newSoldOut);
    broadcast(newCounts, newSoldOut);
  }, [broadcast]);

  const totalDrinksServed = cocktailCounts.reduce((sum, count) => sum + count, 0);

  const mostPopularIndex = cocktailCounts.reduce((maxIdx, count, idx, arr) => {
    if (count === 0) return maxIdx;
    if (maxIdx === -1) return idx;
    return count > arr[maxIdx] ? idx : maxIdx;
  }, -1);

  return {
    cocktailCounts,
    totalDrinksServed,
    mostPopularIndex,
    soldOut,
    increment,
    decrement,
    toggleSoldOut,
    reset,
  };
};
