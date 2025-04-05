
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaFileUpload } from "react-icons/fa";
// import "./campaignCreator.css";
// import { toast } from "react-toastify";

// const CampaignCreator = () => {
//   const [campaignId, setCampaignId] = useState(null); // Store campaign ID
//   const [formData, setFormData] = useState({
//     placeName: "",
//     category: "",
//     beneficiary: "",
//     image: null,
//     title: "",
//     description: "",
//     targetAmount: "",
//   });
//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [reviewMode, setReviewMode] = useState(false);
//   const [isVerified, setIsVerified] = useState(false); // For account verification
//   const [loading, setLoading] = useState(true); // Loading state

//   // Check account verification when component mounts
//   useEffect(() => {
//     const checkVerificationStatus = async () => {
//       try {
//         const token = localStorage.getItem("auth-token");
//         if (!token) {
//           toast.error("Token not found, please log in again.");
//           return;
//         }
//         const response = await axios.get("http://localhost:5000/api/profile", {
//           headers: { "auth-token": token },
//         });
//         setIsVerified(response.data.isVerified);
//       } catch (error) {
//         console.error("Error checking verification status:", error);
//         setIsVerified(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkVerificationStatus();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!isVerified) {
//     return (
//       <div className="not-verified-container">
//         <h2>
//           Your account is not verified. Please verify your account to create a
//           campaign.
//         </h2>
//       </div>
//     );
//   }

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" })); // Clear field error
//   };

//   // Handle file input
//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//     setErrors((prev) => ({ ...prev, image: "" })); // Clear error for image field
//   };

//   // Validate fields for the current step
//   const validateStep = () => {
//     const stepErrors = {};
//     if (step === 1 && !formData.placeName) {
//       stepErrors.placeName = "Please specify where this fund will go.";
//     }
//     if (step === 2 && !formData.category) {
//       stepErrors.category = "Please select a category.";
//     }
//     if (step === 3 && !formData.beneficiary) {
//       stepErrors.beneficiary =
//         "Please specify whom you are collecting funds for.";
//     }
//     if (step === 4 && !formData.image) {
//       stepErrors.image = "Please upload an image.";
//     }
//     if (step === 5) {
//       if (!formData.title) stepErrors.title = "Title is required.";
//       if (!formData.description)
//         stepErrors.description = "Description is required.";
//       if (
//         !formData.targetAmount ||
//         isNaN(formData.targetAmount) ||
//         Number(formData.targetAmount) <= 0
//       ) {
//         stepErrors.targetAmount = "Please enter a valid target amount.";
//       }
//     }

//     setErrors(stepErrors);
//     return Object.keys(stepErrors).length === 0;
//   };

//   // Proceed to next step
//   const handleNextStep = () => {
//     if (validateStep()) {
//       setStep((prevStep) => prevStep + 1);
//     }
//   };

//   // Go back to previous step
//   const handlePreviousStep = () => {
//     setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
//   };

//   // Switch to review mode (validate step 5 before switching)
//   const handleReview = () => {
//     if (validateStep()) {
//       setReviewMode(true);
//     }
//   };

//   // Switch to edit mode: exit review mode and go back to step 1
//   const handleEdit = () => {
//     setReviewMode(false);
//     setStep(1);
//   };

//   // Submit campaign after review
//   const handleSubmit = async () => {
//     const token = localStorage.getItem("auth-token");
//     if (!token) {
//       toast.error("Token is missing, please log in again.");
//       return;
//     }

//     // Final check: make sure all fields are filled before submission
//     if (
//       !formData.placeName ||
//       !formData.category ||
//       !formData.beneficiary ||
//       !formData.title ||
//       !formData.description ||
//       !formData.targetAmount ||
//       !formData.image
//     ) {
//       toast.error("Please fill all the fields.");
//       return;
//     }

//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });



//       console.log('form data',formData);
//       const res = await axios.post("http://localhost:5000/api/campaigns", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data && res.data.campaignId) {
//         console.log('submit',res.data);
        
//         setCampaignId(res.data.campaignId);
//         localStorage.setItem("campaignId", res.data.campaignId);
//         toast.success("Campaign successfully submitted ");
//       } else {
//         console.error("No campaign ID received in response.");
//         toast.error("Campaign submission failed.");
//       }

