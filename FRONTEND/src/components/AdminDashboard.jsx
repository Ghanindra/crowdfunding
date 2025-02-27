import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, LineChart, DollarSign, Users, Activity } from "lucide-react"; // Icons
import { FormatCurrency } from "../utils/FormatCurrency"; // Helper function for formatting currency
import "./admindashboard.css"; // Import the new CSS file
import Navbar from '../components/Navbar';
const AdminDashboard = () => {
  console.log("AdminDashboard component is rendering...");
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalUsers: 0,
    totalDonations: 0,
    platformRevenue: 0,
    recentActivity: [],
  });

  useEffect(() => {
    console.log("useEffect triggered");
    
    const fetchDashboardStats = async () => {
      console.log("Fetching dashboard data...");
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        console.log("Dashboard Data:", response.data.data);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    fetchDashboardStats();
  }, []);
  

  return (
    <div className="admin-dashboard">
      <Navbar/>
      <h1 className="dashboard-header">Admin Dashboard</h1>

      {/* Dashboard Summary Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-content">
            <h2>Total Campaigns</h2>
            <p>{stats.totalCampaigns}</p>
          </div>
          <BarChart className="card-icon text-blue-500" />
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <h2>Total Users</h2>
            <p>{stats.totalUsers}</p>
          </div>
          <Users className="card-icon text-green-500" />
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <h2>Total Donations</h2>
            <p>{FormatCurrency(stats.totalDonations)}</p>
          </div>
          <DollarSign className="card-icon text-yellow-500" />
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <h2>Platform Revenue</h2>
            <p>{FormatCurrency(stats.platformRevenue)}</p>
          </div>
          <LineChart className="card-icon text-purple-500" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <h2 className="recent-activity-title">Recent Activity</h2>
        <div className="recent-activity-list">
          {stats.recentActivity.length === 0 ? (
            <p className="activity-message text-gray-500">No recent activity.</p>
          ) : (
            <ul>
              {stats.recentActivity.map((activity, index) => (
                <li key={index}>
                  <Activity className="activity-icon" />
                  <span className="activity-message">{activity.message || "Activity details unavailable"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
