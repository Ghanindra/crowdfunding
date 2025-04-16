import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './verifyaccount.css';
import { toast } from "react-toastify";

const VerifyAccount = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [issuedFrom, setIssuedFrom] = useState('');
  const [citizenshipImage, setCitizenshipImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/verification-status', {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth-token')}` },
        });
  
        if (response.data.status === 'approved') {
          setIsVerified(true);
          setDocumentNumber(response.data.documentNumber || '');
          const formattedDate = response.data.issueDate ? response.data.issueDate.split('T')[0] : '';
          setIssueDate(formattedDate);
          setIssuedFrom(response.data.issuedFrom || '');
          setCitizenshipImage(response.data.citizenshipImage || null);
        }
      } catch (error) {
        // ✅ Check for 404 - no verification yet
        if (error.response && error.response.status === 404) {
          // First-time verification: do nothing, let user fill the form
          console.log("User has not verified account yet.");
        } else {
          toast.error('Error fetching verification status.');
          setMessage('Failed to load verification status.');
        }
      }
    };
  
    fetchVerificationStatus();
  }, []);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'citizenshipImage') {
      const file = files[0];
      if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Only JPG and PNG images are allowed.');
        return;
      }
      setCitizenshipImage(file);
    } else if (name === 'documentNumber') {
      setDocumentNumber(value);
    } else if (name === 'issueDate') {
      setIssueDate(value);
    } else if (name === 'issuedFrom') {
      setIssuedFrom(value);
    }
  };

  const validateInputs = () => {
    const docPattern = /^[0-9]{4,20}$/; // Only digits
    const issuedFromPattern = /^[A-Za-z\s]{2,50}$/; // Only alphabets and spaces

    if (!documentNumber.trim()) {
      toast.error("Document Number is required.");
      return false;
    }
    if (!docPattern.test(documentNumber)) {
      toast.error("Document Number must contain only numbers (4-20 digits).");
      return false;
    }

    if (!issueDate) {
      toast.error("Issue Date is required.");
      return false;
    }

    if (!issuedFrom.trim()) {
      toast.error("Issued From is required.");
      return false;
    }
    if (!issuedFromPattern.test(issuedFrom)) {
      toast.error("Issued From must contain only alphabets and spaces.");
      return false;
    }

    if (!citizenshipImage && !isVerified) {
      toast.error("Citizenship Image is required.");
      return false;
    }

    return true;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isVerified && !isEditing) return;
    if (!validateInputs()) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('documentNumber', documentNumber.trim());
    formData.append('issueDate', issueDate);
    formData.append('issuedFrom', issuedFrom.trim());
    if (citizenshipImage) formData.append('citizenshipImage', citizenshipImage);

    try {
      const url = isVerified
        ? 'http://localhost:5000/api/update_verification'
        : 'http://localhost:5000/api/verify_account';

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      setMessage(response.data.message);
      setIsEditing(false);
      if (!isVerified) setIsVerified(true);
    } catch (error) {
      toast.error("Verification submission failed.");
      setMessage("Verification submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormControls = () => (
    <>
      <div>
        <label htmlFor="documentNumber" className="label">Document Number:</label>
        <input
          type="text"
          id="documentNumber"
          name="documentNumber"
          value={documentNumber}
          onChange={handleChange}
          className="input"
          required
          disabled={isVerified && !isEditing}
        />
      </div>
      <div>
        <label htmlFor="issueDate" className="label">Issue Date:</label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          value={issueDate}
          onChange={handleChange}
          className="input"
          required
          disabled={isVerified && !isEditing}
        />
      </div>
      <div>
        <label htmlFor="issuedFrom" className="label">Issued From:</label>
        <input
          type="text"
          id="issuedFrom"
          name="issuedFrom"
          value={issuedFrom}
          onChange={handleChange}
          className="input"
          required
          disabled={isVerified && !isEditing}
        />
      </div>
      <div>
        <label htmlFor="citizenshipImage" className="label">Citizenship Image:</label>
        {citizenshipImage && typeof citizenshipImage === 'string' ? (
          <img src={citizenshipImage} alt="Citizenship Document" width="150" />
        ) : null}
        {(isEditing || !isVerified) && (
          <input
            type="file"
            id="citizenshipImage"
            name="citizenshipImage"
            onChange={handleChange}
            className="input"
            required={!isVerified}
          />
        )}
      </div>
    </>
  );

  return (
    <div className="container">
      <h2 className="title">Verify Account</h2>

      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        {renderFormControls()}

        <div className="form-footer">
          {isVerified && !isEditing && (
            <button type="button" className="button" onClick={handleEditClick}>
              Edit Verification
            </button>
          )}
          {isEditing && (
            <button type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          )}
          {!isEditing && !isVerified && (
            <button type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify Account'}
            </button>
          )}
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default VerifyAccount;
