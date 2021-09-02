import React, { useEffect, useState } from "react";

import "./addVenue.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { of } from "await-of";
import { useHistory } from "react-router";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AddVenueDetails from "./AddVenueDetails";
import AddVenueImages from "./AddVenueImages";
import { makeStyles } from "@material-ui/core/styles";

const steps = ["Enter Venue Details", "Add Venue Images"];

const useStyles = makeStyles((theme) => ({
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
    display: "flex",
    width: "70%",
    justifyContent: "center",
    marginLeft: "13%",
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

export default function AddVenue() {
  const user = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    console.log("Next");
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddVenueDetails handleNext={handleNext} />;
      case 1:
        return <AddVenueImages handleBack={handleBack} />;

      default:
        throw new Error("Unknown step");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>{getStepContent(activeStep)}</>
      </div>
    </div>
  );
}
