// Keep this in sync with the `category` enum in backend/models/Property.js.
export const CATEGORY_LABELS = {
  marriage_hall: "Marriage Hall",
  hotel: "Hotel",
  banquet_hall: "Banquet Hall",
  apartment: "Apartment",
  shop: "Shop",
  land: "Land",
  other: "Other",
};

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }));

export const PROPERTY_TYPE_LABELS = {
  rent: "For Rent",
  sell: "For Sale",
  event: "Event Space (per day)",
};
