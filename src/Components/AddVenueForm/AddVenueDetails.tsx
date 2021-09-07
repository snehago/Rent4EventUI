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
import LocationPicker from "react-location-picker";
import swal from "sweetalert";
import addFiles from "../../assets/illustrations/addFiles.svg";
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';

const venueService = new VenueService();
const facilityService = new FacilityService();
const eventTypeService = new EventTypeService();

export default function AddVenueDetails({ handleNext, venue }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<number[]>([]);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const initialValues = {
    title: venue?.title,
    capacity: venue?.capacity,
    price: venue?.price,
    description: venue?.description,
    country: venue?.address?.country,
    state: venue?.address?.state,
    city: venue?.address?.city,
    pincode: venue?.address?.pin,
    street: venue?.address?.streetAddress,
    latitude: venue?.address?.latitude,
    longitude: venue?.address?.longitude,
  };

  const defaultPosition = {
    lat: venue?.address?.latitude || 27.9878,
    lng: venue?.address?.longitude || 80.9878,
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (values: any, props: any) => {
    const tempFacilities = selectedFacilities.map((id) => ({ id }));
    const tempEventTypes = selectedEventTypes.map((id) => ({ id }));
    let address: Address = {
      streetAddress: values.street,
      state: values.state,
      city: values.city,
      country: values.country,
      pin: values.pincode,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
    let venueToAdd: any = {
      host: {
        id: user.id,
      },
      price: values.price,
      address,
      capacity: values.capacity,
      title: values.title,
      description: values.description,
      listOfFacilities: tempFacilities,
      listOfEventTypes: tempEventTypes,
    };
    console.log(venueToAdd);
    if (venue) {
      venueToAdd.id = venue.id;
      const [response, error] = await of(venueService.addVenue(venueToAdd));
      if (error) {
        swal("Error", "Too long description provided", "error");
      }
      if (response) {
        setTimeout(() => {
          console.log(response);
          props.resetForm();
          props.setSubmitting(false);
          handleNext(response);
        }, 1000);
      }
    } else {
      const [response, error] = await of(venueService.addVenue(venueToAdd));
      if (error) {
        swal("Error", "Too long description provided", "error");
      }
      if (response) {
        setTimeout(() => {
          console.log(response);
          props.resetForm();
          props.setSubmitting(false);
          handleNext(response);
        }, 1000);
      }
    }
  };

  const handleLocationChange = ({ position }) => {
    setCoordinates(position);
    console.log(coordinates);
  };

  const setFacilityChecked = (e) => {
    const value = e.target.value;
    if (selectedFacilities.includes(value)) {
      setSelectedFacilities(selectedFacilities.filter((v) => v !== value));
    } else setSelectedFacilities((prev) => [...prev, value]);
  };

  const setEventTypeChecked = (e) => {
    const value = e.target.value;
    if (selectedEventTypes.includes(value)) {
      setSelectedEventTypes(selectedEventTypes.filter((v) => v !== value));
    } else setSelectedEventTypes((prev) => [...prev, value]);
  };
  return (
    <div>
      <Paper elevation={5} className="addVenuePaper">
        <Grid container className="addVenueFormContainer" spacing={1}>
          <Grid className="addVenueLabel" item xs={12}>
            Add Venue Details <br />
            <img src={addFiles} alt="" height="30%" width="30%" />
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

                <Grid container item xs={12}>
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
                        control={
                          <Checkbox
                            onChange={setFacilityChecked}
                            value={item.id}
                            size="small"
                            color="primary"
                          />
                        }
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
                        control={
                          <Checkbox
                            onChange={setEventTypeChecked}
                            value={item.id}
                            size="small"
                            color="primary"
                          />
                        }
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
                    <RoomRoundedIcon /> Mark Venue Location On Map 
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
