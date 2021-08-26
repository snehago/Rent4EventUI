import React,{useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import { VenueService } from '../Services/VenueService';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { of } from 'await-of';
import { Venue } from '../Shared/Interfaces/Venue';
const venueService = new VenueService();
export default function CheckoutPage() {
  const { venueId } = useParams<any>();
  const [venue, setVenue]= useState<Venue|null>(null);
  
  useEffect(()=>{
    (async ()=> {
      const [response,error] = await of(venueService.getVenueByVenueId(venueId));
      if(error) {
        alert(error.message);
      }
      if(response) {
        setVenue(response);
      }
    })();
  },[venueId]);
  
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <div className="main-content">
        {JSON.stringify(venue)}
      </div>
      <footer>
        <Footer></Footer>
      </footer>
      
    </>
  );
}
