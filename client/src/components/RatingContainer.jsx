import React, { memo, useState } from "react";
import RatingCard from "./RatingCard";

const RatingContainer = ({ ratings }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  return (
    <div style={{ marginTop: "15px" }}>
      {ratings.length > 0 && (
        <>
          <h3 className="pDescTitle">Ratings </h3>
          {ratings.slice(0, visibleReviews).map((data, index) => (
            <RatingCard key={index} data={data} />
          ))}
          {ratings.length > visibleReviews && (
            <button
              className="add-to-carts"
              style={{ margin: "1rem 0rem 0rem" }}
              onClick={() => setVisibleReviews(visibleReviews + 3)}
            >
              Show more reviews
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default memo(RatingContainer);
