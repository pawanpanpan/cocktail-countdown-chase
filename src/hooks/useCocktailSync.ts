import { useState, useEffect, useCallback, useRef } from "react";
import { cocktails } from "@/data/cocktails";

interface State {
  counts: number[];
  soldOut: boolean[];
}

const DEFAULT_STATE: State = {
  counts: new Array(cocktails.length).fill(0),
  soldOut: new Array(cocktails.length).fill(false),
};

export const useCocktailSync = () => {
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    // Fetch current state on mount
    fetch("/api/state")
      .then((r) => r.json())
      .then((data) => {
        // Ensure array lengths match in case cocktails list changed
        const counts = data.counts ?? [];
        const soldOut = data.soldOut ?? [];
        setState({
          counts: cocktails.map((_, i) => counts[i] ?? 0),
          soldOut: cocktails.map((_, i) => soldOut[i] ?? false),
        });
      })
      .catch(() => {});

    // Subscribe to real-time updates via SSE
    const es = new EventSource("/api/events");
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setState({
          counts: cocktails.map((_, i) => (data.counts ?? [])[i] ?? 0),
          soldOut: cocktails.map((_, i) => (data.soldOut ?? [])[i] ?? false),
        });
      } catch {}
    };

    return () => es.close();
  }, []);

  const postUpdate = useCallback((newState: State) => {
    setState(newState);
    fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newState),
    }).catch(() => {});
  }, []);

  const increment = useCallback((index: number) => {
    const s = stateRef.current;
    const newCounts = [...s.counts];
    newCounts[index] = s.counts[index] + 1;
    postUpdate({ counts: newCounts, soldOut: s.soldOut });
  }, [postUpdate]);

  const decrement = useCallback((index: number) => {
    const s = stateRef.current;
    if (s.counts[index] <= 0) return;
    const newCounts = [...s.counts];
    newCounts[index] = s.counts[index] - 1;
    postUpdate({ counts: newCounts, soldOut: s.soldOut });
  }, [postUpdate]);

  const toggleSoldOut = useCallback((index: number) => {
    const s = stateRef.current;
    const newSoldOut = [...s.soldOut];
    newSoldOut[index] = !newSoldOut[index];
    postUpdate({ counts: s.counts, soldOut: newSoldOut });
  }, [postUpdate]);

  const reset = useCallback(() => {
    postUpdate({ ...DEFAULT_STATE });
  }, [postUpdate]);

  const totalDrinksServed = state.counts.reduce((sum, count) => sum + count, 0);

  const mostPopularIndex = state.counts.reduce((maxIdx, count, idx, arr) => {
    if (count === 0) return maxIdx;
    if (maxIdx === -1) return idx;
    return count > arr[maxIdx] ? idx : maxIdx;
  }, -1);

  return {
    cocktailCounts: state.counts,
    totalDrinksServed,
    mostPopularIndex,
    soldOut: state.soldOut,
    increment,
    decrement,
    toggleSoldOut,
    reset,
  };
};
