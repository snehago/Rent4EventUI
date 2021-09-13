import { Button} from "@material-ui/core";
import React, { useState } from "react";
import { Venue } from "../../Shared/Interfaces/Venue";
import "./addedVenueCard.scss";
import { useEffect } from "react";
import { of } from "await-of";
import { VenueService } from "../../Services/VenueService";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import swal from "sweetalert";
import { Skeleton } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
const venueService = new VenueService();
function AddedVenueCard({ venue, onClick, onEditClick,onDelete}: { venue: Venue; onClick: any, onEditClick:any,onDelete:any}) {
  const [image, setImage]= useState<any>(null);
  const [loading, setLoading]= useState<boolean>(false);
  useEffect(()=>{
    (async ()=>{
      setLoading(true)
      const [response]= await of(venueService.getVenuePictures(venue.id,venue.host.id));
      if(response && response.length>0){
        setTimeout(() => {
          setLoading(false);
          setImage(response[0]) 
        }, 1000);
        
      };
    })();
  },[venue])
  
  const deleteVenue =async ()=> {
    setLoading(true);
    const [response, error]= await of(venueService.deleteVenue(venue.id));
    if(error) {
      swal("Error","Cancel the existing booking first!","error");
    }
    if(response) {
      swal("Success","Venue Deleted","success");
    }
    onDelete();
    setLoading(false);
  }
  return (
    <>
      {loading && (
        <div className="avc-skeleton-container">
          <Skeleton animation="wave" variant="rect" width="15vw" height="8vw" />
          <div>
            <Skeleton animation="wave" width="50vw" />
            <Skeleton animation="wave" width="50vw" />
            <Skeleton animation="wave" width="50vw" />
          </div>
        </div>
      )}
      {!loading && (
        <div
          className="added-venue-card-base"
          data-aos="slide-right"
          data-aos-once
        >
          <div className="added-venue-card-image-container">
            <img src={image} alt="venueImage" />
          </div>
          <div
            onClick={() => onClick(venue)}
            className="added-venue-card-info-section"
          >
            <div className="addded-venue-card-venue-title">{venue?.title}</div>
            <div className="addded-venue-card-venue-description">
              {venue.description}
            </div>
            <div className="added-venue-card-venue-address">{`${venue?.address.streetAddress}, ${venue?.address.city}, ${venue?.address.state}, ${venue?.address.country}`}</div>
          </div>
          <div className="added-venue-edit-button-container">
            <Button
              className="added-venue-edit-button"
              onClick={() => onEditClick(venue)}
            >
              <EditIcon/>
            </Button>
            <Button className="avc-delete-button" onClick={deleteVenue}>
              <DeleteOutlineIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddedVenueCard;
