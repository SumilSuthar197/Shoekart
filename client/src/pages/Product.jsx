import "../styles/products.css";
import cover from "../Images/1.jpg";
import products from "../Data";
import Card from "../components/Card";

const Product = () => {
  return (
    <>
      <div
        className="Header_title"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          alignItems: "flex-start",
          textAlign: "initial",
        }}
      >
        <h1>Find your favorite Shoes Today</h1>
        <div className="searchform">
          <input type="text" name="" id="" placeholder="What shoes are you looking for ?"/>
          <button type="submit">Search</button>
        </div>
      </div>
      <section className="Featured-products" style={{paddingTop:"56px"}}>
        <div className="product-container">
          {products.map((item) => {
            return <Card key={item.id} {...item} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Product;
