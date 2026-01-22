import { useState, useEffect, useCallback } from "react";
import { cocktails } from "@/data/cocktails";

const CHANNEL_NAME = "cocktail-sync";
const STORAGE_KEY = "cocktail-counts";

interface SyncMessage {
  type: "update";
  counts: number[];
}

export const useCocktailSync = () => {
  const [cocktailCounts, setCocktailCounts] = useState<number[]>(() => {
    // Initialize from localStorage if available
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return new Array(cocktails.length).fill(0);
      }
    }
    return new Array(cocktails.length).fill(0);
  });

  const [channel] = useState(() => new BroadcastChannel(CHANNEL_NAME));

  // Listen for updates from other tabs
  useEffect(() => {
    const handleMessage = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === "update") {
        setCocktailCounts(event.data.counts);
      }
    };

    channel.addEventListener("message", handleMessage);

    // Also listen for storage events (fallback for older browsers)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          setCocktailCounts(JSON.parse(event.newValue));
        } catch {
          // Ignore parse errors
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      channel.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [channel]);

  // Broadcast and persist updates
  const updateCounts = useCallback((newCounts: number[]) => {
    setCocktailCounts(newCounts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCounts));
    channel.postMessage({ type: "update", counts: newCounts } as SyncMessage);
  }, [channel]);

  const increment = useCallback((index: number) => {
    const totalDrinksServed = cocktailCounts.reduce((sum, count) => sum + count, 0);
    if (totalDrinksServed >= 100) return;

    const newCounts = [...cocktailCounts];
    newCounts[index] = cocktailCounts[index] + 1;
    updateCounts(newCounts);
  }, [cocktailCounts, updateCounts]);

  const decrement = useCallback((index: number) => {
    if (cocktailCounts[index] <= 0) return;

    const newCounts = [...cocktailCounts];
    newCounts[index] = cocktailCounts[index] - 1;
    updateCounts(newCounts);
  }, [cocktailCounts, updateCounts]);

  const reset = useCallback(() => {
    updateCounts(new Array(cocktails.length).fill(0));
  }, [updateCounts]);

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
    increment,
    decrement,
    reset,
  };
};
