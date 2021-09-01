import { Button } from "@material-ui/core";
import { of } from "await-of";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { UserService } from "../../Services/UserService";
import { User } from "../../Shared/Interfaces/User";
import { Venue } from "../../Shared/Interfaces/Venue";
import AddedVenueCard from "../AddedVenueCard";
import CircularLoader from "../CircularLoader/CircularLoader";
import BookingTable from "./BookingTable";
import "./hostVenueList.scss";
const userService = new UserService();
function VenuesList() {
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venueToView, setVenueToView] = useState<Venue | null>(null);
  const [bookingView, setBookingView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const [response, error] = await of(userService.getHostById(user.id));
      if (error) {
        alert("error while fetching venues");
      }
      if (response) {
        setTimeout(() => {
          setVenues(response.listOfVenues);
        setLoading(false);
        }, 1000);
        
      }
    })();
  }, [user]);

  const bookingsCallback = (venue: Venue) => {
    setVenueToView(venue);
    setBookingView(true);
  };
  return (
    <>
      {loading && <CircularLoader />}
      {!bookingView && (
        <div className="added-venue-card-container" hidden={bookingView}>
          {venues.map((venue) => (
            <AddedVenueCard
              venue={venue}
              onClick={bookingsCallback}
            ></AddedVenueCard>
          ))}
        </div>
      )}

      {bookingView && (
        <div className="host-venue-booking-container" hidden={!bookingView}>
          <div className="host-venue-booking-heading">Bookings</div>
          <div hidden={venueToView?.bookings.length !== 0}>Not yet Booked</div>
          {venueToView && (
            <div hidden={venueToView?.bookings.length === 0}>
              <BookingTable rows={venueToView?.bookings}></BookingTable>
            </div>
          )}
          <br/>
          <div>
            <Button variant="outlined" color="primary" onClick={()=>setBookingView(false)} >Back</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default VenuesList;
