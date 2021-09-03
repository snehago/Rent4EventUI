import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { v4 as uuidv4 } from "uuid";
import "./ordersummary.scss";
import DividerComponent from "../DividerComponent/DividerComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import moment from "moment";
import { User } from "../../Shared/Interfaces/User";
import { Button } from "@material-ui/core";

const payments = [
  { name: "Booking Id", detail: uuidv4() },
  { name: "Booking Date", detail: moment(Date.now()).format('LL') },
];



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderSummaryForm(props) {
  const classes = useStyles();
  const { startDate, endDate }:any = useSelector(
    (state: RootState) => state.cart.dates
  );
  const user:User =useSelector((state:RootState)=> state.auth.user);
  const venue = props.venue;
  const data = props?.formValues;
  const servicesOpted = props?.services;
  var servicesPrice = 0;
  servicesOpted?.forEach((element) => (servicesPrice += element.price));
  const numberOfDays= Math.abs(new Date(startDate).getDay()-new Date(endDate).getDay())+1;
  const bookingPrice = ((venue.price * 10) / 100)*numberOfDays;
  var totalPrice = bookingPrice + servicesPrice;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <React.Fragment>
      <div className="order-summary-labels">Order summary</div>
      <List disablePadding>
        <ListItem className={classes.listItem} key={venue.title}>
          <ListItemText
            primary={venue.title}
            secondary={`Capacity: ${venue.capacity}`}
          />
          <div className="order-summary-price">${venue.price}/day</div>
        </ListItem>

        <ListItem className={classes.listItem} key={venue.title}>
          <ListItemText
            primary="Booking Date:"
            secondary={`Number of day(s): ${numberOfDays}`}
          />
          <div>
            <b>from:</b>
            {moment(startDate).format("LL")} - <b>to:</b>
            {moment(endDate).format("LL")}
          </div>
        </ListItem>

        <ListItem className={classes.listItem} key={venue.title}>
          <ListItemText primary="Booking Price" />
          <div className="order-summary-price">${bookingPrice}</div>
        </ListItem>

        <DividerComponent />

        <div className="order-summary-labels">Additional Services Added</div>
        {servicesOpted?.map((service) => (
          <ListItem className={classes.listItem} key={service.id}>
            <ListItemText primary={service.name} />
            <div className="order-summary-price">${service.price}</div>
          </ListItem>
        ))}

        <DividerComponent />

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <div className="order-summary-total-price">${totalPrice}</div>
        </ListItem>

        <DividerComponent />
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} className="payment-details-box">
          <div className="order-summary-labels">Your Details</div>
          <Typography gutterBottom>
            {user.firstName + " " + user.lastName}
          </Typography>
          <Typography
            gutterBottom
          >{`${data?.address1}, ${data?.address2}, ${data?.city}, ${data?.state}, ${data?.country}, ${data?.zip}`}</Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={5}
          className="payment-details-box"
        >
          <div className="order-summary-labels">Payment details</div>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <div>{payment.name}</div>
                </Grid>

                <Grid item xs={6}>
                  <div>{payment.detail}</div>
                </Grid>

                <Grid item xs={12}>
                  <p>&nbsp;</p>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid lg={12} >
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className="osf-button"
            onClick={()=> props.onSubmit(totalPrice)}
          >
            Book The Venue
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