//       // Reset form and state after successful submission
//       setFormData({
//         placeName: "",
//         category: "",
//         beneficiary: "",
//         image: null,
//         title: "",
//         description: "",
//         targetAmount: "",
//       });
//       setStep(1);
//       setReviewMode(false);
//     } catch (error) {
//       console.error("Error submitting campaign:", error);
//       toast.error("There was an error submitting your campaign. Please try again.");
//     }
//   };

//   // Render the form step or the review mode based on state
//   const renderStep = () => {
//     if (reviewMode) {
//       return (
//         <div className="review-section">
//           <h2>Review Your Campaign</h2>
//           <p>
//             <strong>Place Name:</strong> {formData.placeName}
//           </p>
//           <p>
//             <strong>Category:</strong> {formData.category}
//           </p>
//           <p>
//             <strong>Beneficiary:</strong> {formData.beneficiary}
//           </p>
//           {formData.image && (
//             <img
//               src={URL.createObjectURL(formData.image)}
//               alt="Campaign"
//               className="review-image"
//             />
//           )}
//           <p>
//             <strong>Title:</strong> {formData.title}
//           </p>
//           <p>
//             <strong>Description:</strong> {formData.description}
//           </p>
//           <p>
//             <strong>Target Amount:</strong> ${formData.targetAmount}
//           </p>
//           <button onClick={handleEdit} className="btn-secondary">
//             Edit Campaign
//           </button>
//           <button onClick={handleSubmit} className="btn-primary">
//             Submit Campaign
//           </button>
//         </div>
//       );
//     }

//     // Render individual steps based on the current step value
//     switch (step) {
//       case 1:
//         return (
//           <div>
//             <h2>Where will this fund go?</h2>
//             <input
//               type="text"
//               name="placeName"
//               value={formData.placeName}
//               onChange={handleChange}
//               placeholder="Enter the place name"
//               className="input-field"
//             />
//             {errors.placeName && <p className="error">{errors.placeName}</p>}
//             <button onClick={handleNextStep} className="btn-primary">
//               Continue
//             </button>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             <h2>What best describes your fundraiser?</h2>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="input-select"
//             >
//               <option value="">Select Category</option>
//               <option value="Medical">Medical</option>
//               <option value="Animals">Animals</option>
//               <option value="Education">Education</option>
//               <option value="Family">Family</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.category && <p className="error">{errors.category}</p>}
//             <button onClick={handlePreviousStep} className="btn-secondary">
//               Back
//             </button>
//             <button onClick={handleNextStep} className="btn-primary">
//               Continue
//             </button>
//           </div>
//         );
//       case 3:
//         return (
//           <div>
//             <h2>Whom are you collecting funds for?</h2>
//             <select
//               name="beneficiary"
//               value={formData.beneficiary}
//               onChange={handleChange}
//               className="input-select"
//             >
//               <option value="">Select Beneficiary</option>
//               <option value="Yourself">Yourself</option>
//               <option value="Someone Else">Someone Else</option>
//               <option value="Charity">Charity</option>
//             </select>
//             {errors.beneficiary && (
//               <p className="error">{errors.beneficiary}</p>
//             )}
//             <button onClick={handlePreviousStep} className="btn-secondary">
//               Back
//             </button>
//             <button onClick={handleNextStep} className="btn-primary">
//               Continue
//             </button>
//           </div>
//         );
//       case 4:
//         return (
//           <div>
//             <h2>Upload a Photo</h2>
//             <div
//               className="file-upload-container"
//               onClick={() => document.getElementById("file-upload").click()}
//             >
//               <label className="file-upload-label">
//                 <FaFileUpload className="upload-icon" /> Click to upload
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="input-file-hidden"
//               />
//             </div>
//             {errors.image && <p className="error">{errors.image}</p>}
//             <button onClick={handlePreviousStep} className="btn-secondary">
//               Back
//             </button>
//             <button onClick={handleNextStep} className="btn-primary">
//               Continue
//             </button>
//           </div>
//         );
//       case 5:
//         return (
//           <div>
//             <h2>Details of Your Fundraiser</h2>
//             <label>Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter campaign title"
//               className="input-field"
//             />
//             {errors.title && <p className="error">{errors.title}</p>}

//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe your campaign"
//               className="textarea-field"
//             />
//             {errors.description && (
//               <p className="error">{errors.description}</p>
//             )}

