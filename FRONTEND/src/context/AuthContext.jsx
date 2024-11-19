

// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [authData, setAuthData] = useState(null);

//   const signup = (data) => {
//     setAuthData(data);
//     localStorage.setItem('auth-token', data.token);
//   };

//   const login = (token) => {
//     setAuthData((prevData) => ({
//       ...prevData,
//       token: token,
//     }));
//     localStorage.setItem('auth-token', token);
//   };

//   const logout = () => {
//     setAuthData(null);
//     localStorage.removeItem('auth-token');
//   };

//   return (
//     <AuthContext.Provider value={{ authData, setAuthData,signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };







import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  console.log('Children:', children);
  const [authData, setAuthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signup = (data) => {
    setAuthData(data);
    localStorage.setItem('auth-token', data.token);
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    setAuthData((prevData) => ({
      ...prevData,
      token: token,
    }));
    localStorage.setItem('auth-token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authData, setAuthData,signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};