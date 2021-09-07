import { IconButton } from "@material-ui/core";
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
import swal from "sweetalert";
import "./hostVenueList.scss";
import AddVenue from "../AddVenueForm/AddVenue";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import travelBooking from '../../assets/illustrations/travelBooking.svg'

const userService = new UserService();
function VenuesList({changeView}:any) {
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venueToView, setVenueToView] = useState<Venue | null>(null);
  const [bookingView, setBookingView] = useState<boolean>(false);
  const [editView, setEditView] = useState<boolean>(false);
  const [update, setUpdate]=useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const [response, error] = await of(userService.getHostById(user.id));
      if (error) {
        swal("error while fetching venues", "error");
      }
      if (response) {
        setTimeout(() => {
          setVenues(response.listOfVenues);
          setLoading(false);
        }, 1000);
      }
    })();
  }, [user,editView,bookingView,update]);

  const bookingsCallback = (venue: Venue) => {
    setVenueToView(venue);
    setEditView(false);
    setBookingView(true);
  };

  const onEdit = (venue: Venue) => {
    setVenueToView(venue);
    setBookingView(false);
    setEditView(true);
  };
  const onDelete = ()=> {
    setUpdate(!update);
  }
  return (
    <>
      {loading && <CircularLoader />}
      {venues.length === 0 && (
        <div className="booking-list-empty-container">
          <div className="empty-list-text">
            <div className="transparent-background">
              You have not added any Venues yet...
              <br />
              <br />
              <span id="get-started-text" onClick={() => changeView(3)}>
                Get Started !
              </span>
              <div style={{marginTop:"1%",marginBottom:"2%"}}>Host a venue with us..</div>
              <img src={travelBooking} alt="" height="60%" width="100%"/>
            </div>
          </div>
        </div>
      )}
      {!bookingView && !editView && (
        <div className="added-venue-card-container" hidden={bookingView}>
          {venues.map((venue) => (
            <AddedVenueCard
              venue={venue}
              onClick={bookingsCallback}
              onEditClick={onEdit}
              onDelete={onDelete}
              key={venue.id}
            ></AddedVenueCard>
          ))}
        </div>
      )}

      {bookingView && (
        <div className="host-venue-booking-container" hidden={!bookingView}>
          <div className="hvl-back-button" >
            <IconButton onClick={() => setBookingView(false)}>
              <KeyboardBackspaceIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="host-venue-booking-heading">Bookings</div>
          <div hidden={venueToView?.bookings.length !== 0}>Not yet Booked</div>
          {venueToView && (
            <div hidden={venueToView?.bookings.length === 0}>
              <BookingTable rows={venueToView?.bookings}></BookingTable>
            </div>
          )}
        </div>
      )}
      {editView && (
        <div className="hvl-edit-venue-div">
          <div>
            <IconButton onClick={() => setEditView(false)}>
              <KeyboardBackspaceIcon fontSize="large" />
            </IconButton>
          </div>
          <AddVenue venue={venueToView}></AddVenue>
        </div>
      )}
    </>
  );
}

export default VenuesList;
