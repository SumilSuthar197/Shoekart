import React, { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import { toast } from "react-toastify";
import Axios from "../Axios";
import TriangleLoader from "../components/TriangleLoader";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = async () => {
    try {
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied. Please login first.");
      }
      const response = await Axios.get("/category", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.categories);
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
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
  ];

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ id: e._id, name: e.name, description: e.description });
  };
  const resetForm = () => {
    setFormData({ id: "", name: "", description: "" });
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
        `/category/${id}`,
        { ...formData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      setData(response.data.categories);
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      resetForm();
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.name || !formData.description) {
        return toast.error("Please fill all the fields.");
      }
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.post(
        "/category",
        { ...formData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      fetch();
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const deleteCoupon = async (id) => {
    try {
      if (!id) {
        return toast.error("Please select a brand to delete.");
      }
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.delete(`/category/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      fetch();
      resetForm();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="dashboardMain">
      <h1>Category</h1>
      <div className="dashOverview dash-forms">
        <form onSubmit={handleFormSubmit}>
          <div className="inputs">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter category name"
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
          </div>
          <div className="inputs-btn">
            <button type="button" onClick={handleUpdate(formData.id)}>
              Update
            </button>
            <button type="button" onClick={() => deleteCoupon(formData.id)}>
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

export default CategoryList;
