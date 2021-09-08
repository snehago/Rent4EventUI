import { of } from "await-of";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { BookingService } from "../../Services/BookingService";
import { Booking } from "../../Shared/Interfaces/Booking";
import { User } from "../../Shared/Interfaces/User";
import BookingCard from "../BookingCard";
import "./bookingList.scss";
import swal from "sweetalert";
import BookingDetails from "../BookingDetails";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import travelBooking from "../../assets/illustrations/travelBooking.svg";
import { Button } from "@material-ui/core";
import CircularLoader from "../CircularLoader/CircularLoader";

const bookingService = new BookingService();
function BookingList() {
  const history = useHistory();
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [bookings, setBookings] = useState<Booking[]|null>(null);
  const [venue, setVenue] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const [bookingView, setBookingView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [response, error] = await of(
        bookingService.getBookingByUserId(user.id)
      );
      if (error) {
        swal("Unable to fetch your bookings", "error");
        setBookings([]);
        setLoading(false);
      }
      if (response) {
        setLoading(false);
        setBookings(response);
      }
    })();
  }, [user, bookingView]);
  const showBookingDetails = (venue: any, booking: any) => {
    setVenue(venue);
    setBooking(booking);
    setBookingView(true);
  };

  const goToVenuesList = () => {
    history.push("/venue-list");
  };
  return (
    <>
      {loading && <CircularLoader />}
      {!loading && bookings?.length === 0 && (
        <div className="booking-list-empty-container">
          <div className="empty-list-text">
            <div className="transparent-background">
              You have no booking history for now...
              <br />
              <br />
              <Button
                variant="outlined"
                className="get-started-btn"
                onClick={goToVenuesList}
              >
                Get Started
              </Button>
              <div style={{ marginTop: "1%", marginBottom: "2%" }}>
                Book a venue with us..
              </div>
              <img src={travelBooking} alt="" height="60%" width="100%" />
            </div>
          </div>
        </div>
      )}
      {!bookingView && (
        <div
          className="booking-card-container"
          data-aos="slide-left"
          data-aos-once
        >
          {bookings?.map((booking) => (
            <BookingCard
              key={v4()}
              booking={booking}
              onClick={showBookingDetails}
            ></BookingCard>
          ))}
        </div>
      )}
      {bookingView && (
        <BookingDetails
          venue={venue}
          booking={booking}
          key={v4()}
          onBack={() => setBookingView(false)}
        ></BookingDetails>
      )}
    </>
  );
}

export default BookingList;
