import { memo } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
const RatingCard = ({ data }) => {
  console.log(data);
  return (
    <div className="ratingContainer">
      <div className="ratingUpperDiv">
        <div class="ratingInfo">
          <div className="ratingProfile">
            <FaUserCircle />
          </div>
          <div className="ratingName">
            <h4>{data.name}</h4>
            <span>{data.date.split("T")[0]}</span>
          </div>
        </div>
        <div class="ratingStarCont">
          <FaStar />
          <span class="rating_value">{data.rating}</span>
        </div>
      </div>
      <div class="ratingPara">
        <p>{data.review}</p>
      </div>
    </div>
  );
};

export default memo(RatingCard);