//             <label>Target Amount (in USD):</label>
//             <input
//               type="number"
//               name="targetAmount"
//               value={formData.targetAmount}
//               onChange={handleChange}
//               placeholder="Enter target amount"
//               className="input-field"
//             />
//             {errors.targetAmount && (
//               <p className="error">{errors.targetAmount}</p>
//             )}

//             <button onClick={handlePreviousStep} className="btn-secondary">
//               Back
//             </button>
//             {/* Only show the Review button. Submission is available only in review mode */}
//             <button onClick={handleReview} className="btn-primary">
//               Review Campaign
//             </button>
//           </div>
//         );
//       default:
//         return <p>Invalid step</p>;
//     }
//   };

//   return (
//     <div className="campaign-creator-container">
//       {renderStep()}
//     </div>
//   );
// };

// export default CampaignCreator;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import "./campaignCreator.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
const CampaignCreator = () => {
  const [campaignId, setCampaignId] = useState(null); // Store campaign ID
  const [formData, setFormData] = useState({
    placeName: "",
    category: "",
    beneficiary: "",
    image: null,
    title: "",
    description: "",
    targetAmount: "",
    startDate: "",
    endDate: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // For account verification
  const [loading, setLoading] = useState(true); // Loading state
 const Navigate = useNavigate();
  // Check account verification when component mounts
  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        if (!token) {
          toast.error("Token not found, please log in again.");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { "auth-token": token },
        });
        setIsVerified(response.data.isVerified);
      } catch (error) {
        console.error("Error checking verification status:", error);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    checkVerificationStatus();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isVerified) {
    return (
      <div className="not-verified-container">
        <h2>
          Your account is not verified. Please verify your account to create a
          campaign.
        </h2>
      </div>
    );
  }
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    if (name === "endDate" && formData.startDate) {
      const start = new Date(formData.startDate);
      const end = new Date(value);
      const maxEndDate = new Date(start);
      maxEndDate.setMonth(maxEndDate.getMonth() + 6); // Add 6 months to start date
  
      if (end > maxEndDate) {
        setErrors((prev) => ({
          ...prev,
          endDate: "Campaign duration cannot exceed 6 months.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, endDate: "" }));
      }
    }
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear field error
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    setErrors((prev) => ({ ...prev, image: "" })); // Clear error for image field
  };

  // Validate fields for the current step
  const validateStep = () => {
    const stepErrors = {};
    if (step === 1 && !formData.placeName) {
      stepErrors.placeName = "Please specify where this fund will go.";
    }
    if (step === 2 && !formData.category) {
      stepErrors.category = "Please select a category.";
    }
    if (step === 3 && !formData.beneficiary) {
      stepErrors.beneficiary =
        "Please specify whom you are collecting funds for.";
    }
    if (step === 4 && !formData.image) {
      stepErrors.image = "Please upload an image.";
    }
    if (step === 5) {
      if (!formData.title) stepErrors.title = "Title is required.";
      if (!formData.description)
        stepErrors.description = "Description is required.";
      if (
        !formData.targetAmount ||
        isNaN(formData.targetAmount) ||
        Number(formData.targetAmount) <= 0
      ) {
        stepErrors.targetAmount = "Please enter a valid target amount.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Proceed to next step
  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  // Go back to previous step
  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  // Switch to review mode (validate step 5 before switching)
  const handleReview = () => {
    if (validateStep()) {
      setReviewMode(true);
    }
  };

  // Switch to edit mode: exit review mode and go back to step 1
  const handleEdit = () => {
    setReviewMode(false);
    setStep(1);
  };

  // Submit campaign after review
  const handleSubmit = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.error("Token is missing, please log in again.");
      return;
    }
    
    // Final check: make sure all fields are filled before submission
    if (
      !formData.placeName ||
      !formData.category ||
      !formData.beneficiary ||
      !formData.title ||
      !formData.description ||
      !formData.targetAmount ||
      !formData.image
    ) {
      toast.error("Please fill all the fields.");
      return;
    }
  
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axios.post("http://localhost:5000/api/campaigns", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data && res.data.campaignId) {
        setCampaignId(res.data.campaignId);
        localStorage.setItem("campaignId", res.data.campaignId);
        toast.success("Campaign successfully submitted ");
        Navigate('/Fundraiser')
      } else {
        console.error("No campaign ID received in response.");
        toast.error("Campaign submission failed.");
      }

      // Reset form and state after successful submission
      setFormData({
        placeName: "",
        category: "",
        beneficiary: "",
        image: null,
        title: "",
        description: "",
        targetAmount: "",
      });
      setStep(1);
      setReviewMode(false);
    } catch (error) {
      console.error("Error submitting campaign:", error);
      toast.error("There was an error submitting your campaign. Please try again.");
    }
  };

  // Render the form step or the review mode based on state
  const renderStep = () => {
    if (reviewMode) {
      return (
        <div className="review-section">
          <h2>Review Your Campaign</h2>
          <p>
            <strong>Place Name:</strong> {formData.placeName}
          </p>
          <p>
            <strong>Category:</strong> {formData.category}
          </p>
          <p>
            <strong>Beneficiary:</strong> {formData.beneficiary}
          </p>
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Campaign"
              className="review-image"
            />
          )}
          <p>
            <strong>Title:</strong> {formData.title}
          </p>
          <p>
            <strong>Description:</strong> {formData.description}
          </p>
          <p>
            <strong>Target Amount:</strong> ${formData.targetAmount}
          </p>
          <button onClick={handleEdit} className="btn-secondary">
            Edit Campaign
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            Submit Campaign
          </button>
        </div>
      );
    }

    // Render individual steps based on the current step value
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Where will this fund go?</h2>
            <input
              type="text"
              name="placeName"
              value={formData.placeName}
              onChange={handleChange}
              placeholder="Enter the place name"
              className="input-field"
            />
            {errors.placeName && <p className="error">{errors.placeName}</p>}
            <button onClick={handleNextStep} className="btn-primary">
              Continue
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>What best describes your fundraiser?</h2>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-select"
            >
              <option value="">Select Category</option>
              <option value="Medical">Medical</option>
              <option value="Animals">Animals</option>
              <option value="Education">Education</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
            <button onClick={handlePreviousStep} className="btn-secondary">
              Back
            </button>
            <button onClick={handleNextStep} className="btn-primary">
              Continue
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Whom are you collecting funds for?</h2>
            <select
              name="beneficiary"
              value={formData.beneficiary}
              onChange={handleChange}
              className="input-select"
            >
              <option value="">Select Beneficiary</option>
              <option value="Yourself">Yourself</option>
              <option value="Someone Else">Someone Else</option>
              <option value="Charity">Charity</option>
            </select>
            {errors.beneficiary && (
              <p className="error">{errors.beneficiary}</p>
            )}
            <button onClick={handlePreviousStep} className="btn-secondary">
              Back
            </button>
            <button onClick={handleNextStep} className="btn-primary">
              Continue
            </button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Upload a Photo</h2>
            <div
              className="file-upload-container"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <label className="file-upload-label">
                <FaFileUpload className="upload-icon" /> Click to upload
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input-file-hidden"
              />
            </div>
            {errors.image && <p className="error">{errors.image}</p>}
            <button onClick={handlePreviousStep} className="btn-secondary">
              Back
            </button>
            <button onClick={handleNextStep} className="btn-primary">
              Continue
            </button>
          </div>
        );
      case 5:
        return (
          <div>
            <h2>Details of Your Fundraiser</h2>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter campaign title"
              className="input-field"
            />
            {errors.title && <p className="error">{errors.title}</p>}
            <label>Start Date:</label>
<input
  type="date"
  name="startDate"
  value={formData.startDate}
  onChange={handleDateChange}
  className="input-field"
/>

<label>End Date:</label>
<input
  type="date"
  name="endDate"
  value={formData.endDate}
  onChange={handleDateChange}
  className="input-field"
/>
{errors.endDate && <p className="error">{errors.endDate}</p>}

            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your campaign"
              className="textarea-field"
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}

            <label>Target Amount (in USD):</label>
            <input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="Enter target amount"
              className="input-field"
            />
            {errors.targetAmount && (
              <p className="error">{errors.targetAmount}</p>
            )}



            <button onClick={handlePreviousStep} className="btn-secondary">
              Back
            </button>
            {/* Only show the Review button. Submission is available only in review mode */}
            <button onClick={handleReview} className="btn-primary">
              Review Campaign
            </button>
          </div>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="campaign-creator-container">
      {renderStep()}
    </div>
  );
};

export default CampaignCreator;