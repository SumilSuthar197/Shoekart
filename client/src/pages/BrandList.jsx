import React, { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import { toast } from "react-toastify";
import Axios from "../Axios";

const BrandList = () => {
  const [data, setData] = useState([]);
  const fetch = async () => {
    try {
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied. Please login first.");
      }
      const response = await Axios.get("/brands", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.brands);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Active Products",
      accessor: "activeProducts",
    },
    {
      Header: "Total Products",
      accessor: "totalProducts",
    },
  ];

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    email: "",
    isActivate: true,
  });

  const handleChange = (e) => {
    setFormData({
      id: e._id,
      name: e.name,
      description: e.description,
      email: e.email,
      isActivate: e.isActivate,
    });
  };
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      email: "",
      isActivate: true,
    });
  };

  const handleUpdate = (id) => async () => {
    try {
      if (!id) {
        return toast.error("Please select a brand to update.");
      }
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.put(
        `/brands/${id}`,
        { ...formData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      setData(response.data.brands);
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      resetForm();
    }
  };

  //   const handleChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       name: e.id,
  //       discount: e.percent_off,
  //       duration: e.duration !== "forever" ? "repeating" : "forever",
  //       duration_in_months: e.duration_in_months || 12,
  //       max_redemptions: e.max_redemptions,
  //     });
  //   };
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.name || !formData.description || !formData.email) {
        return toast.error("Please fill all the fields.");
      }
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.post(
        "/brands",
        { ...formData },
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
    // try {
    //   if (
    //     !formData.name ||
    //     !formData.discount ||
    //     !formData.duration ||
    //     !formData.max_redemptions
    //   ) {
    //     return toast.error("Please fill all the fields.");
    //   }
    //   const token = localStorage.getItem("jwtAdmin");
    //   if (!token) {
    //     return toast.error("Access denied.");
    //   }
    //   const response = await Axios.post(
    //     "/admin/coupons",
    //     { formData },
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );
    //   toast.success(response.data.message);
    //   fetch();
    // } catch (error) {
    //   toast.error(error?.response?.data?.message);
    // }
  };
  const deleteCoupon = async () => {
    // try {
    //   if (!formData.name) {
    //     return toast.error("Please select a coupon to delete.");
    //   }
    //   const token = localStorage.getItem("jwtAdmin");
    //   if (!token) {
    //     return toast.error("Access denied.");
    //   }
    //   const response = await Axios.delete(
    //     `/admin/coupons/${formData.name.toUpperCase()}`,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );
    //   toast.success(response.data.message);
    //   setFormData({
    //     name: "",
    //     discount: "",
    //     duration: "",
    //     duration_in_months: "",
    //     max_redemptions: "",
    //   });
    //   fetch();
    // } catch (error) {
    //   toast.error(error?.response?.data?.message);
    // }
  };
  return (
    <div className="dashboardMain">
      <h1>Brands</h1>
      <div className="dashOverview dash-forms">
        <form onSubmit={handleFormSubmit}>
          <div className="inputs">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter brand name"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter brand description"
                onChange={handleInputChange}
                value={formData.description}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter brand email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isActivate">Status</label>
              <select
                className="form-control"
                id="isActivate"
                onChange={handleInputChange}
                value={formData.isActivate}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <div className="inputs-btn">
            <button type="button" onClick={handleUpdate(formData.id)}>
              Update
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

export default BrandList;
