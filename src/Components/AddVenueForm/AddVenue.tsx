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
import ImageUploading, { ImageListType } from "react-images-uploading";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useHistory } from "react-router";
import Notification, { NotificationType } from "../Notification";

const venueService = new VenueService();
export default function AddVenue() {
  const user = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
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
    let address: Address = {
      streetAddress: values.street,
      state: values.state,
      city: values.city,
      country: values.country,
      pin: values.pincode,
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
    };
    const [response, error] = await of(venueService.addVenue(venue));
    if (error) {
      alert(error.message);
    }
    if (response) {
      console.log(response);
      props.resetForm();
      props.setSubmitting(false);
      setOpen(true);
      setTimeout(() => {
        history.push("/home");
      }, 3000);
    }
  };

  const facilityService = new FacilityService();
  const eventTypeService = new EventTypeService();
  const [open, setOpen] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  useEffect(() => {
    (async () => {
      console.log("use effect of add venue page");
      const [response, error] = await of(facilityService.getAllFacility());
      if (error) {
        alert(error.message);
      }
      if (response) {
        setFacilities(response);
      }
    })();

    (async () => {
      console.log("use effect2 of add venue page");
      const [response, error] = await of(eventTypeService.getAllEventType());
      if (error) {
        alert(error.message);
      }
      if (response) {
        setEventTypes(response);
      }
    })();
  }, []);
  return (
    <div>
      {open && (
        <Notification
          type={NotificationType.success}
          content="Venue Added Successfully successfully"
        ></Notification>
      )}
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

                <Grid item xs={12} className="addvenue-upload-image-section">
                  <div className="addVenueSubLabels">
                    Add Images Of The Venue
                  </div>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <Button
                          variant="outlined"
                          className="upload-btn-style"
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Click or Drop here &nbsp;
                          <PublishOutlinedIcon />
                        </Button>
                        &nbsp;
                        <Button
                          variant="outlined"
                          className="upload-btn-style"
                          onClick={onImageRemoveAll}
                        >
                          Remove all images &nbsp;
                          <RemoveCircleOutlineOutlinedIcon />
                        </Button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img
                              src={image.dataURL}
                              alt=""
                              width="400"
                              height="200"
                            />
                            <div className="image-item__btn-wrapper">
                              <Button
                                variant="outlined"
                                className="upload-btn-style"
                                onClick={() => onImageUpdate(index)}
                              >
                                Update &nbsp;
                                <EditOutlinedIcon />
                              </Button>
                              <Button
                                variant="outlined"
                                className="upload-btn-style"
                                onClick={() => onImageRemove(index)}
                              >
                                Remove &nbsp;
                                <DeleteOutlinedIcon />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
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
