import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import AppDownload from "./components/AppDownloads/AppDownload";
import { useState } from "react";
import LoginPopup from "./components/LoginPopUp/LoginPopup";
import Verify from "./pages/Verify/verify";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
  const [showLogin, SetShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup SetShowLogin={SetShowLogin} /> : <></>}
      <div className="app">
        <Navbar SetShowLogin={SetShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myOrders" element={<MyOrders />} />
        </Routes>
      </div>
      <AppDownload />
      <Footer />
    </>
  );
}

export default App;
