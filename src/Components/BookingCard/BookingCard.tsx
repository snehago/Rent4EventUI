import { of } from "await-of";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { VenueService } from "../../Services/VenueService";
import { Booking } from "../../Shared/Interfaces/Booking";
import { Venue } from "../../Shared/Interfaces/Venue";
import image from '../../assets/images/bgimage.jpg'
import "./bookingCard.scss";
import { useHistory } from "react-router-dom";
const venueService = new VenueService();
function BookingCard({ booking }: { booking: Booking }) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getVenueByVenueId(booking.venue.id)
      );
      if (error) {
        alert(error.message);
      }
      if (response) {
        setVenue(response);
      }
    })();
  }, [booking]);
  const moveToVenueDetails = ()=> {
    history.push(`/venue-details/${venue?.id}`);
  }
  return (
    <div className="booking-card-base" onClick={moveToVenueDetails}>
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
        for {new Date(booking.to).getDay() - new Date(booking.from).getDay()}{" "}
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
