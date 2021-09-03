import { of } from "await-of";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { VenueService } from "../../Services/VenueService";
import { Booking } from "../../Shared/Interfaces/Booking";
import { Venue } from "../../Shared/Interfaces/Venue";
import "./bookingCard.scss";
import swal from 'sweetalert';
const venueService = new VenueService();

function BookingCard({ booking, onClick }: { booking: Booking, onClick:any }) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [image, setImage]=useState<any>(null);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getVenueByVenueId(booking.venue.id)
      );
      if (error) {
        swal("Venue details not found","error");
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
    <div className="booking-card-base" onClick={()=> onClick(venue,booking)}>
      <div className="booking-card-image-container">
        <img
          src={image}
          alt="venue-logo"
        ></img>
      </div>
      <div className="booking-card-info-section">
        <div className="booking-card-venue-title">{venue?.title}</div>
        <div className="booking-card-venue-address">{`${venue?.address.streetAddress}, ${venue?.address.city}, ${venue?.address.state}, ${venue?.address.country}, ${venue?.address.pin}`}</div>
        <div className="booking-card-booking-date">
          {" "}
          <b>from:</b> {moment(booking.from).format("LL")} - <b>to:</b>{" "}
          {moment(booking.to).format("LL")}
        </div>
      </div>
      <div className="booking-card-days-section">
        for {Math.abs(new Date(booking.to).getDay() - new Date(booking.from).getDay())}{" "}
        day(s).
      </div>
      <div className="booking-card-status-section">
        <div className="booking-card-status-label">Booked</div>
        <div className="booking-card-price-label">${booking.amountPaid}</div>
      </div>
    </div>
  );
}

export default BookingCard;
