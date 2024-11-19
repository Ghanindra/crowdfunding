
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowed }) => {
  const isAuthenticated = !!localStorage.getItem('auth-token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If additional conditions are required, add them here
  if (allowed === 'restricted' && !someCondition) { // Replace someCondition with your specific criteria
    return <Navigate to='/restriction'/> ; // Redirect to home if the condition isn't met
  }

  return children;
};

export default ProtectedRoute;
