import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import Axios from "../Axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import TriangleLoader from "../components/TriangleLoader";

const UpdateProducts = () => {
  const { slug } = useParams();
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`/product/${slug}`);
        setLink(response.data.data.image);
        const newFields = [...fields];
        response.data.data.sizeQuantity.forEach((field) => {
          newFields[field.size - 3] = {
            size: field.size,
            quantity: field.quantity,
          };
        });
        setFields(newFields);
        setData({
          ...data,
          brand: response.data.data.brand,
          color: response.data.data.color,
          desc: response.data.data.description,
          featured: response.data.data.isFeatured,
          material: response.data.data.material,
          name: response.data.data.name,
          price: response.data.data.price,
          sku: response.data.data.sku,
          category: response.data.data.category,
        });
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: "bottom-right",
        });
        navigate("/admin/products");
      }
    };
    fetchProduct();
  }, []);

  const changeFields = (e) => {
    setFields(e);
  };

  const changeLink = (e) => {
    setLink(e);
  };
  const changeCategory = (e) => {
    setData({ ...data, category: e });
  };
  const handleInputChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const validFields = fields.filter((field) => field && field.quantity > 0);
      console.log({ ...data, sizeQuantity: validFields, image: link });
      if (
        validFields.length === 0 ||
        !data.name ||
        !data.desc ||
        !data.sku ||
        !data.price ||
        !data.color ||
        !data.brand ||
        !data.material ||
        !link
      ) {
        return toast.error("Please fill all the fields.");
      }

      const response = await Axios.put(
        `/product/update/${slug}`,
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
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="orderMainContainer">
      <h1
        className="cHeader"
        style={{ textAlign: "left", marginBottom: "1rem" }}
      >
        Update Product
      </h1>
      <div className="dashOverview">
        <ProductForm
          link={link}
          changeLink={changeLink}
          data={data}
          handleInputChange={handleInputChange}
          fields={fields}
          changeFields={changeFields}
          name="Update Product"
          changeCategory={changeCategory}
          handleSubmit={handleSubmit}
          handleCancel={() => navigate("/admin/products")}
        />
      </div>
    </div>
  );
};

export default UpdateProducts;
