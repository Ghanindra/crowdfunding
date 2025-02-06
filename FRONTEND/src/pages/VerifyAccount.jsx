
// import React, { useState } from 'react';
// import axios from 'axios';

// const VerifyAccount = () => {
//   const [documentNumber, setDocumentNumber] = useState('');
//   const [issueDate, setIssueDate] = useState('');
//   const [issuedFrom, setIssuedFrom] = useState('');
//   const [citizenshipImage, setCitizenshipImage] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'citizenshipImage') {
//       setCitizenshipImage(e.target.files[0]);
//     } else {
//       switch (name) {
//         case 'documentNumber':
//           setDocumentNumber(value);
//           break;
//         case 'issueDate':
//           setIssueDate(value);
//           break;
//         case 'issuedFrom':
//           setIssuedFrom(value);
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append('documentNumber', documentNumber);
//     formData.append('issueDate', issueDate);
//     formData.append('issuedFrom', issuedFrom);
//     formData.append('citizenshipImage', citizenshipImage);

//     try {
//       const response = await axios.post('http://localhost:5000/api/verify_account', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${localStorage.getItem('auth-token')}`, // If you're using JWT token stored in localStorage
//         },
//       });
//       setMessage(response.data.message);
//        // Clear fields after successful submission
//     setDocumentNumber('');
//     setIssueDate('');
//     setIssuedFrom('');
//     setCitizenshipImage(null);
//     } catch (error) {
//       setMessage('Verification submission failed.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Verify Account</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <label htmlFor="documentNumber">Document Number:</label>
//           <input
//             type="text"
//             id="documentNumber"
//             name="documentNumber"
//             value={documentNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="issueDate">Issue Date:</label>
//           <input
//             type="date"
//             id="issueDate"
//             name="issueDate"
//             value={issueDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="issuedFrom">Issued From:</label>
//           <input
//             type="text"
//             id="issuedFrom"
//             name="issuedFrom"
//             value={issuedFrom}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="citizenshipImage">Citizenship Image:</label>
//           <input
//             type="file"
//             id="citizenshipImage"
//             name="citizenshipImage"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };



// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     background: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '20px',
//     fontSize: '24px',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   field: {
//     marginBottom: '15px',
//   },
//   label: {
//     marginBottom: '5px',
//     display: 'block',
//     fontSize: '14px',
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     fontSize: '14px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '10px',
//     fontSize: '16px',
//     color: '#fff',
//     background: '#007bff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   message: {
//     textAlign: 'center',
//     marginTop: '15px',
//   },
// };

// export default VerifyAccount;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VerifyAccount = () => {
//   const [documentNumber, setDocumentNumber] = useState('');
//   const [issueDate, setIssueDate] = useState('');
//   const [issuedFrom, setIssuedFrom] = useState('');
//   const [citizenshipImage, setCitizenshipImage] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isVerified, setIsVerified] = useState(false); // To track if the account is verified

//   // Fetch the verification status when the component mounts
//   useEffect(() => {
//     const fetchVerificationStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user/verification-status', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('auth-token')}`, // JWT token in localStorage
//           },
//         });
//         if (response.data.status === 'approved') {
//           setIsVerified(true); // Set to true if the account is verified
//         }
//       } catch (error) {
//         console.error('Error fetching verification status:', error);
//       }
//     };

//     fetchVerificationStatus();
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'citizenshipImage') {
//       setCitizenshipImage(e.target.files[0]);
//     } else {
//       switch (name) {
//         case 'documentNumber':
//           setDocumentNumber(value);
//           break;
//         case 'issueDate':
//           setIssueDate(value);
//           break;
//         case 'issuedFrom':
//           setIssuedFrom(value);
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append('documentNumber', documentNumber);
//     formData.append('issueDate', issueDate);
//     formData.append('issuedFrom', issuedFrom);
//     formData.append('citizenshipImage', citizenshipImage);

//     try {
//       const response = await axios.post('http://localhost:5000/api/verify_account', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
//         },
//       });
//       setMessage(response.data.message);
//       // Clear fields after successful submission
//       setDocumentNumber('');
//       setIssueDate('');
//       setIssuedFrom('');
//       setCitizenshipImage(null);
//     } catch (error) {
//       setMessage('Verification submission failed.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Verify Account</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <label htmlFor="documentNumber">Document Number:</label>
//           <input
//             type="text"
//             id="documentNumber"
//             name="documentNumber"
//             value={documentNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="issueDate">Issue Date:</label>
//           <input
//             type="date"
//             id="issueDate"
//             name="issueDate"
//             value={issueDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="issuedFrom">Issued From:</label>
//           <input
//             type="text"
//             id="issuedFrom"
//             name="issuedFrom"
//             value={issuedFrom}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="citizenshipImage">Citizenship Image:</label>
//           <input
//             type="file"
//             id="citizenshipImage"
//             name="citizenshipImage"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit Verification'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}

//       {isVerified && <span style={{ color: 'blue', fontSize: '20px' }}>✅</span>} {/* Display blue tick if verified */}
//     </div>
//   );
// };

// export default VerifyAccount;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './verifyaccount.css'; // Import external CSS file

const VerifyAccount = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [issuedFrom, setIssuedFrom] = useState('');
  const [citizenshipImage, setCitizenshipImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/verification-status', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          },
        });
        if (response.data.status === 'approved') {
          setIsVerified(true);
        }
      } catch (error) {
        console.error('Error fetching verification status:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('documentNumber', documentNumber);
    formData.append('issueDate', issueDate);
    formData.append('issuedFrom', issuedFrom);
    formData.append('citizenshipImage', citizenshipImage);

    try {
      const response = await axios.post('http://localhost:5000/api/verify_account', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      setMessage(response.data.message);
      setDocumentNumber('');
      setIssueDate('');
      setIssuedFrom('');
      setCitizenshipImage(null);
    } catch (error) {
      setMessage('Verification submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Verify Account</h2>
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
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
          />
        </div>
        <div>
          <label htmlFor="citizenshipImage" className="label">Citizenship Image:</label>
          <input
            type="file"
            id="citizenshipImage"
            name="citizenshipImage"
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Verification'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      {/* {isVerified && <span className="verificationBadge">✅</span>} */}
    </div>
  );
};

export default VerifyAccount;
