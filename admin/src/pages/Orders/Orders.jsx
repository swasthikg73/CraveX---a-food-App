import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async (value) => {
    if (!value) {
    }
    const res = await axios.get(url + "/api/order/list?status=" + value);
    if (res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error("Error");
      console.log("Error");
    }
  };
  useEffect(() => {
    getOrders("");
  }, []);

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(url + "/api/order/update-status", {
      orderId: orderId,
      status: event.target.value,
    });

    if (res.data.success) {
      toast.success(res.data.message);
    } else toast.error(res.data.message);
    getOrders("");
  };

  return (
    <>
      <ToastContainer />
      <div className="order add">
        <div className="heading-filter">
          <h3>Order Page</h3>
          <div className="filter">
            <p>Apply filter : </p>
            <select
              onChange={(e) => getOrders(e.target.value)}
              className="filter-dropdown"
              name=""
              id="">
              <option value="" default>
                All
              </option>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for delivery</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    }
                    return item.name + " x " + item.quantity + ", ";
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                name=""
                id=""
                onChange={(event) => {
                  statusHandler(event, order._id);
                }}
                value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
