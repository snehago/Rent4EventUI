import { Box, Button, Divider, Grid, List, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem/ListItem';
import { of } from 'await-of';
import React from 'react'
import swal from 'sweetalert';
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
    const [response, error]= await of(bookingService.cancelBookingFromClient(booking));
    if(error){
      swal("Error","Something went wrong","error");
    }
    if(response) {
      swal("Booking Cancelled","You have successfully canceled your booking","success").then(value => onBack());
    }
  }
  return (
    <>
      <Paper className="bd-paper">
        <Box p={2}>
          <Typography variant="h6" align="center" gutterBottom>
            Booking Details
          </Typography>
          <List>
            <ListItem className={classes.listItem} key={venue.id}>
              <ListItemText primary="Title" />
              <Typography variant="body2">{venue.title}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={venue.id + 1}>
              <ListItemText primary="Capacity" />
              <Typography variant="body2">{venue.capacity}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={venue.id + 3}>
              <ListItemText primary="Price" />
              <Typography variant="body2">${venue.price}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={venue.id + 4}>
              <ListItemText primary="Booking amount" />
              <Typography variant="body2">${booking.amountPaid}</Typography>
            </ListItem>
            {booking?.listOfServices?.map((service) => (
              <ListItem className={classes.listItem} key={service.id + 11}>
                <ListItemText primary={service.name} />
                <Typography variant="body2">${service.price}</Typography>
              </ListItem>
            ))}
            <Divider />
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                ${booking?.amountPaid}
              </Typography>
            </ListItem>
          </List>
          <Grid container>
            <Grid item lg={6}>
              <Button
                className="bd-back-button"
                variant="outlined"
                color="primary"
                onClick={onBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item lg={6}>
              <Button
                variant="contained"
                className="bd-cancel-button"
                onClick={cancelConfirmation}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default BookingDetails
