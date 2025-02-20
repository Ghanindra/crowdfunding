// import React, { useState } from "react";
// import axios from "axios";
// import { FaFileUpload } from "react-icons/fa";
// import "./campaignCreator.css";

// const CampaignCreator = () => {
//   const [formData, setFormData] = useState({
//     placeName: "",
//     category: "",
//     beneficiary: "",
//     image: null,
//     title: "",
//     description: "",
//     targetAmount: "", // Add targetAmount field
//   });

//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [reviewMode, setReviewMode] = useState(false);


//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" }); // Clear errors for the field
//   };

//   // Handle file input
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//     setErrors({ ...errors, image: "" }); // Clear errors for the image field
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
//       stepErrors.beneficiary = "Please specify whom you are collecting funds for.";
//     }
//     if (step === 4 && !formData.image) {
//       stepErrors.image = "Please upload an image.";
//     }
//     if (step === 5) {
//       if (!formData.title) stepErrors.title = "Title is required.";
//       if (!formData.description) stepErrors.description = "Description is required.";
//       if (!formData.targetAmount || isNaN(formData.targetAmount) || Number(formData.targetAmount) <= 0) {
//         stepErrors.targetAmount = "Please enter a valid target amount.";
//       }
//     }

//     setErrors(stepErrors);
//     return Object.keys(stepErrors).length === 0;
//   };

//   // Proceed to the next step
//   const handleNextStep = () => {
//     if (validateStep()) {
//       setStep((prevStep) => prevStep + 1);
//     }
//   };

//   // Go to the previous step
//   const handlePreviousStep = () => {
//     setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
//   };

//   // Review mode
//   const handleReview = () => {
//     if (validateStep()) {
//       setReviewMode(true);
//     }
//   };

//   // Edit mode
//   const handleEdit = () => {
//     setReviewMode(false);
//     setStep(1); // Start from the first step
//   };

//   // Submit campaign
//   const handleSubmit = async () => {
//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });

//       const res=await axios.post("http://localhost:5000/api/campaigns", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
// console.log(res.data);



//     alert("Campaign submitted for admin approval and notification sent!");

//       alert("Campaign submitted for admin approval!");

//       //Reset form 
//       setFormData({
//         placeName: "",
//         category: "",
//         beneficiary: "",
//         image: null,
//         title: "",
//         description: "",
//         targetAmount: "",
//       });
//       setStep(1); // Reset to the first step
//     } catch (error) {
//       alert("There was an error submitting your campaign. Please try again.");
//     }
//   };

//   // Step-based UI rendering
//   const renderStep = () => {
//     if (reviewMode) {
//       return (
//         <div className="review-section">
//           <h2>Review Your Campaign</h2>
//           <p><strong>Place Name:</strong> {formData.placeName}</p>
//           <p><strong>Category:</strong> {formData.category}</p>
//           <p><strong>Beneficiary:</strong> {formData.beneficiary}</p>
//           {formData.image && (
//             <img
//               src={URL.createObjectURL(formData.image)}
//               alt="Campaign"
//               className="review-image"
//             />
//           )}
//           <p><strong>Title:</strong> {formData.title}</p>
//           <p><strong>Description:</strong> {formData.description}</p>
//           <p><strong>Target Amount:</strong> ${formData.targetAmount}</p>
//           <button onClick={handleEdit} className="btn-secondary">Edit Campaign</button>
//           <button onClick={handleSubmit} className="btn-primary">Submit Campaign</button>
//         </div>
//       );
//     }

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
//             <button onClick={handleNextStep} className="btn-primary">Continue</button>
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
//             <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
//             <button onClick={handleNextStep} className="btn-primary">Continue</button>
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
//             {errors.beneficiary && <p className="error">{errors.beneficiary}</p>}
//             <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
//             <button onClick={handleNextStep} className="btn-primary">Continue</button>
//           </div>
//         );

//       case 4:
//   return (
//     <div>
//       <h2>Upload a Photo</h2>
//       <div className="file-upload-container" onClick={() => document.getElementById('file-upload').click()}>
//         <label className="file-upload-label">
//           <FaFileUpload className="upload-icon" />
//           Click to upload
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="input-file-hidden"
//         />
//       </div>
//       {errors.image && <p className="error">{errors.image}</p>}
//       <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
//       <button onClick={handleNextStep} className="btn-primary">Continue</button>
//     </div>
//   );

//       case 5:
//         return (
//           <div className=''>
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
//             {errors.description && <p className="error">{errors.description}</p>}

//             <label>Target Amount (in USD):</label>
//             <input
//               type="number"
//               name="targetAmount"
//               value={formData.targetAmount}
//               onChange={handleChange}
//               placeholder="Enter target amount"
//               className="input-field"
//             />
//             {errors.targetAmount && <p className="error">{errors.targetAmount}</p>}

