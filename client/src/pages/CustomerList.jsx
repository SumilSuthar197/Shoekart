import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";
import CustomerTable from "../components/CustomerTable";
const CustomerList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("jwtAdmin");
        if (!token) {
          return toast.error("Access denied. Please login first.");
        }
        const response = await Axios.get("/admin/users", {
          headers: {
            Authorization: token,
          },
        });
        if (response.data.success) {
          setData(response.data.users);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetch();
  }, []);
  const columns = [
    {
      Header: "Id",
      accessor: "index",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      sortType: (rowA, rowB, columnId) => {
        const dateA = new Date(rowA.values[columnId]);
        const dateB = new Date(rowB.values[columnId]);
        return dateA - dateB;
      },
    },
  ];
  return (
    <div className="dashboardMain">
      <h1>Customers</h1>
      <div className="dashOverview" style={{ overflow: "auto" }}>
        <CustomerTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CustomerList;
