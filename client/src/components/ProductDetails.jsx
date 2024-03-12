import {  useParams } from "react-router-dom";
import products from "../Data";
import "../styles/productDetails.css";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartslice";

// export const loader =
//   () =>
//   async ({ params }) => {
//     const { id } = params;
//     return { id };
//   };

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const { id } = useLoaderData();
  const { id } = useParams();
  const info = products.filter((item) => item.id == id);
  console.log(info[0]);
  return (
    <section className="product-bg">
      <div className="pImages">
        <div className="prod-image">
          <img src={info[0].image} alt="img" />
        </div>
        <div className="pRow">
          <img src={info[0].image} alt="img" />
          <img src={info[0].image} alt="img" />
          <img src={info[0].image} alt="img" />
        </div>
      </div>
      <div className="prod-details-cont">
        <h1 className="ptitle">{info[0].name}</h1>
        <h3 className="pprize">
          ${info[0].price} <span>$3000 </span>
        </h3>
        <select name="" id="">
          <option value="">Select Size</option>
          <option value="10">10</option>
          <option value="10">11</option>
          <option value="10">12</option>
          <option value="10">13</option>
        </select>
        <button
          className="add-to-carts"
          onClick={() => {
            dispatch(addItem(info[0].id));
          }}
        >
          Add to cart
        </button>
        <h3 className="pDescTitle">Product Details</h3>
        <p>
          With an aged aesthetic and classic colors, the AF-1 gets a vintage
          makeover. Crisp leather with a checked pattern on the Swoosh and heel
          adds a festive feel for easy styling. Pair it with jeans, joggers or
          whatever else—the timeless look is the perfect match for any
          outfit.Debuting in 1982 as a basketball must-have, the Air Force 1
          came into its own in the &apos;90s. The clean look of the classic
          white-on-white AF-1 was endorsed from the basketball courts to the
          street and beyond. Finding its rhythm in hip-hop culture, releasing
          limited collabs and colorways, Air Force 1 became an iconic sneaker
          around the globe. And with over 2,000 iterations of this staple, its
          impact on fashion, music and sneaker culture can&apos;t be denied.
        </p>
        <h3 className="pDescTitle">Features:</h3>
        <p style={{ marginLeft: "15px" }}>
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
        </p>
        <h3 className="pDescTitle">Delivery Option</h3>
        <div>
          <div className="prodInputCont">
            <input
              type="number"
              name="pincode"
              id=""
              maxLength="6"
              placeholder="Enter Pincode"
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
          <li>Use &apos;NIKE2023&apos; to avail flat $500 Off</li>
        </ul>
      </div>
    </section>
  );
};
export default ProductDetails;
