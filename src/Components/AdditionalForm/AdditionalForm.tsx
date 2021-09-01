import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Field } from "formik";
import { CheckBox } from "@material-ui/icons";
import "./additionalForm.scss";
import { Divider, Paper } from "@material-ui/core";

export default function AdditionalForm(props) {
  const additionalServices = [
    {
      id: 1,
      name: "Catering",
      price: 5000,
    },
    {
      id: 2,
      name: "Decoration",
      price: 5000,
    },
    {
      id: 3,
      name: "DJ Nights",
      price: 5000,
    },
    {
      id: 4,
      name: "Dancers",
      price: 5000,
    },
    {
      id: 5,
      name: "Make-up Artist",
      price: 5000,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <React.Fragment>
      <div className="additional-form-labels">Additional Details</div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="NoOfAttendees"
            name="NoOfAttendees"
            label="Number Of Attendees"
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="alternateContactNumber"
            name="alternateContactNumber"
            label="Alternate Contact Number"
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>

        {/* <Paper elevation={10} className="additional-paper-style"> */}
          <Grid container item xs={12}>
            <div className="additional-form-labels">
              Additional Services Provided By Us
            </div>

            <Grid item xs={12} style={{ overflow: "hidden" }}>
              {additionalServices.map((service) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <FormControlLabel
                        className="additional-service-item"
                        name={service.name}
                        control={
                          <Checkbox
                            color="primary"
                            name={service.name}
                            value="yes"
                          />
                        }
                        label={service.name}
                      />

                      <div className="additional-service-price" style={{}}>
                        ${service.price}
                      </div>
                    </div>

                    <Divider
                      variant="middle"
                      style={{ marginTop: "2%", marginBottom: "2%" }}
                    />
                  </>
                );
              })}
            </Grid>
          </Grid>
        {/* </Paper> */}
      </Grid>
    </React.Fragment>
  );
}
