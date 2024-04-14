import { memo } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import Star from "./Star";
const RatingCard = ({ data }) => {
  // console.log(data);
  const date = new Date(data.date);
  const formattedDate = date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div className="ratingContainer">
      <div className="ratingIcon">{data.name[0].toUpperCase()}</div>
      <div className="ratingMessage">
        <div className="ratingDiv1">{data.name}</div>
        <div className="ratingDiv2">
          <div className="ratingStarCont">
            <Star rating={data.rating || 0} />
          </div>
          <p>{data.review}</p>
        </div>
        <div className="ratingDiv3">on {formattedDate}</div>
      </div>
    </div>
  );
};

export default memo(RatingCard);
