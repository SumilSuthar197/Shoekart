import "../styles/order.css";
import { useEffect, useState } from "react";
import TriangleLoader from "../components/TriangleLoader";
import EmptyImage from "../Images/empty-cart.png";
import Axios from "../Axios";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const AdminOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
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
      const response = await Axios.get("/admin/order", {
        params: { limit, page },
        headers: {
          Authorization: token,
        },
      });

      console.log(response.data);
      setData(response.data.orders);
      setTotalPages(Math.ceil(response.data.count / limit));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status, paymentId) => {
    try {
      const token = localStorage.getItem("jwtAdmin");
      if (!token) {
        return toast.error("Access denied.");
      }
      const response = await Axios.put(
        "/admin/order",
        { id, status, paymentId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        const updatedData = data.map((item) => {
          if (item._id === id) {
            item.delivered = status;
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
    fetchData();
  }, [page]);

  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="orderMainContainer">
      <h1 className="cHeader" style={{ textAlign: "left" }}>
        Orders List
      </h1>
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
              <th className="order-subheader order-th ">Customer</th>
              <th className="order-subheader order-th ">Order Date</th>
              <th className="order-subheader order-th ">Status</th>
              <th className="order-subheader order-th ">Total Price</th>
              <th className="order-subheader order-th ">Action</th>
            </tr>
          </thead>
          <tbody className="order-table-tbody">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="order-td">
                  {item.products.map((product) => (
                    <div key={product._id} className="order-td-div">
                      <div className="cart-product-cont">
                        <div className="cart-image-cont">
                          <img
                            src={product.image}
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
                            {product.name}
                          </p>
                          <p className="cart-desc-cont">{product.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="order-td">{item.user}</td>
                <td className="order-td">{item.createdAt}</td>
                <td className="order-td">{item.delivered}</td>
                <td className="order-td">₹{item.total}</td>
                <td className="order-td">
                  <div
                    className="order-btn-cont"
                    style={{ flexDirection: "column" }}
                  >
                    <button
                      className="cart-delete-btn"
                      disabled={item.delivered !== "pending"}
                      style={
                        item.delivered !== "pending"
                          ? { cursor: "not-allowed", opacity: "0.5" }
                          : {}
                      }
                      onClick={() =>
                        updateOrderStatus(item._id, "Delivered", item.paymentId)
                      }
                    >
                      Delivered
                    </button>
                    <button
                      className="cart-delete-btn"
                      disabled={item.delivered !== "pending"}
                      style={
                        item.delivered !== "pending"
                          ? { cursor: "not-allowed", opacity: "0.5" }
                          : {}
                      }
                      onClick={() =>
                        updateOrderStatus(item._id, "Cancelled", item.paymentId)
                      }
                    >
                      Cancel
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
            <p>No orders have been placed yet.</p>
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

export default AdminOrders;
