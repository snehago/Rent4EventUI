import { of } from 'await-of';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { BookingService } from '../../Services/BookingService';
import { Booking } from '../../Shared/Interfaces/Booking';
import { User } from '../../Shared/Interfaces/User';
import BookingCard from '../BookingCard';
import './bookingList.scss';
const bookingService = new BookingService();
function BookingList() {
  const user:User = useSelector((state:RootState)=> state.auth.user);
  const [bookings, setBookings]= useState<Booking[]>([]);
  useEffect(()=> {
    (async ()=> {
      const [response,error]= await of(bookingService.getBookingByUserId(user.id));
      if(error) {
        alert(error.message);
      }
      if(response) {
        setBookings(response);
      }
    })();
  },[user])
  
  return (
    <div className="booking-card-container" >
      {bookings.map((booking)=> <BookingCard booking={booking} ></BookingCard> )}
    </div>
  )
}

export default BookingList
