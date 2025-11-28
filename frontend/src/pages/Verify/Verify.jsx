import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchPArams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, token } = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(
      url + "/api/order/verify",
      {
        success,
        orderId,
      },
      { headers: { token } }
    );

    if (response.data.success) {
      navigate("/myOrders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
      console.log("Token : ", token);
    }
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
