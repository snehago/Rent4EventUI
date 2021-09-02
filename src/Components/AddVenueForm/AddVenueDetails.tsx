import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { VenueService } from "../../Services/VenueService";
import "./addVenue.scss";
import { Address } from "../../Shared/Interfaces/Address";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { of } from "await-of";
import { FacilityService } from "../../Services/FacilityService";
import { Facility } from "../../Shared/Interfaces/Facitlity";
import { EventTypeService } from "../../Services/EventTypeService";
import { EventType } from "../../Shared/Interfaces/EventType";
import Notification, { NotificationType } from "../Notification";
import LocationPicker from "react-location-picker";
import CircularLoader from "../CircularLoader/CircularLoader";
import swal from "sweetalert";

const venueService = new VenueService();
const facilityService = new FacilityService();
const eventTypeService = new EventTypeService();
const steps = ["Additional Services", "Order Summary"];

export default function AddVenueDetails({ handleNext }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const initialValues = {
    title: "",
    capacity: "",
    price: "",
    description: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    street: "",
    latitude: coordinates.lat,
    longitude: coordinates.lng,
  };
  const defaultPosition = {
    lat: 27.9878,
    lng: 86.925,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    capacity: Yup.number().required("Required"),
    price: Yup.number().required("Required"),
    description: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    pincode: Yup.number().required("Required"),
  });

  const onSubmit = async (values: any, props: any) => {
    setLoading(true);
    console.log(values);
    let address: Address = {
      streetAddress: values.street,
      state: values.state,
      city: values.city,
      country: values.country,
      pin: values.pincode,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
    let venue: any = {
      host: {
        id: user.id,
      },
      price: values.price,
      address,
      capacity: values.capacity,
      title: values.title,
      description: values.description,
      listOfFacilities: facilities,
      listOfEventTypes: eventTypes,
    };
    const [response, error] = await of(venueService.addVenue(venue));
    if (error) {
      swal("Too long description provided","error");
      setLoading(false);
    }
    if (response) {
      setTimeout(() => {
        setLoading(false);
        console.log(response);
        props.resetForm();
        props.setSubmitting(false);
        handleNext(response);
      }, 1000);
    }
  };

  useEffect(() => {
    (async () => {
      const [response, error] = await of(facilityService.getAllFacility());
      if (error) {
        alert(error.message);
      }
      if (response) {
        setFacilities(response);
      }
    })();

    (async () => {
      const [response, error] = await of(eventTypeService.getAllEventType());
      if (error) {
        alert(error.message);
      }
      if (response) {
        setEventTypes(response);
      }
    })();
  }, []);

  const handleLocationChange = ({ position }) => {
    setCoordinates(position);
    console.log(coordinates);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {loading && <CircularLoader />}
      {open && (
        <Notification
          type={NotificationType.success}
          content="Venue Added Successfully successfully"
        ></Notification>
      )}

      <Paper elevation={5} className="addVenuePaper">
        <Grid container className="addVenueFormContainer" spacing={1}>
          <Grid className="addVenueLabel" item xs={12}>
            Add Venue Details
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props: any) => (
              <Form>
                <Grid
                  container
                  spacing={2}
                  className="add-venue-subsection-container"
                >
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="title"
                      required
                      label="Enter Venue Title"
                      helperText={
                        <ErrorMessage name="title">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="capacity"
                      label="Enter Venue Capacity"
                      type="number"
                      helperText={
                        <ErrorMessage name="capacity">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="price"
                      label="Enter Venue Price"
                      type="number"
                      helperText={
                        <ErrorMessage name="price">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} lg={12} md={12} sm={12}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      style={{ width: "100%", height: "100%" }}
                      variant="outlined"
                      name="description"
                      multiline
                      rows={4}
                      label="Enter Venue Description"
                      helperText={
                        <ErrorMessage name="description">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                </Grid>

                <Divider
                  variant="middle"
                  style={{ marginTop: "2%", marginBottom: "2%" }}
                />

                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  md={12}
                  sm={12}
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Typography className="addVenueSubLabels">
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="country"
                      label="Enter Country Name"
                      helperText={
                        <ErrorMessage name="country">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="state"
                      label="Enter State Name"
                      helperText={
                        <ErrorMessage name="state">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="city"
                      label="Enter City Name"
                      helperText={
                        <ErrorMessage name="city">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="pincode"
                      label="Enter Pincode"
                      type="number"
                      helperText={
                        <ErrorMessage name="pincode">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      className="addVenueTextField"
                      // variant="outlined"
                      name="street"
                      label="Enter Street Address"
                      helperText={
                        <ErrorMessage name="street">
                          {(msg) => <div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                </Grid>

                <Divider
                  variant="middle"
                  style={{ marginTop: "2%", marginBottom: "2%" }}
                />

                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <Typography className="addVenueSubLabels">
                      Facilities
                    </Typography>
                  </Grid>

                  {facilities.map((item) => (
                    <Grid item xs={3}>
                      <Field
                        as={FormControlLabel}
                        name={item.name}
                        control={<Checkbox size="small" color="primary" />}
                        label={item.name}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Divider
                  variant="middle"
                  style={{ marginTop: "2%", marginBottom: "2%" }}
                />

                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <Typography className="addVenueSubLabels">
                      Event Type
                    </Typography>
                  </Grid>

                  {eventTypes.map((item) => (
                    <Grid item xs={3}>
                      <Field
                        as={FormControlLabel}
                        name={item.name}
                        control={<Checkbox size="small" color="primary" />}
                        label={item.name}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Divider
                  variant="middle"
                  style={{ marginTop: "2%", marginBottom: "2%" }}
                />

                <Grid item xs={12}>
                  <div className="addVenueSubLabels">
                    Mark Venue Location On Map
                  </div>

                  <LocationPicker
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "30vw" }} />}
                    defaultPosition={defaultPosition}
                    onChange={handleLocationChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    className="addVenueButton"
                    type="submit"
                    fullWidth
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "SUBMITTING" : "NEXT"}
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Paper>
    </div>
  );
}
