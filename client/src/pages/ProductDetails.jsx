import { useNavigate, useParams } from "react-router-dom";
import "../styles/productDetails.css";
import { useEffect, useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import TriangleLoader from "../components/TriangleLoader";
import useAuth from "../../hooks/useAuth";
import Star from "../components/Star";
import RatingContainer from "../components/RatingContainer";

const ProductDetails = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`/product/${slug}`);
        setData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: "bottom-right",
        });
        navigate("/404");
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    try {
      if (!auth) {
        toast.error("Login required");
        navigate("/login");
        return;
      }

      if (!size) {
        toast.error("Please select a size");
        return;
      }
      const token = localStorage.getItem("jwt");
      const response = await Axios.post(
        "/cart/add",
        {
          productId: data._id,
          qty: 1,
          size: Number(size),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response?.data?.message);
      setAuth({ ...auth, cartSize: auth.cartSize + 1 });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
      });
      console.log(error);
    }
  };
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <section className="product-bg">
      <div className="prod-images-cont">
        <div className="prod-image">
          <img src={data.image} alt="img" />
        </div>
        <div className="pRow">
          <img src={data.image} alt="img" />
          <img src={data.image} alt="img" />
          <img src={data.image} alt="img" />
        </div>
      </div>
      <div className="prod-details-cont">
        <h1 className="ptitle">{data.brand + " " + data.name.toLowerCase()}</h1>
        <h3 className="pprize">
          ₹ {data.price} <span>3000 </span>
        </h3>
        <div className="pStar">
          <Star rating={data.ratingScore / data.ratings.length || 0} />
        </div>
        <select
          name="size"
          id="size"
          value={size}
          disabled={data.sizeQuantity.length === 0}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {data.sizeQuantity &&
            data.sizeQuantity
              .filter((data) => data.quantity > 0)
              .map((data) => (
                <option key={data.size} value={data.size}>
                  {data.size}
                </option>
              ))}
        </select>

        <button
          disabled={data.sizeQuantity.length === 0}
          className="add-to-carts"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        {data.sizeQuantity.length === 0 && (
          <p className="outOfStock">
            Unfortunately, this product is currently out of stock.
          </p>
        )}
        <h3 className="pDescTitle">Product Details</h3>
        <p>{data.description}</p>
        <h3 className="pDescTitle">
          Color:{" "}
          <p style={{ fontWeight: "normal", display: "inline" }}>
            {data.color}
          </p>
        </h3>
        <h3 className="pDescTitle">
          Material:{" "}
          <p style={{ fontWeight: "normal", display: "inline" }}>
            {data.material}
          </p>
        </h3>
        <h3 className="pDescTitle">Features:</h3>
        <div style={{ marginLeft: "15px" }}>
          {" "}
          <ol>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Integer ut justo quis diam finibus lobortis vel at dui.</li>
            <li>
              Morbi ultricies leo sit amet nisl suscipit, et vulputate orci
              fringilla.
            </li>
            <li>
              Nullam sit amet lacus ut nibh pharetra rutrum venenatis ac purus.
            </li>
            <li>Sed ut arcu dapibus, viverra ex vitae, fermentum libero.</li>
            <li>Fusce eget mauris in elit ultricies vehicula.</li>
            <li>Vivamus tincidunt ligula id sollicitudin finibus.</li>
            <li>Nullam facilisis enim viverra nulla malesuada consequat.</li>
            <li>
              Nullam feugiat turpis ullamcorper augue fringilla, at facilisis
              magna dignissim.
            </li>
          </ol>
        </div>
        <h3 className="pDescTitle">Delivery Option</h3>
        <div>
          <div>
            <input
              type="number"
              name="pincode"
              max={999999}
              min={0}
              placeholder="Enter Pincode"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
            <button className="pincode-check">check</button>
          </div>
          <h5>
            Please enter PIN code to check delivery time & Pay on Delivery
            Availability
          </h5>
          <ul type="none">
            <li>100% Original Products</li>
            <li>Pay on delivery might be available</li>
            <li>Easy 30 days returns and exchanges</li>
            <li>Try & Buy might be available</li>
          </ul>
        </div>
        <h3 className="pDescTitle">Offers</h3>
        <ul type="none">
          <li>Use &apos;SUMILSUTHAR197&apos; to avail flat 20% Off</li>
        </ul>
        <RatingContainer ratings={data.ratings} />
      </div>
    </section>
  );
};
export default ProductDetails;
