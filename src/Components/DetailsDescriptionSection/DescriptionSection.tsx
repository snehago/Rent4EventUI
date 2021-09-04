import React, { useState } from "react";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import "./description.scss";
import { Venue } from "../../Shared/Interfaces/Venue";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { addDate } from "../../Redux/reducers/CartReducer";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { BookingService } from "../../Services/BookingService";
import { of } from "await-of";

interface DSProps {
  venue: Venue;
}
const bookingService = new BookingService();
export default function DescriptionSection({ venue }: DSProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
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

  const checkout =async () => {
    if (!touched) {
      swal({
        title: "Please select date before checkout",
        icon:"warning"
      });
      return;
    }
    const [response,error]= await of(bookingService.checkAvaibility({
      venueId: venue.id,
      dateFrom: startDate,
      dateTo: endDate
    }))
    if(error){
      swal(
        "Not available",
        "Venue is not available for booking on desired date",
        "info"
      );
      return;
    }
    if(!response) {
      swal("Not available", "Venue is not available for booking on desired date", "info");
      return;
    }
    dispatch(addDate({ startDate, endDate }));
    history.push(`/checkout/${venue?.id}`);
  };

  const startDateValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDay()
  );


  return (
    <div>
      <div className="descriptionContainer">
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
            <Gallery images={IMAGES} />
          </Grid> */}
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
