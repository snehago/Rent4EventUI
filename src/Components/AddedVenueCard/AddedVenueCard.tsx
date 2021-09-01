import { Button } from "@material-ui/core";
import React from "react";
import { Venue } from "../../Shared/Interfaces/Venue";
import image from "../../assets/images/bgimage.jpg";
import "./addedVenueCard.scss";

function AddedVenueCard({ venue, onClick }: { venue: Venue; onClick: any }) {
  return (
    <>
      <div
        className="added-venue-card-base"
        onClick={() => onClick(venue)}
        data-aos="flip-right"
      >
        <div className="added-venue-card-image-container">
          <img src={image} alt="venueImage" />
        </div>
        <div className="added-venue-card-info-section">
          <div className="addded-venue-card-venue-title">{venue?.title}</div>
          <div className="addded-venue-card-venue-description">
            {venue.description}
          </div>
          <div className="added-venue-card-venue-address">{`${venue?.address.streetAddress}, ${venue?.address.city}, ${venue?.address.state}, ${venue?.address.country}`}</div>
        </div>
        <div className="added-venue-edit-button ">
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddedVenueCard;
