import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import "./clientsteps.scss";
import login from "../../assets/illustrations/login.svg";
import selectVenue from "../../assets/illustrations/bookVenue.svg";
import datePicker from "../../assets/illustrations/datePicker.svg";
import Yourdetails from "../../assets/illustrations/details.svg";
import done from "../../assets/illustrations/done.svg";

const clientSteps = [
  {
    id: 1,
    name: "Sign Up For Free",
    graphic: login,
  },
  {
    id: 2,
    name: "Select A Venue",
    graphic: selectVenue,
  },
  {
    id: 3,
    name: "Select Dates",
    graphic: datePicker,
  },
  {
    id: 4,
    name: "Give Your Details",
    graphic: Yourdetails,
  },
  {
    id: 5,
    name: "Book The Venue",
    graphic: done,
  },
];

function ClientSteps() {
  return (
    <Grid container spacing={2} className="client-steps-container">
      <Grid item xs={12} sm={12} className="client-steps-container-heading">
        <Typography
          variant="h5"
          align="center"
          className="hp-event-type-filter-heading"
        >
          Book a venue with us in no time following 5 easy steps..
        </Typography>
      </Grid>

      <Grid
        container
        justifyContent="center"
        spacing={2}
        className="client-steps-section-container"
      >
        {clientSteps.map((item: any) => (
          <Grid
            container
            item
            xs={12}
            sm={12}
            lg={3}
            className="client-steps-item"
            data-aos="zoom-in"
            data-aos-once
          >
            <Grid item xs={6}>
              <img src={item.graphic} alt="" height="100%" width="100%" />
            </Grid>
            <Grid
              item
              direction="column"
              className="client-step-details"
              container
              xs={6}
            >
              <Avatar className="client-step-no">{item.id}</Avatar>
              <br />

              <div className="client-step-text">{item.name}</div>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default ClientSteps;
