import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BedDouble, MapPin, Tag, ShieldCheck, Loader2, CheckCircle2, CalendarDays } from "lucide-react";
import { getPropertyById } from "../api/properties.js";
import { requestBooking } from "../api/bookings.js";
import { useAuth } from "../context/AuthContext.jsx";

// This page NEVER receives or displays a seller phone number — the API
// endpoint it calls (public /properties/:id) doesn't return one at all.
// No payment happens here either — "Request to Book" only notifies Admin
// and the pincode's Owner (with the buyer's own registered contact).
export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [error, setError] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    getPropertyById(id)
      .then(({ data }) => setProperty(data.property))
      .catch((err) => {
        const status = err.response?.status ?? "no response (network/CORS error)";
        const message = err.response?.data?.message || err.message;
        setError(`${message} (status: ${status})`);
      });
  }, [id]);

  if (error) return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink-soft">{error}</div>;
  if (!property) return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink-soft">Loading...</div>;

  const isEvent = property.propertyType === "event";
  const finalPrice = property.discount
    ? Math.round(property.displayPrice * (1 - property.discount / 100))
    : property.displayPrice;

  const handleRequestBooking = async () => {
    setRequestError("");
    if (isEvent && !eventDate) {
      setRequestError("Please pick a date for this event space.");
      return;
    }
    setRequesting(true);
    try {
      await requestBooking(property._id, isEvent ? eventDate : undefined);
      setRequested(true);
    } catch (err) {
      setRequestError(err.response?.data?.message || "Could not send your request. Please try again.");
    } finally {
      setRequesting(false);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="rounded-xl2 overflow-hidden bg-paper-dim h-96">
          {property.images?.[activeImg]?.url && (
            <img src={property.images[activeImg].url} alt={property.title} className="w-full h-full object-cover" />
          )}
        </div>
        {property.images?.length > 1 && (
          <div className="flex gap-2 mt-3">
            {property.images.map((img, i) => (
              <button
                key={img.publicId}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${i === activeImg ? "border-emerald-600" : "border-transparent"}`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <h1 className="text-2xl font-display font-bold mt-6">{property.title}</h1>
        <p className="text-ink-soft flex items-center gap-1 mt-1">
          <MapPin className="w-4 h-4" /> {property.address}, {property.area} — {property.pincode}
        </p>

        <div className="flex gap-6 mt-4 text-sm text-ink-soft">
          {!isEvent && (
            <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {property.rooms} rooms</span>
          )}
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Admin verified</span>
        </div>

        <p className="mt-6 text-ink leading-relaxed">{property.description}</p>
      </div>

      <div className="bg-white rounded-xl2 shadow-card p-6 h-fit sticky top-20">
        <span className="inline-block rounded-full bg-emerald-600 text-white text-xs font-semibold px-3 py-1 uppercase mb-3">
          {property.propertyType === "rent" ? "For Rent" : isEvent ? "Event Space" : "For Sale"}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-emerald-700">₹{finalPrice?.toLocaleString("en-IN")}</span>
          {property.propertyType === "rent" && <span className="text-ink-soft text-sm">/month</span>}
          {isEvent && <span className="text-ink-soft text-sm">/day</span>}
        </div>
        {property.discount > 0 && (
          <p className="text-sm text-gold-600 flex items-center gap-1 mt-1">
            <Tag className="w-3.5 h-3.5" /> {property.discount}% off original price
          </p>
        )}

        {property.isBooked && !isEvent ? (
          <div className="mt-6 rounded-xl bg-paper-dim p-4 text-center text-sm text-ink-soft">
            This property has already been booked.
          </div>
        ) : requested ? (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-xl bg-emerald-50 p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <p className="font-semibold text-emerald-800">Request sent!</p>
            <p className="text-xs text-ink-soft">
              Our team will review and get in touch with you. Track this in your{" "}
              <Link to="/dashboard/buyer" className="text-emerald-700 underline">dashboard</Link>.
            </p>
          </div>
        ) : user?.role === "buyer" ? (
          <>
            {isEvent && (
              <div className="mt-4">
                <label className="text-sm font-medium text-ink flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-emerald-600" /> Choose your date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
                />
              </div>
            )}
            {requestError && <p className="mt-4 text-sm text-red-600">{requestError}</p>}
            <button
              onClick={handleRequestBooking}
              disabled={requesting}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 disabled:opacity-60"
            >
              {requesting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending request...</> : "Request to Book"}
            </button>
            <p className="text-xs text-ink-soft text-center mt-2">
              We'll share your registered phone number with our team only — never with the Seller directly.
            </p>
          </>
        ) : (
          <Link
            to="/login"
            className="mt-6 block text-center rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700"
          >
            Login as Buyer to Request
          </Link>
        )}
        <p className="text-xs text-ink-soft text-center mt-3">
          For your privacy and safety, seller contact details are managed by our platform.
        </p>
      </div>
    </div>
  );
}
