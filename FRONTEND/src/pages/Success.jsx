import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {base64Decode} from "esewajs"
import axios from "axios";
import { toast } from "react-toastify";
const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  // Create a new URLSearchParams object using the search string from location
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  console.log("Token from URL:", token);
  // Decode the JWT without verifying the signature
  const decoded = base64Decode(token);
  console.log("Decoded token:", decoded);
  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/payment-status",
        {
          product_id: decoded.transaction_uuid,
        }
      );
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
  if (isLoading && !isSuccess) return <>Loading...</>;
  if (!isLoading && !isSuccess)
    return (
      <>
        <h1>Oops!..Error occurred on confirming payment</h1>
        <h2>We will resolve it soon.</h2>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </>
    );
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction was successful.</p>
      <button onClick={() => navigate("/")} className="go-home-button">
        Go to Homepage
      </button>
    </div>
  );
};
export default Success;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { base64Decode } from "esewajs";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Success = () => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();
//   // const { fundraiser,campaignId } = location.state || {}; // Get fundraiser data
//   // Get query params and token from URL
//   const queryParams = new URLSearchParams(location.search);
//   const token = queryParams.get("data");
//   // Extract campaignId from the query parameters
//   // const activeCampaignId = campaignId || fundraiser?._id;  // Use the campaignId from state, or fallback to fundraiser._id
//   // console.log("Campaign ID of success page:", activeCampaignId);

//   // Decode the token (assuming it contains transaction details)
//   const decoded = base64Decode(token);
//   console.log("Decoded token:", decoded);

//   // Retrieve campaignId from localStorage
//   // const storedCampaignId = localStorage.getItem("campaignId");
//   // console.log("Campaign ID from localStorage:", storedCampaignId);
 
//   // const updateRaisedAmount = async (campaignId) => {
//   //   try {
//   //     const response = await axios.post("http://localhost:5000/api/update-raised-amount", {
//   //       campaignId,
//   //     });

//   //     if (response.status === 200) {
//   //       toast.success("Campaign updated with new raised amount!");
//   //     } else {
//   //       toast.error("Error updating campaign raised amount.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating raised amount:", error);
//   //     toast.error("Error occurred while updating raised amount.");
//   //   }
//   // };

//   const verifyPaymentAndUpdateStatus = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/payment-status", {
//         product_id: decoded.transaction_uuid,
//       });

//       // if (response.status === 200) {
//       //   // Use campaignId from localStorage
//       //   if (storedCampaignId) {
//       //     await updateRaisedAmount(storedCampaignId);
//       //   } else {
//       //     toast.error("Campaign ID is missing.");
//       //   }
//         setIsLoading(false);
//         setIsSuccess(true);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error verifying payment:", error);
//       toast.error("Error during payment verification.");
//     }
//   };

//   useEffect(() => {
//     verifyPaymentAndUpdateStatus();
//   }, []);

//   if (isLoading && !isSuccess) return <>Loading...</>;

//   if (!isLoading && !isSuccess)
//     return (
//       <>
//         <h1>Oops!..Error occurred on confirming payment</h1>
//         <h2>We will resolve it soon.</h2>
//         <button onClick={() => navigate("/")} className="go-home-button">
//           Go to Homepage
//         </button>
//       </>
//     );

//   return (
//     <div>
//       <h1>Payment Successful!</h1>
//       <p>Thank you for your payment. Your transaction was successful.</p>
//       <button onClick={() => navigate("/")} className="go-home-button">
//         Go to Homepage
//       </button>
//     </div>
//   );
// };

// export default Success;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { base64Decode } from "esewajs";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Success = () => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get query params and token from URL
//   const queryParams = new URLSearchParams(location.search);

//   const campaignIdFromQuery = queryParams.get("campaignId");


//   console.log("URL Parameters:", location.search);

//   // Determine the active campaign ID from query or state
//   const activeCampaignId = campaignIdFromQuery 
//   console.log("Campaign ID from Query:", campaignIdFromQuery);
 
//   console.log("Final Active Campaign ID:", activeCampaignId);
  
//   if (!activeCampaignId) {
//     console.error("Campaign ID is missing.");
//     toast.error("Campaign ID is missing.");
//     setIsLoading(false);
//   }
//   const token = queryParams.get("data");
//   console.log('token',token);
  
//   // Decode the token safely
//   let decoded = null;
//   if (token) {
//     try {
//       decoded = base64Decode(token);
//       console.log("Decoded token:", decoded);
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       toast.error("Invalid payment data received.");
//     }
//   } else {
//     console.error("Token is missing from URL.");
//     toast.error("Payment verification data is missing.");
//   }

//   console.log("Active Campaign ID:", activeCampaignId);

//   // Update raised amount function
//   const updateRaisedAmount = async (campaignId) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/update-raised-amount", {
//         campaignId,
//       });

//       if (response.status === 200) {
//         toast.success("Campaign updated with new raised amount!");
//       } else {
//         toast.error("Error updating campaign raised amount.");
//       }
//     } catch (error) {
//       console.error("Error updating raised amount:", error);
//       toast.error("Error occurred while updating raised amount.");
//     }
//   };

//   // Verify payment and update status
//   const verifyPaymentAndUpdateStatus = async () => {
//     if (!decoded || !decoded.transaction_uuid) {
//       console.error("Transaction UUID is missing.");
//       toast.error("Transaction details are missing.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       console.log("Verifying payment with transaction UUID:", decoded.transaction_uuid);

//       const response = await axios.post("http://localhost:5000/payment-status", {
//         product_id: decoded.transaction_uuid,
//       });

//       console.log("Payment verification response:", response.data);

//       if (response.status === 200) {
//         // Update raised amount for the campaign
//         await updateRaisedAmount(activeCampaignId);
//         setIsSuccess(true);
//       } else {
//         console.error("Payment verification failed:", response);
//         toast.error("Payment verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       toast.error("Error during payment verification.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (decoded) {
//       verifyPaymentAndUpdateStatus();
//     }
//   }, [decoded]);

//   if (isLoading) return <h1>Loading payment verification...</h1>;

//   if (!isSuccess)
//     return (
//       <div>
//         <h1>Oops!..Error occurred on confirming payment</h1>
//         <h2>We will resolve it soon.</h2>
//         <button onClick={() => navigate("/")} className="go-home-button">
//           Go to Homepage
//         </button>
//       </div>
//     );

//   return (
//     <div>
//       <h1>Payment Successful!</h1>
//       <p>Thank you for your payment. Your transaction was successful.</p>
//       <button onClick={() => navigate("/")} className="go-home-button">
//         Go to Homepage
//       </button>
//     </div>
//   );
// };

// export default Success;
