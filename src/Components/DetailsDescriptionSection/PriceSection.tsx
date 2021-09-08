import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { of } from "await-of";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { addDate } from "../../Redux/reducers/CartReducer";
import { RootState } from "../../Redux/store";
import { BookingService } from "../../Services/BookingService";
import { User } from "../../Shared/Interfaces/User";
import { Venue } from "../../Shared/Interfaces/Venue";
import "./description.scss";
interface DSProps {
  venue: Venue;
}
const bookingService = new BookingService();

export default function PriceSection({ venue }: DSProps) {
  const user:User = useSelector((state:RootState)=> state.auth.user);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [touched, setTouched] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const startDateValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDay()
  );
  const handleDateChange = (event: any) => {
    if (event?.target?.value && event?.target?.value[0] !== startDate) {
      setStartDate(event.target.value[0]);
    }
    if (event?.target?.value && event?.target?.value[1] !== endDate) {
      setEndDate(event.target.value[1]);
      setTouched(true);
    }
  };
  const checkout = async () => {
    if (!touched) {
      swal({
        title: "Please select date before checkout",
        icon: "warning",
      });
      return;
    }
    const [response, error] = await of(
      bookingService.checkAvaibility({
        venueId: venue.id,
        dateFrom: startDate,
        dateTo: endDate,
      })
    );
    if (error) {
      swal(
        "Not available",
        "Venue is not available for booking on desired date",
        "info"
      );
      return;
    }
    if (!response) {
      swal(
        "Not available",
        "Venue is not available for booking on desired date",
        "info"
      );
      return;
    }
    dispatch(addDate({ startDate, endDate }));
    history.push(`/checkout/${venue?.id}`);
  };

  const PriceLabel = React.forwardRef(function PriceLabel(props, ref: any) {
    return (
      <>
        <Grid {...props} ref={ref} item xs={6} lg={6} className="priceLabel">
          Price
        </Grid>
        <Grid item xs={6} lg={6} className="description-section-price">
          ${venue?.price}/day
        </Grid>
      </>
    );
  });

  return (
    <>
      <Grid item xs={12} container className="description-price-container">
        <Grid
          item
          container
          xs={12}
          lg={12}
          style={{ height: "20%", borderBottom: "1px solid #cfcbca" }}
        >
          <Tooltip title="10% of total price (max)">
            <PriceLabel />
          </Tooltip>
        </Grid>
        <Grid xs={12} lg={12}>
          <Typography variant="subtitle2" className="light-gray">
            {" "}
            &#9432; Booking price will be 10% of total price(max)
          </Typography>
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
            color="primary"
            onClick={checkout}
            disabled={user && user?.role !== "client" ? true:false}
          >
            CHECKOUT
          </Button>
        </Grid>
        { user && user?.role !== "client" && (
          <span>&#9432; You can not book the venue.</span>
        )}
      </Grid>
    </>
  );
}
