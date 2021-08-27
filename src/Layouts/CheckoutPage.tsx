import React,{useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import { VenueService } from '../Services/VenueService';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { of } from 'await-of';
import { Venue } from '../Shared/Interfaces/Venue';
import SimpleModal from '../Components/Modal'
import { useHistory } from 'react-router';
import './styles/checkoutPage.scss';
import { Button, Card, Divider, Grid, TextField } from '@material-ui/core';
const venueService = new VenueService();
export default function CheckoutPage() {
  const { venueId } = useParams<any>();
  const [venue, setVenue]= useState<Venue|null>(null);
  const [open, setOpen]= useState<boolean>(false);
  const history = useHistory();
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
  const onModalClose = ()=> {
    setOpen(false);
    history.push("/home");
  }
  const onSubmit = (data:any) => {
    console.log(data);
    data.preventDefault();
    setOpen(true);
  }
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <div className="checkout-main-content">
        <Grid container spacing={2} className="venue-details-card">
          <Grid item lg={6}>
            <Card>
              <Grid container spacing={4}>
                <Grid item lg={6}>
                  Venue Name
                </Grid>
                <Grid item lg={6}>
                  {venue?.title.toUpperCase()}
                </Grid>
                <Grid item lg={6}>
                  Description
                </Grid>
                <Grid item lg={6}>
                  {venue?.description}
                </Grid>
                <Grid item lg={6}>
                  Capacity
                </Grid>
                <Grid item lg={6}>
                  {venue?.capactiy}
                </Grid>
                <Grid item lg={6}>
                  Contact Details
                </Grid>
                <Grid item lg={6}>
                  {venue && `${venue?.host.firstName} ${venue?.host.lastName}`}
                </Grid>
                <Grid item lg={12}>
                  <Divider/>
                </Grid>
                <Grid item lg={10}>
                  Total Price:
                </Grid>
                <Grid item lg={2}>
                  ${venue?.price}
                </Grid>
                <Grid item lg={10}>
                  Booking amount:
                </Grid>
                <Grid item lg={2}>
                  ${venue && (venue?.price * 10) / 100}
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item lg={5} className="form-container">
            <form onSubmit={(data:any) => onSubmit(data)}>
              <Grid container direction="column" spacing={4}>
                <Grid item lg={12}>
                  <TextField
                    id="contactNumber"
                    name="contactNumnber"
                    label="Contact Number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    id="numberOfAttendees"
                    name="numberOfAttendees"
                    label="Number of Attendees"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Proceed To Pay
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <div>
          <SimpleModal 
            title="Booking successfull"
            content={`Your booking for venue is completed your booking id is ${venueId}`}
            open={open}
            type="success"
            closeCallback={onModalClose}
          />
        </div>
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
