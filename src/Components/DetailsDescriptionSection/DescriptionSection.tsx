import React, { useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import "./description.scss";
import { Venue } from "../../Shared/Interfaces/Venue";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NotificationType } from "../Notification";
import Notification from "../Notification";
import { addDate } from "../../Redux/reducers/CartReducer";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
interface DSProps {
  venue: Venue;
}
export default function DescriptionSection({ venue }: DSProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDateChange = (event: any) => {
    console.log(event.target.value);
    if (event.target.value[0] !== startDate) {
      setStartDate(event.target.value[0]);
    }
    if (event.target.value[1] !== endDate) {
      setEndDate(event.target.value[1]);
    }
    setTouched(true);
    console.log("SD:", startDate);
    console.log("ED:", endDate);
  };

  const checkout = () => {
    if (!touched) 
    {
      setOpen(true);
      return;
    }
    dispatch(addDate({ startDate, endDate }));
    history.push(`/checkout/${venue?.id}`);
  };

  const startDateValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth()+1,
    new Date().getDay()
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
      {open && (
        <Notification
          open={open}
          type={NotificationType.error}
          content="Please select data to book venue"
        ></Notification>
      )}
      <div className="descriptionContainer">
        <Grid container spacing={3}>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={8}>
              <div className="description-container">
                <Typography className="venueTitle" component="h2">
                  {venue?.title}
                </Typography>
                <Typography className="descriptionText">
                  {venue?.description}
                </Typography>
              </div>
              <Divider variant="middle" style={{marginTop:"2%"}} />

              <div className="description-address-container" >
                <div className="description-address-label">
                  Address
                </div>
                <div className="description-venue-address">
                {`${venue.address.streetAddress},${venue.address.city},${venue.address.state},${venue.address.country},${venue.address.pin}`}
                </div>
              </div>

            </Grid>

            

            

            {/* PRICE SECTION STARTS */}
            <Grid item xs={4} container className="description-price-container">
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

              <Grid item xs={12} style={{ marginTop: "5%" }}>
                <DateRangePickerComponent
                  placeholder="Select Dates"
                  startDate={startDateValue}
                  // endDate={endDateValue}
                  // min={minDate}
                  // max={maxDate}
                  // minDays={3}
                  // maxDays={5}
                  format="dd-MMM-yy"
                  onChange={handleDateChange}
                ></DateRangePickerComponent>
              </Grid>

              <Grid item xs={12} className="description-checkoutbutton-grid">
                <Button
                  className="description-checkout-button"
                  variant="contained"
                  onClick={checkout}
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
