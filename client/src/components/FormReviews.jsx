import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
const FormReviews = ({ onClose, onSubmit }) => {
  const modelRef = useRef();
  const [rating, setRating] = useState(1);
  const [opinion, setOpinion] = useState("");

  const closeModal = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  //   const handleStarClick = (idx) => {
  //     setRating(idx + 1);
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ rating, opinion });
  };

  return (
    <div ref={modelRef} onClick={closeModal} className="modal">
      <div className="formReview">
        <h3>How would you rate this product?</h3>
        <form onSubmit={handleSubmit}>
          <div className="rating">
            {[...Array(5)].map((_, idx) => (
              <FaStar
                key={idx}
                style={{ cursor: "pointer" }}
                color={idx < rating ? "#ffc107" : "#e4e5e9"}
                onClick={() => setRating(idx + 1)}
              />
            ))}
          </div>
          <textarea
            name="opinion"
            cols="30"
            rows="5"
            placeholder="Your opinion..."
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
          ></textarea>
          <div className="rating-btn">
            <button type="submit">Submit</button>
            <button onClick={() => onClose()} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormReviews;
