import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NotificationProvider } from "./context/NotificationContext";
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
    <App />
    </NotificationProvider>
   
    <ToastContainer />
  </StrictMode>
)
