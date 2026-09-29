const KEY = "briques_recently_viewed";
const MAX_ITEMS = 12;

// Purely a per-browser convenience — never sent to the backend on its own;
// PropertyDetails calls addRecentlyViewed(id) on view, and the Home page
// resolves the stored ids back into full property objects via
// GET /properties/by-ids.

export const getRecentlyViewedIds = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addRecentlyViewed = (propertyId) => {
  try {
    const ids = getRecentlyViewedIds().filter((id) => id !== propertyId);
    ids.unshift(propertyId);
    localStorage.setItem(KEY, JSON.stringify(ids.slice(0, MAX_ITEMS)));
  } catch {
    // localStorage unavailable (private browsing, etc.) — not worth surfacing an error for.
  }
};
