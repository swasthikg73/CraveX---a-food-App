import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalAmt, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: userData,
      items: orderItems,
      amount: getTotalAmt() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Error");
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={placeOrder} action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              required
              value={userData.firstName}
              placeholder="First Name"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="lastName"
              required
              value={userData.lastName}
              placeholder="Last Name"
              onChange={onChangeHandler}
            />
          </div>
          <input
            type="email"
            name="email"
            required
            value={userData.email}
            placeholder="Email address"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="street"
            required
            value={userData.street}
            placeholder="Street"
            onChange={onChangeHandler}
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              required
              value={userData.city}
              placeholder="City"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="state"
              required
              value={userData.state}
              placeholder="State"
              onChange={onChangeHandler}
            />
          </div>

          <div className="multi-fields">
            <input
              type="text"
              name="zipcode"
              required
              value={userData.zipcode}
              placeholder="Zip code"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="country"
              required
              value={userData.country}
              placeholder="Country"
              onChange={onChangeHandler}
            />
          </div>
          <input
            type="number"
            name="phone"
            required
            value={userData.phone}
            placeholder="Phone"
            onChange={onChangeHandler}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalAmt()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalAmt() === 0 ? 0 : getTotalAmt() + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
