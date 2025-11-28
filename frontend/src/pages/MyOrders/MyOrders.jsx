import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";

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

  return <div>My Orders</div>;
};

export default MyOrders;
