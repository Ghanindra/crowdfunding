import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './verifyaccount.css'; // Import external CSS file
import { toast } from "react-toastify";
const VerifyAccount = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [issuedFrom, setIssuedFrom] = useState('');
  const [citizenshipImage, setCitizenshipImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  // Initially set to false

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
          setIssueDate(formattedDate || '');
          setIssuedFrom(response.data.issuedFrom || '');
          setCitizenshipImage(response.data.citizenshipImage || null);
        }
      } catch (error) {
        toast.error('Error fetching verification status:', error);
        setMessage('Failed to load verification status.');
      }
    };

    fetchVerificationStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'citizenshipImage') {
      setCitizenshipImage(files[0]);
    } else if (name === 'documentNumber') {
      setDocumentNumber(value);
    } else if (name === 'issueDate') {
      setIssueDate(value);
    } else if (name === 'issuedFrom') {
      setIssuedFrom(value);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Only when the edit button is clicked
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isVerified && !isEditing) {
      return; // Prevent form submission if account is verified and not in edit mode
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('documentNumber', documentNumber);
    formData.append('issueDate', issueDate);
    formData.append('issuedFrom', issuedFrom);
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
      setIsEditing(false); // Reset the editing state after submit
      if (!isVerified) setIsVerified(true);
    } catch (error) {
      setMessage('Verification submission failed.');
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
          disabled={isVerified && !isEditing} // Disabled if verified and not editing
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
          disabled={isVerified && !isEditing} // Disabled if verified and not editing
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
          disabled={isVerified && !isEditing} // Disabled if verified and not editing
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
            required={!isVerified} // Required only for new verification
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
