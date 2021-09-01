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


// Your Details(done)

// const venue = {
//   title: "Grand Continental",
//   desc: "Popular in Allahabad for marriages",
//   capacity: "600",
//   price: 50000,
// };

const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

var todayDate = dd + "/" + mm + "/" + yyyy;
const payments = [
  { name: "Booking Id", detail: uuidv4() },
  { name: "Booking Date", detail: todayDate },
];

const servicesOpted = [
  {
    id: 1,
    name: "Catering",
    price: 5000,
  },
  {
    id: 2,
    name: "Decoration",
    price: 5000,
  },
  {
    id: 3,
    name: "DJ Nights",
    price: 5000,
  },
];

var servicesPrice = 0;
servicesOpted.forEach((element) => (servicesPrice += element.price));

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

  const venue = props.venue;
  const bookingPrice = (venue.price * 10) / 100;
  var totalPrice = bookingPrice + venue.price;
  totalPrice += servicesPrice;

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
          <div className="order-summary-price">${venue.price}</div>
        </ListItem>

        <ListItem className={classes.listItem} key={venue.title}>
          <ListItemText primary="Booking Price" />
          <div className="order-summary-price">${bookingPrice}</div>
        </ListItem>

        <DividerComponent />

        <div className="order-summary-labels">Additional Services Added</div>
        {servicesOpted.map((service) => (
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
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
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
      </Grid>

    </React.Fragment>
  );
}
