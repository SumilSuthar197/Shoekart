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
      {/* <div className="ratingUpperDiv">
        <div className="ratingInfo">
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
      </div> */}
    </div>
  );
};

export default memo(RatingCard);
