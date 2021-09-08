import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import "./hoststeps.scss";
import login from "../../assets/illustrations/login.svg";
import mapLocate from "../../assets/illustrations/mapLocate2.svg";
import details from "../../assets/illustrations/details.svg";
import uploadImage from "../../assets/illustrations/uploadImage.svg";

const clientSteps = [
  {
    id: 1,
    name: "Sign Up For Free",
    graphic: login,
  },
  {
    id: 2,
    name: "Add Venue Details",
    graphic: details,
  },
  {
    id: 3,
    name: "Mark Venue Location on Map",
    graphic: mapLocate,
  },
  {
    id: 4,
    name: "Add Images Of Venue",
    graphic: uploadImage,
  },
];

function HostSteps() {
  return (
    <Grid container spacing={2} className="host-steps-container">
      <Grid item xs={12} className="host-steps-container-heading">
        Be a Star Venue Host in 4 Easy Steps! <br />
      </Grid>

      <Grid
        container
        justifyContent="center"
        spacing={2}
        className="host-steps-section-container"
      >
        {clientSteps.map((item: any) => (
          <Grid
            container
            item
            xs={4}
            className="host-steps-item"
            data-aos="zoom-in"
            data-aos-once
          >
            <Grid item xs={6}>
              <img src={item.graphic} alt="" height="100%" width="100%" />
            </Grid>
            <Grid
              item
              direction="column"
              className="host-step-details"
              container
              xs={6}
            >
              <Avatar className="host-step-no">{item.id}</Avatar>
              <br />

              <div className="host-step-text">{item.name}</div>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default HostSteps;
