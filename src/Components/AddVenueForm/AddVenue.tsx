import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import "./addVenue.scss";

export default function AddVenue() {
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
    Wifi: false,
    Conference: false,
    Banquet: false,
    Marriage: false,
    Event: false,
    Production: false,
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
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    console.log(props);
  };
  return (
    <div>
      <Paper elevation={10} className="addVenuePaper">
        <Grid container className="addVenueFormContainer" spacing={1}>
          <Grid className="addVenueLabel" item xs={12}>
            Add a Venue
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props: any) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      className="addVenueTextField"
                      variant="outlined"
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
                      className="addVenueTextField"
                      variant="outlined"
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
                      className="addVenueTextField"
                      variant="outlined"
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
                      className="addVenueTextField"
                      variant="outlined"
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
                      className="addVenueTextField"
                      variant="outlined"
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
                      className="addVenueTextField"
                      variant="outlined"
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
                      className="addVenueTextField"
                      variant="outlined"
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
                      className="addVenueTextField"
                      variant="outlined"
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

                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <Typography className="addVenueSubLabels">
                      Facilities
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Field
                      as={FormControlLabel}
                      name="Wifi"
                      control={<Checkbox color="primary" />}
                      label="Wifi"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      as={FormControlLabel}
                      name="Conference"
                      control={<Checkbox color="primary" />}
                      label="Conference and meeting facilities"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      as={FormControlLabel}
                      name="Banquet"
                      control={<Checkbox color="primary" />}
                      label="Banquet facilities"
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <Typography className="addVenueSubLabels">
                      Event Type
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Field
                      as={FormControlLabel}
                      name="Marriage"
                      control={<Checkbox color="primary" />}
                      label="Marriage"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      as={FormControlLabel}
                      name="Event"
                      control={<Checkbox color="primary" />}
                      label="Event"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      as={FormControlLabel}
                      name="Production"
                      control={<Checkbox color="primary" />}
                      label="Production"
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    className="addVenueButton"
                    type="submit"
                    fullWidth
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "ADDING" : "ADD"}
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
