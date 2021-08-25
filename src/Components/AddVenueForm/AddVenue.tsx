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
  return (
    <div>
      <Grid container className="addVenueFormContainer" spacing={1}>
        <Grid className="addVenueLabel" item xs={12}>
          Add a Venue
        </Grid>
        <Grid item xs={4}>
          <TextField className="addVenueTextField" variant="outlined" label="Enter Venue Title" />
        </Grid>

        <Grid item xs={4}>
          <TextField
          className="addVenueTextField"
            variant="outlined"
            label="Enter Venue Capacity"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
          className="addVenueTextField"
            variant="outlined"
            label="Enter Venue Price"
            type="number"
          />
        </Grid>

        <Grid item xs={12} lg={12} md={12} sm={12}>
          <TextField
          className="addVenueTextField"
            style={{ width: "100%", height: "100%" }}
            variant="outlined"
            label="Enter Venue Description"
          />
        </Grid>

        <Grid container item xs={12} lg={12} md={12} sm={12} spacing={2}>
          <Grid item xs={12}>
            <Typography className="addVenueSubLabels">Address</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField className="addVenueTextField" variant="outlined" label="Enter Country Name" />
          </Grid>
          <Grid item xs={4}>
            <TextField className="addVenueTextField" variant="outlined" label="Enter State Name" />
          </Grid>
          <Grid item xs={4}>
            <TextField className="addVenueTextField" variant="outlined" label="Enter City Name" />
          </Grid>
          <Grid item xs={4}>
            <TextField className="addVenueTextField" variant="outlined" label="Enter Pincode" type="number" />
          </Grid>
          <Grid item xs={4}>
            <TextField className="addVenueTextField" variant="outlined" label="Enter Street Address" />
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography className="addVenueSubLabels">Facilities</Typography>
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              name="Wifi"
              control={<Checkbox color="primary" />}
              label="Wifi"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              name="Conference"
              control={<Checkbox color="primary" />}
              label="Conference and meeting facilities"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              name="Banquet"
              control={<Checkbox color="primary" />}
              label="Banquet facilities"
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography className="addVenueSubLabels">Event Type</Typography>
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              name="Marriage"
              control={<Checkbox color="primary" />}
              label="Marriage"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              name="Event"
              control={<Checkbox color="primary" />}
              label="Event"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              name="Production"
              control={<Checkbox color="primary" />}
              label="Production"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} >
            <Button
              className="addVenueButton"
              type="submit"
              fullWidth
            >ADD</Button>
        </Grid>
      </Grid>
    </div>
  );
}
