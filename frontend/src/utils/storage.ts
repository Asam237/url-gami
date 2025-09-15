import { SavedUrl } from "../types/url.types";

const STORAGE_KEY = "shortener_urls";

export const saveUrlToHistory = (url: SavedUrl) => {
  const existing = getUrlHistory();
  const updated = [url, ...existing.filter((u) => u.id !== url.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
};

export const getUrlHistory = (): SavedUrl[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const removeUrlFromHistory = (id: number) => {
  const existing = getUrlHistory();
  const filtered = existing.filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearUrlHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
