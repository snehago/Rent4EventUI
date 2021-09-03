import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Venue } from "../../Shared/Interfaces/Venue";
import "./addedVenueCard.scss";
import { useEffect } from "react";
import { of } from "await-of";
import { VenueService } from "../../Services/VenueService";
import { v4 } from "uuid";
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
        key={v4()}
        data-aos="flip-right"
      >
        <div key={v4()} className="added-venue-card-image-container">
          <img key={v4()} src={image} alt="venueImage" />
        </div>
        <div key={v4()} className="added-venue-card-info-section">
          <div key={v4()} className="addded-venue-card-venue-title">
            {venue?.title}
          </div>
          <div key={v4()} className="addded-venue-card-venue-description">
            {venue.description}
          </div>
          <div
            key={v4()}
            className="added-venue-card-venue-address"
          >{`${venue?.address.streetAddress}, ${venue?.address.city}, ${venue?.address.state}, ${venue?.address.country}`}</div>
        </div>
        <div key={v4()} className="added-venue-edit-button ">
          <Button key={v4()} variant="contained" color="primary">
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddedVenueCard;
