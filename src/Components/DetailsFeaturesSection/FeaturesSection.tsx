import { Grid } from "@material-ui/core";
import React, {useState} from "react";
import "./featuressection.scss";
import { Venue } from "../../Shared/Interfaces/Venue";
import MapComponent from "../MapSection/MapComponent";
import { v4 } from "uuid";
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import DeckIcon from '@material-ui/icons/Deck';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import CommuteIcon from '@material-ui/icons/Commute';
import WcIcon from '@material-ui/icons/Wc';
import HotTubIcon from '@material-ui/icons/HotTub';
interface FSProps {
  venue: Venue;
}
const icons = {
  "Parking facilities": <LocalParkingIcon/>,
  "Lawn": <DeckIcon/>,
  "Electricity & Water supply": <OfflineBoltIcon/>,
  "Public transport": <CommuteIcon/>,
  "Toilet Provision": <WcIcon/>,
  "jacuzzi": <HotTubIcon/>
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
      subtitle: "in festive season sale",
    },
    {
      offer: "Get Up To 50% Off",
      subtitle: "on selected venues",
    },
  ];

  return (
    <div className="features-main-container">
      <Grid container xs={12} lg={12} className="features-grid-main-container">
        <Grid item container xs={12} lg={12}>
          {/* Facilities */}
          <Grid
            item
            container
            xs={12}
            sm={12}
            lg={6}
            className="features-facilities-grid-container"
            key={v4()}
          >
            <h2 className="features-facilities-label">Facilities</h2>
            <Grid
              item
              container
              direction="column"
              className="fs-facility-container"
              xs={12}
              sm={12}
              lg={12}
            >
              {facilities.map((item) => (
                <Grid spacing={0} item xs={3} sm={3} lg={4} key={v4()}>
                  <span className="fs-facility-label">
                    {icons[`${item.name}`]} {item.name}
                  </span>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Offers */}

          <Grid
            item
            container
            className="features-offers-grid-container"
            key={v4()}
            xs={12}
            sm={12}
            lg={6}
          >
            <h2 className="features-facilities-label">Offers &amp; Extras</h2>
            <div className="fs-offer-container">
              {offers.map((item) => (
                <Grid key={v4()} spacing={0} item xs={12} sm={12} lg={12}>
                  <span>
                    <li>{item.offer + " " + item.subtitle}</li>
                  </span>
                </Grid>
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={12}
        className="map-grid"
        data-aos="fade-up"
        data-aos-once
      >
        {venue && <MapComponent venue={venue} />}
      </Grid>
    </div>
  );
}
