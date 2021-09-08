import React from "react";
import { Divider, Grid, Typography } from "@material-ui/core";
import "./description.scss";
import { Venue } from "../../Shared/Interfaces/Venue";

interface DSProps {
  venue: Venue;
}
export default function DescriptionSection({ venue }: DSProps) {
  return (
    <div>
      <div className="descriptionContainer">
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
            <Gallery images={IMAGES} />
          </Grid> */}
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={12}>
              <div className="description-container">
                <Typography className="venueTitle" component="h2">
                  {venue?.title}
                </Typography>
                <Typography className="descriptionText">
                  {venue?.description}
                </Typography>
              </div>
              <br />
              <Divider variant="middle" style={{ marginTop: "2%" }} />

              <div className="description-address-container">
                <div className="description-address-label">Address </div>
                <div className="description-venue-address">
                  {`${venue.address.streetAddress}, ${venue.address.city}, ${venue.address.state}, ${venue.address.country}`}
                </div>
                <span className="ds-capacity-label">
                  <b>Capacity:</b> {venue.capacity}
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
