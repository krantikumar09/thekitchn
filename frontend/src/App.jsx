import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import "./output.css";
import "swiper/css";
import "swiper/css/navigation";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";

function App() {
  const [isLoginPopOpen, setIsLoginPopOpen] = useState(false);

  return (
    <>
      {isLoginPopOpen ? (
        <LoginPopup
          isOpen={isLoginPopOpen}
          onClose={() => setIsLoginPopOpen(false)}
        />
      ) : (
        <></>
      )}
      <ToastContainer position="top-center" />
      <Header setIsLoginPopOpen={setIsLoginPopOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorder" element={<MyOrders />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
