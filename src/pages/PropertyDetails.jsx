import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BedDouble, MapPin, Tag, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { getPropertyById } from "../api/properties.js";
import { createPaymentOrder, verifyPayment } from "../api/payments.js";
import { loadRazorpayScript } from "../hooks/useRazorpay.js";
import { useAuth } from "../context/AuthContext.jsx";

// This page NEVER receives or displays a seller phone number — the API
// endpoint it calls (public /properties/:id) doesn't return one at all.
export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [paid, setPaid] = useState(false);

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

  const finalPrice = property.discount
    ? Math.round(property.displayPrice * (1 - property.discount / 100))
    : property.displayPrice;

  // Full buy/book flow: create a Razorpay order on our backend, open the
  // Razorpay checkout modal, then verify the signature on our backend so
  // the Transaction/Payment records are only marked complete after a real,
  // verified payment — never just because the modal closed.
  const handleBuyNow = async () => {
    setPayError("");
    setPaying(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setPayError("Could not load the payment gateway. Check your connection and try again.");
        return;
      }

      const { data: order } = await createPaymentOrder(property._id);

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.order.amount,
        currency: order.order.currency,
        name: "The Briques",
        description: property.title,
        order_id: order.order.id,
        prefill: { name: user.name, email: user.email },
        theme: { color: "#0E6E4F" },
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: order.paymentId,
            });
            setPaid(true);
          } catch (err) {
            setPayError(err.response?.data?.message || "Payment succeeded but verification failed. Contact support with your payment ID.");
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });

      razorpay.on("payment.failed", (resp) => {
        setPayError(resp.error?.description || "Payment failed. Please try again.");
        setPaying(false);
      });

      razorpay.open();
    } catch (err) {
      setPayError(err.response?.data?.message || "Could not start payment. Please try again.");
    } finally {
      setPaying(false);
    }
  };

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
          <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {property.rooms} rooms</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Admin verified</span>
        </div>

        <p className="mt-6 text-ink leading-relaxed">{property.description}</p>
      </div>

      <div className="bg-white rounded-xl2 shadow-card p-6 h-fit sticky top-20">
        <span className="inline-block rounded-full bg-emerald-600 text-white text-xs font-semibold px-3 py-1 uppercase mb-3">
          {property.propertyType === "rent" ? "For Rent" : "For Sale"}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-emerald-700">₹{finalPrice?.toLocaleString("en-IN")}</span>
          {property.propertyType === "rent" && <span className="text-ink-soft text-sm">/month</span>}
        </div>
        {property.discount > 0 && (
          <p className="text-sm text-gold-600 flex items-center gap-1 mt-1">
            <Tag className="w-3.5 h-3.5" /> {property.discount}% off original price
          </p>
        )}

        {paid ? (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-xl bg-emerald-50 p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <p className="font-semibold text-emerald-800">Payment successful!</p>
            <p className="text-xs text-ink-soft">
              We've notified the Owner for your area. Track this in your{" "}
              <Link to="/dashboard/buyer" className="text-emerald-700 underline">dashboard</Link>.
            </p>
          </div>
        ) : user?.role === "buyer" ? (
          <>
            {payError && <p className="mt-4 text-sm text-red-600">{payError}</p>}
            <button
              onClick={handleBuyNow}
              disabled={paying}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 disabled:opacity-60"
            >
              {paying ? <><Loader2 className="w-4 h-4 animate-spin" /> Opening payment...</> : "Buy Now"}
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="mt-6 block text-center rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700"
          >
            Login as Buyer to Purchase
          </Link>
        )}
        <p className="text-xs text-ink-soft text-center mt-3">
          For your privacy and safety, seller contact details are managed by our platform.
        </p>
      </div>
    </div>
  );
}
