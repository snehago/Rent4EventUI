import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import "./description.scss";
import { Venue } from "../../Shared/Interfaces/Venue";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

interface DSProps {
  venue: Venue;
}
export default function DescriptionSection({ venue }: DSProps) {
  const [value, onChange] = useState<Date>(new Date());

  const handleDateChange = (event: any) => {
    console.log(event.target.value);
  };
  const startDateValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    14
  );
  const endDateValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    15
  );
  const minDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    8
  );
  const maxDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    20
  );

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

            {/* PRICE SECTION STARTS */}
            <Grid item xs={5} container className="description-price-container">
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

              <Grid
                item
                xs={12}
                // style={{  height: "20%",marginTop:'-18%' }}
                style={{ marginTop: "5%" }}
              >
                <DateRangePickerComponent
                  placeholder="Select Dates"
                  // startDate={startDateValue}
                  // endDate={endDateValue}
                  // min={minDate}
                  // max={maxDate}
                  // minDays={3}
                  // maxDays={5}
                  format="dd-MMM-yy"
                  onChange={handleDateChange}
                ></DateRangePickerComponent>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5%",
                }}
              >
                <Button
                  className="description-checkout-button"
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
