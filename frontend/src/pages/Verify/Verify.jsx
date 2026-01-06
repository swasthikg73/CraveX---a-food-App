import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import axiosPrivate from "../../api/axios";

const Verify = () => {
  const [searchParams, setSearchPArams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token } = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axiosPrivate.post("/api/order/verify", {
      success,
      orderId,
    });

    if (response.data.success) {
      //  console.log("Success");

      navigate("/myOrders");
    } else {
      // console.log("Failure");

      navigate("/");
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
