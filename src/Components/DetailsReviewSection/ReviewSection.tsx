import { Box, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import UserReview from "../UserReview/UserReview";
import "./reviewsection.scss";

function ReviewSection() {
  const [ratingValue, setRatingValue] = useState(2.5);
  const [totalReviews, setTotalReview] = useState(50);

  const [feedBacks, setFeedBacks] = useState([
    {
      id: 1,
      name: "Vinayak Jaiswal",
      rating: 2.5,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia autem alias sapiente non praesentium soluta adipisci? Magni delenitiquasi rem ullam, odio assumenda voluptates veritatis expedita sintipsam, vitae fuga.",
    },
    {
      id: 2,
      name: "Rahul Jaiswal",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia autem alias sapiente non praesentium soluta adipisci? Magni delenitiquasi rem ullam, odio assumenda voluptates veritatis expedita sintipsam, vitae fuga.",
    },
    {
      id: 3,
      name: "Rohit Singh",
      rating: 1,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia autem alias sapiente non praesentium soluta adipisci? Magni delenitiquasi rem ullam, odio assumenda voluptates veritatis expedita sintipsam, vitae fuga.",
    },
    {
      id: 4,
      name: "Mohit Singh",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia autem alias sapiente non praesentium soluta adipisci? Magni delenitiquasi rem ullam, odio assumenda voluptates veritatis expedita sintipsam, vitae fuga.",
    },
  ]);
  
  return (
    <div className="details-reviews-container" data-aos="slide-up" data-aos-once>
      <div className="details-review-label">Review &amp; Ratings</div>
      <Box
        component="fieldset"
        className="review-rating-box"
        borderColor="transparent"
      >
        <div className="review-rating-container">
          <div id="review-ratingValue">{ratingValue}</div>
          <Rating
            name="read-only"
            className="rating"
            size="large"
            value={ratingValue}
            readOnly
          />
        </div>
      </Box>

      <div className="review-subtitle">
        <span id="review-grade">{ratingValue >= 2.5 ? "Good " : "Bad "}</span>|
        <span id="no-of-reviews">{` ${totalReviews} Reviews`}</span>
      </div>

      <div data-aos="fade-up" data-aos-once>
        {feedBacks.map((item) => (
          <UserReview feedbackItem={item} />
        ))}
      </div>

      <div>
        <Button variant="outlined" className="reviews-view-more-btn">
          View More
        </Button>
      </div>
    </div>
  );
}

export default ReviewSection;
