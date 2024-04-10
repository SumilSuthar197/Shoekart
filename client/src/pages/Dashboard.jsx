import React, { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import DashCard from "../components/DashCard";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Axios from "../Axios";
import { toast } from "react-toastify";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ArcElement,
  Legend
);
const Dashboard = () => {
  const [data, setData] = useState({
    bar1: { labels: [], data: [] },
    bar2: { labels: [], data: [] },
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
  });
  // const [bar1, setBar1] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtAdmin");
        if (!token) {
          return toast.error("Access denied. Please login first.");
        }
        const res = await Axios.get("/admin/info", {
          headers: {
            Authorization: token,
          },
        });
        const myData = res.data.bar1.data.map((item) => Number(item));
        setData({
          ...res.data,
          bar1: { labels: res.data.bar1.labels, data: myData },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const data1 = {
    labels: data.bar1.labels,
    datasets: [
      {
        labels: "Amount",
        data: data.bar1.data,
        backgroundColor: "#54BAB9",

        label: "Sales Amount per Month",
      },
    ],
  };
  const data2 = {
    labels: data.bar2.labels,
    datasets: [
      {
        labels: "Amount",
        data: data.bar2.data,
        backgroundColor: ["#FFC107", "#28A745", "red", "#DC3545"],
        label: "Order Status",
      },
    ],
  };
  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Amount per Month",
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Order Status",
      },
    },
  };
  return (
    <div className="dashboardMain">
      <h1>Dashboard</h1>
      <div className="dashOverview">
        <DashCard title="Total Users" amount={data.totalUsers} />
        <DashCard title="Total Orders" amount={data.totalOrders} />
        <DashCard title="Total Products" amount={data.totalProducts} />
        <DashCard title="Total Products" amount={`₹${data.totalSales}`} />
      </div>
      <div className="graphBox">
        <div className="graph-box box-1">
          <Doughnut data={data2} options={options2} />
        </div>
        <div className="graph-box box-2">
          <Bar data={data1} options={options1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
