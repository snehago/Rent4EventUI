import { of } from "await-of";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { VenueService } from "../../Services/VenueService";
import { Booking } from "../../Shared/Interfaces/Booking";
import { Venue } from "../../Shared/Interfaces/Venue";
import "./bookingCard.scss";
import swal from 'sweetalert';
import { v4 } from "uuid";
import { SharedService } from "../../Services/SharedService";
import { Skeleton } from "@material-ui/lab";
const venueService = new VenueService();
const sharedService = new SharedService();
function BookingCard({ booking, onClick }: { booking: Booking, onClick:any }) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [image, setImage]=useState<any>(null);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getVenueByVenueId(booking.venue.id)
      );
      if (error) {
        swal("Error","Venue details not found","error");
      }
      if (response) {
        setVenue(response);
        const [images, imagesError] = await of(venueService.getVenuePictures(response?.id,response.host?.id));
        if(imagesError || images.length === 0) {
          return;
        }
        if(images)setImage(images[0]);
      }
    })();
  }, [booking]);
  
  return (
    <>
    {(!venue || !image) ? (
        <div className="avc-skeleton-container">
          <Skeleton animation="wave" variant="rect" width="15vw" height="8vw" />
          <div>
            <Skeleton animation="wave" width="50vw" />
            <Skeleton animation="wave" width="50vw" />
            <Skeleton animation="wave" width="50vw" />
          </div>
        </div>
      ):
    <div
      key={v4()}
      className="booking-card-base"
      onClick={() => onClick(venue, booking)}
    >
      <div key={v4()} className="booking-card-image-container">
        <img src={image} alt="venue-logo"></img>
      </div>
      <div key={v4()} className="booking-card-info-section">
        <div key={v4()} className="booking-card-venue-title">
          {venue?.title}
        </div>
        <div
          key={v4()}
          className="booking-card-venue-address"
        >{`${venue?.address.streetAddress}, ${venue?.address.city}, ${venue?.address.state}, ${venue?.address.country}, ${venue?.address.pin}`}</div>
        <div key={v4()} className="booking-card-booking-date">
          {" "}
          from: <b>{moment(booking.from).format("LL")}</b> - to:{" "}
          <b>{moment(booking.to).format("LL")}</b>
        </div>
      </div>
      <div key={v4()} className="booking-card-days-section">
        for{" "}
        {sharedService.getDifferenceInDays(new Date(booking.from),new Date(booking.to))}
        {" "}
        day(s).
      </div>
      <div key={v4()} className="booking-card-status-section">
        {booking?.status?.toUpperCase() === "BOOKED" && (
          <div key={v4()} className="booking-card-booked-status-label">
            {booking?.status?.toUpperCase()}
          </div>
        )}
        {booking?.status?.toUpperCase() === "CANCELLED" && (
          <div key={v4()} className="booking-card-cancel-status-label">
            {booking?.status?.toUpperCase()}
          </div>
        )}
        <div key={v4()} className="booking-card-price-label">
          ${booking.amountPaid}
        </div>
      </div>
    </div>}
    </>
  );
}

export default BookingCard;
