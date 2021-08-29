import { Avatar, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import "./userreview.scss";
function UserReview(props: any) {
  useEffect(() => {});
  const [userRatingValue, setUserRatingValue] = useState(2.5);
  return (
    <div className="user-review-container">
      <Avatar>{props.feedbackItem.name[0]}</Avatar>

      <div className="user-heading">
        {props.feedbackItem.name}
        <div className="user-star-rating">
          <Box component="fieldset" borderColor="transparent">
            <div>
              <Rating
                name="read-only"
                size="small"
                value={props.feedbackItem.rating}
                readOnly
              />
            </div>
          </Box>

          <div className="user-feedback">
            {props.feedbackItem.comment}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReview;
