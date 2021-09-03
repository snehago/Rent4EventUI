import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Venue } from "../../Shared/Interfaces/Venue";
import "./addedVenueCard.scss";
import { useEffect } from "react";
import { of } from "await-of";
import { VenueService } from "../../Services/VenueService";
const venueService = new VenueService();
function AddedVenueCard({ venue, onClick }: { venue: Venue; onClick: any }) {
  const [image, setImage]= useState<any>(null);
  useEffect(()=>{
    (async ()=>{
      const [response]= await of(venueService.getVenuePictures(venue.id,venue.host.id));
      if(response && response.length>0)setImage(response[0]);
    })();
  },[venue])
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