//             <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
//             <button onClick={handleReview} className="btn-primary">Review</button>
//           </div>
//         );
//       default:
//         return <p>Invalid step</p>;
//     }
//   };

//   return <div className="campaign-creator-container">{renderStep()}</div>;
// };

// export default CampaignCreator;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import "./campaignCreator.css";

const CampaignCreator = () => {
  const [formData, setFormData] = useState({
    placeName: "",
    category: "",
    beneficiary: "",
    image: null,
    title: "",
    description: "",
    targetAmount: "",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Add state for account verification
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check account verification status when the component mounts
    const checkVerificationStatus = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        console.log(token)
        if (!token) {
          alert('Token not found, please log in again.');
          return;
        }
        const response = await axios.get("http://localhost:5000/api/profile", {
      
            headers: { 'auth-token': token },
          
        });
        setIsVerified(response.data.isVerified); // Set the verification status from the response

      } catch (error) {
        console.error("Error checking verification status:", error);
        setIsVerified(false); // Default to false if there's an error
      } finally {
        setLoading(false); // Stop loading after verification check is done
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
        <h2>Your account is not verified. Please verify your account to create a campaign.</h2>
      </div>
    );
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors for the field
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setErrors({ ...errors, image: "" }); // Clear errors for the image field
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
      stepErrors.beneficiary = "Please specify whom you are collecting funds for.";
    }
    if (step === 4 && !formData.image) {
      stepErrors.image = "Please upload an image.";
    }
    if (step === 5) {
      if (!formData.title) stepErrors.title = "Title is required.";
      if (!formData.description) stepErrors.description = "Description is required.";
      if (!formData.targetAmount || isNaN(formData.targetAmount) || Number(formData.targetAmount) <= 0) {
        stepErrors.targetAmount = "Please enter a valid target amount.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Proceed to the next step
  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  // Go to the previous step
  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  // Review mode
  const handleReview = () => {
    if (validateStep()) {
      setReviewMode(true);
    }
  };

  // Edit mode
  const handleEdit = () => {
    setReviewMode(false);
    setStep(1); // Start from the first step
  };

  // Submit campaign
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axios.post("http://localhost:5000/api/campaigns", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response received:", res.data);
      console.log("About to alert the user");

      alert("Campaign submitted for admin approval!");

      // Reset form 
      setFormData({
        placeName: "",
        category: "",
        beneficiary: "",
        image: null,
        title: "",
        description: "",
        targetAmount: "",
      });
      setStep(1); // Reset to the first step
    } catch (error) {
      alert("There was an error submitting your campaign. Please try again.");
    }
  };

  // Step-based UI rendering
  const renderStep = () => {
    if (reviewMode) {
      return (
        <div className="review-section">
          <h2>Review Your Campaign</h2>
          <p><strong>Place Name:</strong> {formData.placeName}</p>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Beneficiary:</strong> {formData.beneficiary}</p>
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Campaign"
              className="review-image"
            />
          )}
          <p><strong>Title:</strong> {formData.title}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Target Amount:</strong> ${formData.targetAmount}</p>
          <button onClick={handleEdit} className="btn-secondary">Edit Campaign</button>
          <button onClick={handleSubmit} className="btn-primary">Submit Campaign</button>
        </div>
      );
    }

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
            <button onClick={handleNextStep} className="btn-primary">Continue</button>
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
            <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
            <button onClick={handleNextStep} className="btn-primary">Continue</button>
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
            {errors.beneficiary && <p className="error">{errors.beneficiary}</p>}
            <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
            <button onClick={handleNextStep} className="btn-primary">Continue</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Upload a Photo</h2>
            <div className="file-upload-container" onClick={() => document.getElementById('file-upload').click()}>
              <label className="file-upload-label">
                <FaFileUpload className="upload-icon" />
                Click to upload
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
            <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
            <button onClick={handleNextStep} className="btn-primary">Continue</button>
          </div>
        );
      case 5:
        return (
          <div className="">
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

            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your campaign"
              className="textarea-field"
            />
            {errors.description && <p className="error">{errors.description}</p>}

            <label>Target Amount (in USD):</label>
            <input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="Enter target amount"
              className="input-field"
            />
            {errors.targetAmount && <p className="error">{errors.targetAmount}</p>}

            <button onClick={handlePreviousStep} className="btn-secondary">Back</button>
            <button onClick={handleReview} className="btn-primary">Review</button>
          </div>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return <div className="campaign-creator-container">{renderStep()}</div>;
};

export default CampaignCreator;
