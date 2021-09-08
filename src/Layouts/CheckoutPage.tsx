import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import { v4 } from "uuid";
import { Paper } from "@material-ui/core";

const bookingService = new BookingService();
const venueService = new VenueService();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Rent4Event
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
    height:"auto",
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
  const { venueId } = useParams<any>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [formValues, setFormValues] = useState<any>({});
  const [servicesSelected, setServicesSelected] = useState<any[]>([]);
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
        swal("Unable to fetch venue details", "error");
      }
      if (response) {
        setTimeout(() => {
          setVenue(response);
          setLoading(false);
        }, 1000);
      }
    })();

    window.scrollTo(0, 0);
  }, [venueId]);

  const handleNext = (values:any, services:any) => {
    setFormValues(values);
    setServicesSelected(services);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onModalClose = () => {
    setOpen(false);
    history.push("/dashboard/client");
  };


  const onSubmit = async (totalPrice:any) => {
    setLoading(true);
    const data: any = {
      user: {
        id: user.id,
      },
      venue: {
        id: venueId,
      },
      from: dates?.startDate,
      to: dates?.endDate,
      amountPaid: totalPrice,
      transactionId: v4(),
      numberOfAttendees: formValues.noOfAttendees,
      listOfServices: servicesSelected,
      status:"booked"
    };
    const [response, error] = await of(bookingService.addBooking(data));
    if (error) {
      swal("Error","Something went wrong !","error");
    }
    if (response) {
      setLoading(false)
      const blob = new Blob([response]);
      const fileName = 'bookingSummary.txt';
      const link = document.createElement("a");
      if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", fileName);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
      swal("Booking Successfull",`your booking id is ${v4()}`,"success").then(value => onModalClose());
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AdditionalForm venue={venue} handleNext={handleNext} />;
      case 1:
        return (
          <OrderSummaryForm
            venue={venue}
            services={servicesSelected}
            formValues={formValues}
            onSubmit={onSubmit}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
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
