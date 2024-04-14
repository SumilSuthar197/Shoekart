import React, { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import { toast } from "react-toastify";
import Axios from "../Axios";
import TriangleLoader from "../components/TriangleLoader";

const CouponList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = async () => {
    try {
      console.log("fetching coupons");
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied. Please login first.");
      }
      const response = await Axios.get("/admin/coupons", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const columns = [
    {
      Header: "Name",
      accessor: "id",
    },
    {
      Header: "Discount",
      accessor: "percent_off",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      Header: "Redemption Left",
      accessor: "redemption_left",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    duration: "forever",
    duration_in_months: "",
    max_redemptions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      name: e.id,
      discount: e.percent_off,
      duration: e.duration !== "forever" ? "repeating" : "forever",
      duration_in_months: e.duration_in_months || 12,
      max_redemptions: e.max_redemptions,
    });
  };
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value.trim(),
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.discount ||
        !formData.duration ||
        !formData.max_redemptions
      ) {
        return toast.error("Please fill all the fields.");
      }
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.post(
        "/admin/coupons",
        { formData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      fetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const deleteCoupon = async () => {
    try {
      if (!formData.name) {
        return toast.error("Please select a coupon to delete.");
      }
      if (formData.name === "SUMILSUTHAR197") {
        return toast.error("You can't delete this coupon.");
      }

      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.delete(
        `/admin/coupons/${formData.name.toUpperCase()}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      setFormData({
        name: "",
        discount: "",
        duration: "",
        duration_in_months: "",
        max_redemptions: "",
      });
      fetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="dashboardMain">
      <h1>Coupons</h1>
      <div className="dashOverview dash-forms">
        <form onSubmit={handleFormSubmit}>
          <div className="inputs">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter coupon name"
                style={{ textTransform: "uppercase" }}
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                className="form-control"
                id="discount"
                min="0"
                max="100"
                placeholder="Enter discount in percentage"
                onChange={handleInputChange}
                value={formData.discount}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Coupon Type</label>
              <select
                className="form-control"
                id="duration"
                onChange={handleInputChange}
                value={formData.duration}
              >
                <option value="forever">Forever</option>
                <option value="repeating">Repeating</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="duration_in_months">Duration</label>
              <input
                type="number"
                className="form-control"
                id="duration_in_months"
                min="0"
                max="12"
                placeholder="valid for how many months?"
                disabled={formData.duration === "forever"}
                onChange={handleInputChange}
                value={formData.duration_in_months}
              />
            </div>
            <div className="form-group">
              <label htmlFor="max_redemptions">Max Redemptions</label>
              <input
                min={0}
                type="number"
                className="form-control"
                id="max_redemptions"
                placeholder="Enter 999 for unlimited redemptions"
                onChange={handleInputChange}
                value={formData.max_redemptions}
              />
            </div>
          </div>
          <div className="inputs-btn">
            <button type="button" onClick={deleteCoupon}>
              Delete
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      <div className="dashOverview" style={{ overflow: "auto" }}>
        <CustomerTable
          columns={columns}
          data={data}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CouponList;
