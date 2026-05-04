// hooks.js — PandaStudioX custom hooks
import { useState, useEffect, useCallback } from "react";

/* ─── useScrolled ──────────────────────────────────────────
   Returns true once the page scrolls past `threshold` px    */
export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    fn(); // run once on mount
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

/* ─── useNotif ─────────────────────────────────────────────
   Push toast notifications with auto-dismiss               */
export function useNotif() {
  const [list, setList] = useState([]);
  const push = useCallback((msg, type = "ok") => {
    const id = Date.now() + Math.random();
    setList(p => [...p, { id, msg, type }]);
    setTimeout(() => setList(p => p.filter(n => n.id !== id)), 4000);
  }, []);
  return { list, push };
}

/* ─── useCountdown ─────────────────────────────────────────
   Daily countdown — resets to midnight each day            */
export function useCountdown() {
  const getSecsLeft = () => {
    const now  = new Date();
    const end  = new Date(now);
    end.setHours(23, 59, 59, 999);
    return Math.floor((end - now) / 1000);
  };
  const [secs, setSecs] = useState(getSecsLeft);
  useEffect(() => {
    const iv = setInterval(() => setSecs(getSecsLeft()), 1000);
    return () => clearInterval(iv);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return { h, m, s };
}

/* ─── useOrderSlots ────────────────────────────────────────
   Tracks remaining order slots for the day (real via localStorage) */
export function useOrderSlots(max = 10) {
  const todayKey = () => `slots_${new Date().toDateString()}`;
  const getUsed = () => {
    try { return parseInt(localStorage.getItem(todayKey()) || "0", 10); }
    catch { return 0; }
  };
  const [used, setUsed] = useState(getUsed);
  const consume = useCallback(() => {
    const next = getUsed() + 1;
    try { localStorage.setItem(todayKey(), String(next)); } catch {}
    setUsed(next);
  }, []);
  return { slots: Math.max(0, max - used), consume };
}

/* ─── useLocalStorage ──────────────────────────────────────
   Persisted state synced to localStorage                   */
export function useLocalStorage(key, defaultVal) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultVal;
    } catch { return defaultVal; }
  });
  const set = useCallback(v => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, set];
}
