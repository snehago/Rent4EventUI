import React, {useState} from 'react';
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import "./description.scss";
import { Venue } from "../../Shared/Interfaces/Venue";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

interface DSProps {
  venue: Venue;
}
export default function DescriptionSection({venue}:DSProps) {
  const [value, onChange] = useState<Date>(new Date());
  return (
    <div>
      <div className="descriptionContainer">
        <Grid container spacing={3}>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={7}>
              <Typography className="venueTitle" component="h2">
                {venue?.title}
              </Typography>
              <Typography className="descriptionText">
                {venue?.description}
              </Typography>
            </Grid>

            <Grid
              item
              xs={5}
              container
              style={{
                backgroundColor: "#EAEAEA",
                borderRadius: "0.4rem",
                padding: "2%",
              }}
            >
              <Grid
                item
                container
                xs={12}
                style={{ height: "20%", borderBottom: "1px solid #cfcbca" }}
              >
                <Grid item xs={6} className="priceLabel">
                  Price
                </Grid>
                <Grid item xs={6} className="description-section-price">
                  ${venue?.price}
                </Grid>
              </Grid>
              <Grid item xs={12} className="calendar-container">
                <TextField
                  id="date"
                  label="to"
                  type="date"
                  onChange={(e) => onChange(new Date(e.target.value))}
                  defaultValue={value}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="date"
                  label="from"
                  type="date"
                  onChange={(e) => onChange(new Date(e.target.value))}
                  defaultValue={value}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {/* <Calendar onChange={onChange} value={value} returnValue="range" selectRange/> */}
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{
                    backgroundColor: "#D3600C",
                    color: "#FFFFFF",
                    width: "50%",
                    height: "50%",
                  }}
                  variant="contained"
                >
                  CHECKOUT
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
