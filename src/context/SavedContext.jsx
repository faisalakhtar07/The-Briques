import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";
import { getSavedProperties, toggleSavedProperty } from "../api/users.js";

const SavedContext = createContext(null);

// Wishlist state lives here (not per-component) so the heart icon on a
// PropertyCard in the grid and the one on PropertyDetails always agree,
// without every component re-fetching the whole saved list itself.
export const SavedProvider = ({ children }) => {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user?.role !== "buyer") {
      setSavedIds(new Set());
      setLoaded(false);
      return;
    }
    getSavedProperties()
      .then(({ data }) => setSavedIds(new Set(data.properties.map((p) => p._id))))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user?.role]);

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds]);

  const toggle = useCallback(async (id) => {
    // Optimistic update — flip it locally first, then reconcile with the
    // server response in case something changed in another tab.
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    try {
      const { data } = await toggleSavedProperty(id);
      setSavedIds((prev) => {
        const next = new Set(prev);
        data.saved ? next.add(id) : next.delete(id);
        return next;
      });
    } catch {
      // Revert on failure.
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }
  }, []);

  return (
    <SavedContext.Provider value={{ savedIds, isSaved, toggle, loaded }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
