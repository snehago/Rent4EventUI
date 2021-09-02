import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Header from "../Components/Header";
import AdditionalForm from "../Components/AdditionalForm/AdditionalForm";
import OrderSummaryForm from "../Components/OrderSummary/OrderSummaryForm";
import { BookingService } from "../Services/BookingService";
import { VenueService } from "../Services/VenueService";
import { useHistory, useParams } from "react-router-dom";
import { Venue } from "../Shared/Interfaces/Venue";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { of } from "await-of";
import CircularLoader from "../Components/CircularLoader/CircularLoader";
import SimpleModal from "../Components/Modal";
import swal from "sweetalert";

const bookingService = new BookingService();
const venueService = new VenueService();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: "5%",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Additional Services", "Order Summary"];

export default function CheckoutPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const { venueId } = useParams<any>();
  const [venue, setVenue] = useState<Venue | null>(null);

  const [numberOfAttendees, setNumberOfAttendees] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();
  const user = useSelector((state: RootState) => state.auth.user);
  const dates = useSelector((state: RootState) => state.cart.dates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getVenueByVenueId(venueId)
      );
      if (error) {
        swal("Unable to fetch venue details","error");
      }
      if (response) {
        setTimeout(() => {
          console.log("Venue:",response)
          setVenue(response);
          setLoading(false);
        }, 1000);
      }
    })();

    window.scrollTo(0, 0);
  }, [venueId]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AdditionalForm venue={venue} />;
      case 1:
        return <OrderSummaryForm venue={venue} />;

      default:
        throw new Error("Unknown step");
    }
  }

  const onModalClose = () => {
    setOpen(false);
    history.push("/home");
  };
  const onSubmit = async (values: any) => {
    console.log(values);
    setLoading(true);
    values.preventDefault();
    const data: any = {
      user: {
        id: user.id,
      },
      venue: {
        id: venueId,
      },
      from: dates?.startDate,
      to: dates.endDate,
      amountPaid: venue ? (venue?.price * 10) / 100 : 0,
      numberOfAttendees,
    };
    console.log(data);
    const [response, error] = await of(bookingService.addBooking(data));
    if (error) {
      swal("Something went wrong try again!","error");
    }
    if (response) {
      setLoading(false)
      swal("Booking Successfull",`your booking id is ${response.id}`,"success").then(value => onModalClose());
    }
  };

  return (
    <React.Fragment>
      {loading && <CircularLoader />}
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        <Paper elevation={10} className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  {activeStep <= steps.length - 2 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}

                  {activeStep === steps.length - 1 && (
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      className={classes.button}
                      onClick={onSubmit}
                    >
                      Book The Venue
                    </Button>
                  )}

                  {/* <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onSubmit}
                  >
                    Book The Venue
                  </Button> */}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>

      <div>
        <SimpleModal
          title="Booking successfull"
          content={`Your booking for venue is completed your booking id is ${venueId}`}
          open={open}
          type="success"
          closeCallback={onModalClose}
        />
      </div>
    </React.Fragment>
  );
}
