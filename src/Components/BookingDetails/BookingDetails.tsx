import { Box, Button, Divider, Grid, List, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem/ListItem';
import { of } from 'await-of';
import React from 'react'
import swal from 'sweetalert';
import { v4 } from 'uuid';
import { BookingService } from '../../Services/BookingService';
import './bookingDetails.scss';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 1),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const bookingService = new BookingService();

function BookingDetails({venue, booking, onBack}:any) {
  const classes = useStyles();
  const cancelConfirmation = ()=> {
    swal("Do you want to cancel your booking ?", {
      buttons:["Cancel","Ok"]
    }).then((value) => value?cancelBooking():swal(value));
  }
  const cancelBooking =async () => {
    console.log({booking})
    const [response, error]= await of(bookingService.cancelBookingFromClient(booking));
    if(error){
      swal("Error","Something went wrong","error");
    }
    if(response) {
      swal("Booking Cancelled","You have successfully canceled your booking","success").then(value => onBack());
    }
  }
  return (
    <div className="bd-paper-container " data-aos="slide-left" data-aos-once>
      <Paper elevation={5} className="bd-paper " >
        <Box p={2} className="scroll-div">
          <Typography variant="h6" align="center" gutterBottom>
            Booking Details
          </Typography>
          <List>
            <ListItem key={v4()} className={classes.listItem}>
              <ListItemText primary="Title" />
              <Typography variant="body2">{venue.title}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={v4()}>
              <ListItemText primary="Capacity" />
              <Typography variant="body2">{venue.capacity}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={v4()}>
              <ListItemText primary="Price" />
              <Typography variant="body2">${venue.price}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={v4()}>
              <ListItemText primary="Booking amount" />
              <Typography variant="body2">${booking.amountPaid}</Typography>
            </ListItem>
            {booking?.listOfServices?.map((service) => (
              <ListItem className={classes.listItem} key={v4()}>
                <ListItemText primary={service.name} />
                <Typography variant="body2">${service.price}</Typography>
              </ListItem>
            ))}
            <Divider />
            <ListItem className={classes.listItem} key={v4()}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                ${booking?.amountPaid}
              </Typography>
            </ListItem>
          </List>
          <Grid container key={v4()}>
            <Grid item lg={6} key={v4()}>
              <Button
                className="bd-back-button"
                variant="outlined"
                color="primary"
                onClick={onBack}
              >
                Back
              </Button>
            </Grid>
            { booking.status.toUpperCase()==="BOOKED" && <Grid item lg={6}>
              <Button
                key={v4()}
                variant="contained"
                className="bd-cancel-button"
                onClick={cancelConfirmation}
              >
                Cancel
              </Button>
            </Grid>}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

export default BookingDetails
