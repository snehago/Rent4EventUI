import React, { useState } from "react";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import "./description.scss";
import { Venue } from "../../Shared/Interfaces/Venue";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NotificationType } from "../Notification";
import Notification from "../Notification";
import { addDate } from "../../Redux/reducers/CartReducer";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Gallery from "react-grid-gallery";

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
    if (!touched) {
      setOpen(true);
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

  const IMAGES = [
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" },
      ],
      caption: "Boats (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "../../../assets/images/banner1.jpeg",
      thumbnail: "../../../assets/images/banner1.jpeg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" },
      ],
      caption: "Boats (Jeshu John - designerspics.com)",
    },

    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" },
      ],
      caption: "Boats (Jeshu John - designerspics.com)",
    },
  ];

  return (
    <div>
      {open && (
        <Notification
          open={open}
          type={NotificationType.error}
          content="Please select date to book venue"
        ></Notification>
      )}
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
              <br/>
              <Divider variant="middle" style={{ marginTop: "2%" }} />

              <div className="description-address-container">
                <div className="description-address-label">Address</div>
                <div className="description-venue-address">
                  {`${venue.address.streetAddress}, ${venue.address.city}, ${venue.address.state}, ${venue.address.country}`}
                </div>
              </div>
            </Grid>

            {/* PRICE SECTION STARTS */}
            <Grid
              item
              xs={4}
              container
              className="description-price-container"
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
