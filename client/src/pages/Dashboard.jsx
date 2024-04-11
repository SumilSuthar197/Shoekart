import React, { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import DashCard from "../components/DashCard";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Axios from "../Axios";
import { toast } from "react-toastify";
import TriangleLoader from "../components/TriangleLoader";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  ArcElement,
  Legend
);
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    bar1: { labels: [], data: [] },
    bar2: { labels: [], data: [] },
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
  });
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
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const data1 = {
    labels: data.bar1.labels,
    datasets: [
      {
        data: data.bar1.data,
        backgroundColor: "#28A745",
        label: "Amount",
      },
    ],
  };
  const data2 = {
    labels: data.bar2.labels,
    datasets: [
      {
        data: data.bar2.data,
        backgroundColor: ["#FFC107", "#28A745", "red", "#DC3545"],
        label: "No of Orders",
      },
    ],
  };
  const options1 = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Sales Amount for the Current Year",
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Percentage Distribution of Order Status for Current Month",
      },
    },
  };
  if (loading) return <TriangleLoader height="500px" />;
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
