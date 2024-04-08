import React, { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import DashCard from "../components/DashCard";



const Dashboard = () => {
 
  return (
    <div className="dashboardMain">
      <h1>Dashboard</h1>
      <div className="dashOverview">
        <DashCard title="Total Users" amount="100" />
        <DashCard title="Total Orders" amount="100" />
        <DashCard title="Total Products" amount="100" />
      </div>
    </div>
  );
};

export default Dashboard;
