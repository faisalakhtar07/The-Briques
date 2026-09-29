import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyProperties, createProperty, updateMyProperty, updateMyPropertyPrice, updateMyPropertyImages } from "../../api/properties.js";
import { getSellerBookings } from "../../api/bookings.js";
import { getPublicSettings } from "../../api/settings.js";
import { getMyNotifications } from "../../api/notifications.js";
import EnableNotificationsButton from "../../components/EnableNotificationsButton.jsx";
import { X, PlusCircle, IndianRupee, AlertTriangle, Bell, Camera, Images, Pencil, Trash2, BarChart3 } from "lucide-react";
import { CATEGORY_OPTIONS } from "../../data/categories.js";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const MAX_PHOTOS = 5;
const BOOKING_COLORS = { approved: "#059669", pending: "#d4a017", rejected: "#dc2626" };

const STATUS_STYLES = {
  pending: "bg-gold-50 text-gold-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
  hidden: "bg-paper-dim text-ink-soft",
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editingProperty, setEditingProperty] = useState(null);

  const load = () => {
    setLoadError("");
    getMyProperties()
      .then(({ data }) => setProperties(data.properties))
      .catch((err) => {
        setLoadError(err.response?.data?.message || err.message || "Could not load your properties.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // This was the actual bug: the Seller dashboard never fetched or
    // displayed notifications at all (Buyer's dashboard did) — so
    // "your property has been booked" alerts were being created in the
    // database correctly, but the Seller had nowhere in the UI to see them.
    getMyNotifications().then(({ data }) => setNotifications(data.notifications)).catch(() => {});
    getSellerBookings().then(({ data }) => setBookings(data.bookings)).catch(() => {});
  }, []);

  const viewsData = properties
    .filter((p) => p.status === "approved")
    .map((p) => ({ name: p.title.length > 14 ? `${p.title.slice(0, 14)}…` : p.title, views: p.views || 0 }));

  const bookingCounts = ["approved", "pending", "rejected"].map((status) => ({
    name: status,
    value: bookings.filter((b) => b.status === status).length,
  })).filter((d) => d.value > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Welcome, {user?.name?.split(" ")[0]}</h1>
          <p className="text-ink-soft text-sm">Manage your property listings.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-full bg-emerald-600 text-white font-semibold px-5 py-2.5 hover:bg-emerald-700"
        >
          <PlusCircle className="w-4 h-4" /> {showForm ? "Close form" : "Add Property"}
        </button>
      </div>

      <EnableNotificationsButton />

      {notifications.length > 0 && (
        <div className="bg-white rounded-xl2 shadow-card p-5 mb-8">
          <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-emerald-600" /> Notifications
          </h2>
          <ul className="space-y-3">
            {notifications.slice(0, 8).map((n) => (
              <li key={n._id} className="text-sm border-b border-black/5 pb-2">
                <p className="font-medium">{n.title}</p>
                <p className="text-ink-soft">{n.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(viewsData.length > 0 || bookingCounts.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {viewsData.length > 0 && (
            <div className="bg-white rounded-xl2 shadow-card p-5">
              <h2 className="font-display font-semibold flex items-center gap-2 mb-4 text-sm">
                <BarChart3 className="w-4 h-4 text-emerald-600" /> Views per Property
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={viewsData}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {bookingCounts.length > 0 && (
            <div className="bg-white rounded-xl2 shadow-card p-5">
              <h2 className="font-display font-semibold flex items-center gap-2 mb-4 text-sm">
                <BarChart3 className="w-4 h-4 text-emerald-600" /> Booking Requests
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={bookingCounts} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2}>
                    {bookingCounts.map((entry) => (
                      <Cell key={entry.name} fill={BOOKING_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <PropertyForm
          onCreated={() => { setShowForm(false); load(); }}
        />
      )}

      <h2 className="text-lg font-display font-semibold mt-10 mb-4">Your Properties</h2>
      {loading ? (
        <p className="text-ink-soft text-sm">Loading...</p>
      ) : loadError ? (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Couldn't load your properties.</p>
            <p className="text-xs mt-1">{loadError}</p>
          </div>
        </div>
      ) : properties.length === 0 ? (
        <p className="text-ink-soft text-sm">You haven't listed any property yet.</p>
      ) : (
        <div className="space-y-4">
          {properties.map((p) => (
            <div
              key={p._id}
              onClick={() => setEditingProperty(p)}
              className="bg-white rounded-xl2 shadow-card p-4 flex gap-4 items-center cursor-pointer hover:ring-2 hover:ring-emerald-500/40 transition-shadow"
            >
              <div className="w-24 h-20 rounded-lg overflow-hidden bg-paper-dim flex-shrink-0">
                {p.images?.[0]?.url && <img src={p.images[0].url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>
                  {p.isBooked && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      Booked
                    </span>
                  )}
                </div>
                <p className="text-ink-soft text-sm">
                  {p.pincode} · {p.propertyType === "rent" ? "Rent" : p.propertyType === "event" ? "Event Space (per day)" : "Sale"}
                </p>
                {p.rejectionReason && <p className="text-red-600 text-xs mt-1">Reason: {p.rejectionReason}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-soft">Your price: ₹{p.sellerPrice?.toLocaleString("en-IN")}</p>
                <p className="font-bold text-emerald-700 flex items-center justify-end gap-0.5">
                  <IndianRupee className="w-3.5 h-3.5" /> {p.displayPrice?.toLocaleString("en-IN")}
                  {p.status === "approved" && <span className="text-xs text-ink-soft ml-1">(admin-approved)</span>}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <Pencil className="w-3 h-3" /> Edit
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSaved={() => { setEditingProperty(null); load(); }}
        />
      )}
    </div>
  );
}

function EditPropertyModal({ property, onClose, onSaved }) {
  const canEditDetails = property.status !== "approved";

  const [details, setDetails] = useState({
    title: property.title,
    description: property.description,
    rooms: property.rooms,
    address: property.address,
    pincode: property.pincode,
    area: property.area || "",
    city: property.city,
    propertyType: property.propertyType,
    category: property.category || "other",
  });
  const [priceForm, setPriceForm] = useState({
    sellerPrice: property.sellerPrice,
    discount: property.discount || 0,
  });
  const [existingImages, setExistingImages] = useState(property.images || []);
  const [removeIds, setRemoveIds] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [savingPhotos, setSavingPhotos] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const remainingSlots = MAX_PHOTOS - (existingImages.length - removeIds.length) - newPhotos.length;

  const toggleRemove = (publicId) => {
    setRemoveIds((prev) => (prev.includes(publicId) ? prev.filter((id) => id !== publicId) : [...prev, publicId]));
  };

  const handleAddPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    setNewPhotos((prev) => [...prev, ...files].slice(0, prev.length + remainingSlots));
    e.target.value = "";
  };

  const savePhotos = async (e) => {
    e.preventDefault();
    setSavingPhotos(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      removeIds.forEach((id) => formData.append("removeIds", id));
      newPhotos.forEach((file) => formData.append("images", file));
      const { data } = await updateMyPropertyImages(property._id, formData);
      setExistingImages(data.property.images);
      setRemoveIds([]);
      setNewPhotos([]);
      setSuccess("Photos updated — listing sent back for re-review.");
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update photos.");
    } finally {
      setSavingPhotos(false);
    }
  };

  const savePrice = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateMyPropertyPrice(property._id, priceForm);
      setSuccess("Price updated.");
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update price.");
    } finally {
      setSaving(false);
    }
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateMyProperty(property._id, details);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-2xl sm:rounded-xl2 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg">{property.title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {success && <p className="text-emerald-600 text-sm mb-3">{success}</p>}

        {/* Price — editable regardless of approval status; goes live immediately. */}
        <form onSubmit={savePrice} className="space-y-3 border border-black/10 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold">Update Price</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink-soft">Your Price (₹)</label>
              <input type="number" min="1" value={priceForm.sellerPrice}
                onChange={(e) => setPriceForm({ ...priceForm, sellerPrice: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-ink-soft">Discount (%)</label>
              <input type="number" min="0" max="100" value={priceForm.discount}
                onChange={(e) => setPriceForm({ ...priceForm, discount: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
            </div>
          </div>
          <button disabled={saving} type="submit"
            className="w-full rounded-full bg-emerald-600 text-white text-sm font-semibold py-2 hover:bg-emerald-700 disabled:opacity-60">
            {saving ? "Saving..." : "Save Price"}
          </button>
        </form>

        {/* Photos — same "not yet approved" rule as details, since adding/
            removing photos sends the listing back for re-review too. */}
        {canEditDetails && (
          <form onSubmit={savePhotos} className="space-y-3 border border-black/10 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold flex items-center gap-2"><Images className="w-4 h-4" /> Manage Photos</p>
            <div className="grid grid-cols-3 gap-2">
              {existingImages.map((img) => {
                const marked = removeIds.includes(img.publicId);
                return (
                  <div key={img.publicId} className={`relative rounded-lg overflow-hidden aspect-square ${marked ? "opacity-40" : ""}`}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => toggleRemove(img.publicId)}
                      className="absolute top-1 right-1 bg-white/90 rounded-full p-1"
                      title={marked ? "Undo remove" : "Remove photo"}
                    >
                      {marked ? <PlusCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Trash2 className="w-3.5 h-3.5 text-red-600" />}
                    </button>
                  </div>
                );
              })}
              {newPhotos.map((file, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden aspect-square border border-dashed border-emerald-400">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setNewPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-white/90 rounded-full p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  </button>
                </div>
              ))}
              {remainingSlots > 0 && (
                <label className="flex items-center justify-center aspect-square rounded-lg border border-dashed border-black/20 cursor-pointer text-ink-soft hover:border-emerald-500">
                  <Camera className="w-5 h-5" />
                  <input type="file" accept="image/*" multiple hidden onChange={handleAddPhotos} />
                </label>
              )}
            </div>
            <p className="text-xs text-ink-soft">Up to {MAX_PHOTOS} photos total. At least one must remain.</p>
            <button
              disabled={savingPhotos || (removeIds.length === 0 && newPhotos.length === 0)}
              type="submit"
              className="w-full rounded-full bg-emerald-600 text-white text-sm font-semibold py-2 hover:bg-emerald-700 disabled:opacity-60"
            >
              {savingPhotos ? "Saving..." : "Save Photos"}
            </button>
          </form>
        )}

        {/* Other details — only while not yet approved; matches the backend
            rule that an approved, live listing's details go through Admin. */}
        {canEditDetails ? (
          <form onSubmit={saveDetails} className="space-y-3 border border-black/10 rounded-lg p-4">
            <p className="text-sm font-semibold">Edit Details</p>
            <p className="text-xs text-ink-soft -mt-2">Saving these will send the listing back for re-review.</p>
            <div>
              <label className="text-xs text-ink-soft">Title</label>
              <input value={details.title} onChange={(e) => setDetails({ ...details, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-ink-soft">Description</label>
              <textarea rows={3} value={details.description} onChange={(e) => setDetails({ ...details, description: e.target.value })}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-ink-soft">City</label>
                <input value={details.city} onChange={(e) => setDetails({ ...details, city: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-ink-soft">Pincode</label>
                <input value={details.pincode} onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs text-ink-soft">Area</label>
              <input value={details.area} onChange={(e) => setDetails({ ...details, area: e.target.value })}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-ink-soft">Address</label>
              <input value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
            </div>
            {details.propertyType !== "event" && (
              <div>
                <label className="text-xs text-ink-soft">Rooms</label>
                <input type="number" min="0" value={details.rooms} onChange={(e) => setDetails({ ...details, rooms: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-ink-soft">Type</label>
                <select value={details.propertyType} onChange={(e) => setDetails({ ...details, propertyType: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm">
                  <option value="rent">Rent</option>
                  <option value="sell">Sell</option>
                  <option value="event">Event Space (per day)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-ink-soft">Category</label>
                <select value={details.category} onChange={(e) => setDetails({ ...details, category: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm">
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button disabled={saving} type="submit"
              className="w-full rounded-full bg-ink text-white text-sm font-semibold py-2 hover:opacity-90 disabled:opacity-60">
              {saving ? "Saving..." : "Save Details"}
            </button>
          </form>
        ) : (
          <p className="text-xs text-ink-soft border border-black/10 rounded-lg p-4">
            This listing is already approved and live — title, description, and other details can only be changed by Admin. Price above is the exception.
          </p>
        )}
      </div>
    </div>
  );
}

function PropertyForm({ onCreated }) {
  const [minPrice, setMinPrice] = useState(8000);
  const [form, setForm] = useState({
    title: "", description: "", rooms: 1, address: "", pincode: "", area: "", city: "",
    propertyType: "rent", category: "other", sellerPrice: 8000, discount: 0,
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEvent = form.propertyType === "event";

  useEffect(() => {
    getPublicSettings()
      .then(({ data }) => {
        const min = data.settings.minPropertyPrice;
        if (min) {
          setMinPrice(min);
          setForm((prev) => ({ ...prev, sellerPrice: min }));
        }
      })
      .catch(() => {});
  }, []);

  const handleFiles = (fileList) => {
    const incoming = Array.from(fileList);
    if (images.length + incoming.length > MAX_PHOTOS) {
      setError("Maximum 5 photos are allowed for one property.");
      return;
    }
    setError("");
    setImages((prev) => [...prev, ...incoming]);
  };

  const removeImage = (idx) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (Number(form.sellerPrice) < minPrice) {
      setError(`Minimum property price is ₹${minPrice.toLocaleString("en-IN")}.`);
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "rooms" && isEvent) fd.append(k, 0);
        else fd.append(k, v);
      });
      images.forEach((img) => fd.append("images", img));
      await createProperty(fd);
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create property.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl2 shadow-card p-6 space-y-4 mb-8">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Title" required value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        {!isEvent && (
          <Field label="Rooms" type="number" min={0} required value={form.rooms} onChange={(v) => setForm({ ...form, rooms: v })} />
        )}
        <Field label="Address" required value={form.address} onChange={(v) => setForm({ ...form, address: v })} className="sm:col-span-2" />
        <Field label="City" required value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="e.g. Aurangabad" />
        <Field label="Pincode" required value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} />
        <Field label="Area" value={form.area} onChange={(v) => setForm({ ...form, area: v })} />

        <div>
          <label className="text-sm font-medium">Property Type</label>
          <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm">
            <option value="rent">Rent (monthly)</option>
            <option value="sell">Sell</option>
            <option value="event">Event Space (per day — wedding hall etc.)</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm">
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <p className="text-xs text-ink-soft mt-1">Lets buyers filter — e.g. "Marriage Hall" or "Hotel" under Event Space.</p>
        </div>
        <Field label={`Your price (₹${isEvent ? "/day" : ""}, min ${minPrice.toLocaleString("en-IN")})`}
          type="number" min={minPrice} required value={form.sellerPrice}
          onChange={(v) => setForm({ ...form, sellerPrice: v })} />
        <Field label="Discount % (optional)" type="number" min={0} max={100} value={form.discount}
          onChange={(v) => setForm({ ...form, discount: v })} />
      </div>

      {isEvent && (
        <p className="text-xs text-gold-600 bg-gold-50 rounded-lg px-3 py-2">
          Event spaces are booked by the day. Buyers will pick a specific date when requesting to book —
          you don't need to enter a room count.
        </p>
      )}

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="text-sm font-medium">Photos (max {MAX_PHOTOS})</label>
        {/* Two separate inputs — one that explicitly asks for the camera
            (capture="environment") and one plain gallery input. On some
            installed/PWA WebViews, a single generic file input jumps
            straight to the camera and hides the gallery option entirely —
            splitting them gives a direct, unambiguous path to each. */}
        <div className="mt-1 grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 justify-center border-2 border-dashed border-black/15 rounded-lg py-4 cursor-pointer hover:border-emerald-500">
            <Images className="w-4 h-4 text-ink-soft" />
            <span className="text-sm text-ink-soft">Choose from Gallery</span>
            <input type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => handleFiles(e.target.files)} />
          </label>
          <label className="flex items-center gap-2 justify-center border-2 border-dashed border-black/15 rounded-lg py-4 cursor-pointer hover:border-emerald-500">
            <Camera className="w-4 h-4 text-ink-soft" />
            <span className="text-sm text-ink-soft">Take Photo</span>
            <input type="file" accept="image/*" capture="environment" className="hidden"
              onChange={(e) => handleFiles(e.target.files)} />
          </label>
        </div>
        {images.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {images.map((img, i) => (
              <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden">
                <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(i)}
                  className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-ink-soft mt-1">{images.length}/{MAX_PHOTOS} photos selected</p>
      </div>

      <button disabled={submitting} type="submit"
        className="w-full rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 disabled:opacity-60">
        {submitting ? "Submitting..." : "Submit for Admin Review"}
      </button>
    </form>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} onChange={(e) => props.onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
    </div>
  );
}
