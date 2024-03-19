import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Star = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? <FaStarHalfAlt /> : null;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <>
      {Array(fullStars).fill().map((_, i) => <FaStar key={i} />)}
      {halfStar && <FaStarHalfAlt key={fullStars} />}
      {Array(emptyStars).fill().map((_, i) => <FaRegStar key={i + fullStars + (halfStar ? 1 : 0)} />)}
    </>
  );
};

export default Star;
