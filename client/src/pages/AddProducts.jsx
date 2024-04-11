import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import Axios from "../Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [data, setData] = useState({
    name: "",
    desc: "",
    sku: "",
    price: "",
    color: "",
    brand: "",
    material: "",
    category: "",
    featured: "false",
  });
  const [link, setLink] = useState(null);
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const changeFields = (e) => {
    setFields(e);
  };

  const changeLink = (e) => {
    setLink(e);
  };

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  const changeCategory = (e) => {
    setData({ ...data, category: e });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const validFields = fields.filter((field) => field && field.quantity > 0);
      if (
        validFields.length === 0 ||
        !data.name ||
        !data.desc ||
        !data.sku ||
        !data.price ||
        !data.color ||
        !data.brand ||
        !data.material ||
        !data.featured ||
        !link
      ) {
        return toast.error("Please fill all the fields.");
      }
      const response = await Axios.post(
        "/product/create",
        { ...data, sizeQuantity: validFields, image: link },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/products");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="orderMainContainer">
      <h1
        className="cHeader"
        style={{ textAlign: "left", marginBottom: "1rem" }}
      >
        Add Product
      </h1>
      <div className="dashOverview">
        <ProductForm
          link={link}
          changeLink={changeLink}
          data={data}
          handleInputChange={handleInputChange}
          fields={fields}
          changeFields={changeFields}
          name="Add Product"
          changeCategory={changeCategory}
          handleSubmit={handleSubmit}
          handleCancel={() => navigate("/admin/products")}
        />
      </div>
    </div>
  );
};

export default AddProducts;
