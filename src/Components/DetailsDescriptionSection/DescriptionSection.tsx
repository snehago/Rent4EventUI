import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./description.scss";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

export default function DescriptionSection() {
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
                Title
              </Typography>
              <Typography className="descriptionText">
                Vestibulum maximus laoreet ipsum ac semper. Suspendisse potenti.
                Vestibulum sit amet pulvinar augue, eget ultricies neque.
                Maecenas a malesuada est. Nulla molestie lorem libero, quis
                tempus felis convallis sed. Fusce ultrices nunc vitae posuere
                dignissim. Cras congue ante vel mi facilisis vulputate. Ut nec
                enim mi. Sed bibendum, sapien tristique pellentesque
                ullamcorper, metus diam porta elit, a tempor augue nulla vitae
                magna.
                <p /> In ipsum magna, viverra ac nunc vehicula, cursus
                condimentum orci. Aenean porta sagittis elementum. Vestibulum
                vulputate eget sapien sed scelerisque. Quisque maximus fermentum
                condimentum. Phasellus suscipit eros bibendum magna dignissim
                lobortis. Aliquam ullamcorper ante non semper mollis. Mauris
                dignissim dolor quis arcu ultrices, ac tincidunt mi tincidunt.
                Donec non quam turpis.
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
                <Grid item xs={6} className="price">
                  $30.00
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                // style={{  height: "20%",marginTop:'-18%' }}
              >
                <DateRangePickerComponent
                  placeholder="Select Dates"
                  // startDate={startDateValue}
                  // endDate={endDateValue}
                  min={minDate}
                  max={maxDate}
                  minDays={3}
                  maxDays={5}
                  format="dd-MMM-yy"
                  onChange={handleDateChange}
                ></DateRangePickerComponent>
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
