import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";
import { toast } from "react-toastify";
import "./success.css"; // Import CSS file

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  console.log("Token from URL:", token);
  
  const decoded = base64Decode(token);
  console.log("Decoded token:", decoded);

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post("http://localhost:5000/payment-status", {
        product_id: decoded.transaction_uuid,
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading && !isSuccess) return <div className="loading">Loading...</div>;
  if (!isLoading && !isSuccess)
    return (
      <div className="error-container">
        <h1>Oops! Error occurred on confirming payment</h1>
        <h2>We will resolve it soon.</h2>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </div>
    );

  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction was successful.</p>
      <button onClick={() => navigate("/fundraiser")} className="go-home-button">
        Go to HomePage
      </button>
    </div>
  );
};

export default Success;

