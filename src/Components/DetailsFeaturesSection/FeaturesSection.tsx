import { Chip, Grid} from "@material-ui/core";
import React, {useState} from "react";
import "./featuressection.scss";
import { Venue } from "../../Shared/Interfaces/Venue";
import MapComponent from "../MapSection/MapComponent";
import { v4 } from "uuid";

interface FSProps {
  venue: Venue;
}
export default function FeaturesSection({ venue }: FSProps) {
  const [facilities]= useState(venue.listOfFacilities);

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

  return (
    <div className="features-main-container">
      <Grid container xs={12} className="features-grid-main-container">
        <Grid container xs={12}>
          <Grid item container xs={12}>
            {/* Facilities */}
            <Grid
              item
              container
              xs={6}
              lg={6}
              className="features-facilities-grid-container"
              key={v4()}
            >
              <h2 className="features-facilities-label">Facilities</h2>
              <Grid item container spacing={0} xs={12}>
                {facilities.map((item) => (
                  <Grid spacing={0} item xs={3} lg={4} key={v4()}>
                    <Chip
                      className="features-facility-item"
                      label={item.name}
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Offers */}

            <Grid
              item
              container
              xs={5}
              className="features-offers-grid-container"
              key={v4()}
            >
              <h2 className="features-facilities-label">Offers &amp; Extras</h2>
              <Grid item container spacing={2} xs={12}>
                {offers.map((item) => (
                  <Grid
                    key={v4()}
                    className="offerItem"
                    spacing={2}
                    item
                    xs={3}
                  >
                    <div key={v4()} className="mainOffer">
                      {item.offer}
                    </div>
                    <div key={v4()}>{item.subtitle}</div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* SIDE BAR STARTS */}
          {/* <Grid item container xs={6}>
            <Grid
              item
              container
              xs={12}
              className="features-side-bar-grid-container"
            >
              <h2 className="contact-details-label">Contact Details</h2>

              <Grid item xs={12} className="venue-address-grid">
                <Typography className="venue-address">
                  {`${venue.address.streetAddress},${venue.address.city},${venue.address.state},${venue.address.country},${venue.address.pin}`}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box
                  component="fieldset"
                  className="feature-rating-box"
                  borderColor="transparent"
                >
                  <div className="feature-rating-container">
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
          </Grid> */}
        </Grid>

        <Grid
          item
          xs={12}
          className="map-grid"
          data-aos="fade-up"
          data-aos-once
        >
          {venue && <MapComponent venue={venue} />}
        </Grid>
      </Grid>
    </div>
  );
}
