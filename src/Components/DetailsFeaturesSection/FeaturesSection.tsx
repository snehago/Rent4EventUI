import { Box, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import MapContainer from "../MapSection/MapContainer";
import { Rating } from "@material-ui/lab";
import "./featuressection.scss";
import { Venue } from "../../Shared/Interfaces/Venue";

interface FSProps {
  venue: Venue;
}
export default function FeaturesSection({ venue }: FSProps) {
  const facilities = [
    "facility 1",
    "facility 2",
    "facility 3",
    "facility 4",
    "facility 5",
    "facility 6",
  ];

  const offers = [
    {
      offer: "Get Up To 50% Off",
      subtitle: "Axis bank credit card",
    },
    {
      offer: "Get Up To 10% Off",
      subtitle: "",
    },
    {
      offer: "Get Up To 50% Off",
      subtitle: "",
    },
  ];

  const [ratingValue, setRatingValue] = useState(2.5);
  return (
    <div style={{ backgroundColor: "#F4F4F4", marginTop: "3%" }}>
      <Grid container xs={12} style={{ padding: "2%" }}>
        <Grid container xs={12}>
          <Grid item container xs={6}>
            {/* Facilities */}
            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "white",
                padding: "1%",
                borderRadius: "0.4rem",
              }}
            >
              <h2 style={{ marginLeft: "5%" }} className="facilitiesLabel">
                Facilities
              </h2>
              <Grid item container spacing={2} xs={12}>
                {facilities.map((item) => (
                  <Grid className="facilityItem" spacing={2} item xs={3}>
                    {item}
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Offers */}

            <Grid
              item
              container
              xs={12}
              style={{
                marginTop: "1%",
                backgroundColor: "white",
                padding: "1%",
                borderRadius: "0.4rem",
              }}
            >
              <h2 style={{ marginLeft: "5%" }} className="facilitiesLabel">
                Offers &amp; Extras
              </h2>
              <Grid item container spacing={2} xs={12}>
                {offers.map((item) => (
                  <Grid className="offerItem" spacing={2} item xs={3}>
                    <div className="mainOffer">{item.offer}</div>
                    <div>{item.subtitle}</div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            <Grid
              item
              container
              xs={12}
              style={{
                marginLeft: "2%",
                backgroundColor: "white",
                padding: "1%",
                borderRadius: "0.4rem",
                height: "60%",
              }}
            >
              <h2
                className="contact-details-label"
              >
                Contact Details
              </h2>

              <Typography className="venue-address">
                {`${venue.address.streetAddress},${venue.address.city},${venue.address.state},${venue.address.country},${venue.address.pin}`}
              </Typography>

              <Box
                component="fieldset"
                className="ratingBox"
                borderColor="transparent"
              >
                <div className="ratingContainer">
                  <div id="ratingValue">{ratingValue}</div>
                  <Rating
                    name="read-only"
                    className="rating"
                    size="small"
                    value={ratingValue}
                    readOnly
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MapContainer />
        </Grid>
      </Grid>
    </div>
  );
}
