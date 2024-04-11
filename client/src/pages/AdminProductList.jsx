import "../styles/order.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TriangleLoader from "../components/TriangleLoader";
import EmptyImage from "../Images/empty-cart.png";
import Axios from "../Axios";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import { FiSearch } from "react-icons/fi";

const AdminProductList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounce, setDebounce] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;
  const gotoPage = (p) => {
    setPage(p);
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.get("/admin/products", {
        params: { limit, page, searchTerm },
        headers: {
          Authorization: token,
        },
      });

      setData(response.data.products);
      setTotalPages(Math.ceil(response.data.count / limit));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateProductStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.put(
        `/admin/product/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      if (response.data.success) {
        const updatedData = data.map((item) => {
          if (item._id === id) {
            item.status = status;
          }
          return item;
        });
        setData(updatedData);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(searchTerm);
    }, 700);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [page, debounce]);

  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="orderMainContainer">
      <h1 className="cHeader" style={{ textAlign: "left" }}>
        Product List
      </h1>
      <div className="searchBar adminSearchBar">
        <div className="searchForm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="What shoes are you looking for ?"
          />
          <div>
            <FiSearch />
          </div>
        </div>
        <button
          style={{ margin: "0" }}
          onClick={() => navigate("/admin/product/add")}
          className="open-modal cart-delete-btn"
          type="button"
        >
          Add Product
        </button>
      </div>
      <div className="orderContainer" style={{ flexDirection: "column" }}>
        <table className="order-table">
          <thead>
            <tr>
              <th
                className="order-subheader order-th"
                style={{ textAlign: "left" }}
              >
                Product Details
              </th>
              <th className="order-subheader order-th ">Brand</th>
              <th className="order-subheader order-th ">Size(UK)</th>
              <th className="order-subheader order-th ">Status</th>
              <th className="order-subheader order-th ">Price</th>
              <th className="order-subheader order-th ">Action</th>
            </tr>
          </thead>
          <tbody className="order-table-tbody">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="order-td">
                  <div key={item._id} className="order-td-div">
                    <div className="cart-product-cont">
                      <div className="cart-image-cont">
                        <img
                          src={item.image}
                          alt="product"
                          className="cart-image"
                        />
                      </div>
                      <div className="cart-product-details">
                        <p
                          className="cart-name-cont"
                          style={{
                            width: "13rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </p>
                        <p className="cart-desc-cont">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="order-td">{item.brand}</td>
                <td className="order-td">
                  {item.size.split(", ").map((s, i) => (
                    <div key={i}>
                      {s}
                      <br />
                    </div>
                  ))}
                </td>
                <td className="order-td">{item.status}</td>
                <td className="order-td">₹{item.price}</td>
                <td className="order-td">
                  <div
                    className="order-btn-cont"
                    style={{ flexDirection: "column" }}
                  >
                    <button
                      className="cart-delete-btn"
                      onClick={() =>
                        navigate(`/admin/product/update/${item.slug}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="cart-delete-btn"
                      onClick={() =>
                        updateProductStatus(
                          item._id,
                          item.status === "Active" ? "Inactive" : "Active"
                        )
                      }
                    >
                      {item.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!data || data.length <= 0) && (
          <div className="empty-cart">
            <img src={EmptyImage} alt="empty-cart" />
            <p>No products have been added yet. Start adding some!</p>
          </div>
        )}
      </div>
      <Pagination
        totalPageCount={totalPages}
        previousPage={() => setPage(page - 1)}
        canPreviousPage={canPreviousPage}
        nextPage={() => setPage(page + 1)}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        pageIndex={page - 1}
      />
    </div>
  );
};

export default AdminProductList;
