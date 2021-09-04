import { of } from 'await-of';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { BookingService } from '../../Services/BookingService';
import { Booking } from '../../Shared/Interfaces/Booking';
import { User } from '../../Shared/Interfaces/User';
import BookingCard from '../BookingCard';
import './bookingList.scss';
import swal from 'sweetalert';
import BookingDetails from '../BookingDetails';
import { v4 } from 'uuid';
const bookingService = new BookingService();
function BookingList() {
  const user:User = useSelector((state:RootState)=> state.auth.user);
  const [bookings, setBookings]= useState<Booking[]>([]);
  const [venue, setVenue] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const [bookingView, setBookingView]=useState<boolean>(false);

  useEffect(()=> {
    (async ()=> {
      const [response,error]= await of(bookingService.getBookingByUserId(user.id));
      if(error) {
        swal("Unable to fetch your bookings","error");
      }
      if(response) {
        setBookings(response);
      }
    })();
  },[user,bookingView])
  const showBookingDetails = (venue:any,booking:any)=> {
    setVenue(venue);
    setBooking(booking);
    setBookingView(true);
  }
  return (
    <>
      {!bookingView && (
        <div
          className="booking-card-container"
          data-aos="slide-left"
          data-aos-once
        >
          {bookings.map((booking) => (
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

export default BookingList
