import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import ChooseRole from "./pages/ChooseRole.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import OwnerLogin from "./pages/OwnerLogin.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

import BuyerDashboard from "./pages/dashboard/BuyerDashboard.jsx";
import SellerDashboard from "./pages/dashboard/SellerDashboard.jsx";
import OwnerDashboard from "./pages/dashboard/OwnerDashboard.jsx";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/choose-role" element={<ChooseRole />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/dashboard/buyer"
            element={<ProtectedRoute allow={["buyer"]}><BuyerDashboard /></ProtectedRoute>}
          />
          <Route
            path="/dashboard/seller"
            element={<ProtectedRoute allow={["seller"]}><SellerDashboard /></ProtectedRoute>}
          />
          <Route
            path="/dashboard/owner"
            element={<ProtectedRoute allow={["owner"]}><OwnerDashboard /></ProtectedRoute>}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
