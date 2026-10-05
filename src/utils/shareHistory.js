const KEY = "briques_share_history";
const MAX_ITEMS = 50;

// IMPORTANT LIMITATION: once wa.me opens, WhatsApp's own contact picker
// takes over — the website has zero visibility into which contact the
// person actually chose. So this can only ever log "you shared property X
// on this date", never "you shared it WITH so-and-so". That's a WhatsApp
// privacy boundary, not something fixable from our side.

export const getShareHistory = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const logShare = (propertyTitle, propertyId) => {
  try {
    const history = getShareHistory();
    history.unshift({ propertyTitle, propertyId, sharedAt: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(history.slice(0, MAX_ITEMS)));
  } catch {
    // localStorage unavailable — not worth surfacing an error for a log.
  }
};

export const clearShareHistory = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {}
};
