import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyProperties, createProperty } from "../../api/properties.js";
import { getPublicSettings } from "../../api/settings.js";
import { Upload, X, PlusCircle, IndianRupee, AlertTriangle } from "lucide-react";

const MAX_PHOTOS = 5;

const STATUS_STYLES = {
  pending: "bg-gold-50 text-gold-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
  hidden: "bg-paper-dim text-ink-soft",
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const load = () => {
    setLoadError("");
    getMyProperties()
      .then(({ data }) => setProperties(data.properties))
      .catch((err) => {
        setLoadError(err.response?.data?.message || err.message || "Could not load your properties.");
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

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
            <div key={p._id} className="bg-white rounded-xl2 shadow-card p-4 flex gap-4 items-center">
              <div className="w-24 h-20 rounded-lg overflow-hidden bg-paper-dim flex-shrink-0">
                {p.images?.[0]?.url && <img src={p.images[0].url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyForm({ onCreated }) {
  const [minPrice, setMinPrice] = useState(8000);
  const [form, setForm] = useState({
    title: "", description: "", rooms: 1, address: "", pincode: "", area: "",
    propertyType: "rent", sellerPrice: 8000, discount: 0,
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
        // Event spaces don't have a meaningful room count — send 0 rather
        // than whatever leftover value was in the form.
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
        <label className="mt-1 flex items-center gap-2 justify-center border-2 border-dashed border-black/15 rounded-lg py-4 cursor-pointer hover:border-emerald-500">
          <Upload className="w-4 h-4 text-ink-soft" />
          <span className="text-sm text-ink-soft">Tap to upload from your phone/gallery</span>
          <input type="file" accept="image/*" multiple capture="environment" className="hidden"
            onChange={(e) => handleFiles(e.target.files)} />
        </label>
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
