import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";

import axios from "axios";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const res = await axios.get(url + "/api/order/userOrders", {
      headers: { token },
    });

    if (res.data.success) {
      setData(res.data.data);
      console.log(res.data.data);
    } else {
      console.log("Eror");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div ley={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  }
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
