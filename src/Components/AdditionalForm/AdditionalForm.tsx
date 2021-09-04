import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import "./additionalForm.scss";
import { Divider} from "@material-ui/core";
import { EventTypeService } from "../../Services/EventTypeService";
import { of } from "await-of";
import swal from "sweetalert";
import { Field, Form, Formik } from "formik";
const eventTypeService = new EventTypeService();
export default function AdditionalForm(props) {
  const [additionalServices, setAdditionalServices]=useState<any>([]);
  const [servicesSelected, setServicesSelected]=useState<any[]>([]);
  const initialValues = {
    noOfAttendees: 0,
    alternateContactNumber:"",
    address1: "",
    address2: "",
    city:"",
    state:"",
    zip:0,
    country:"",

  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(()=> {
    (async ()=> {
      const [response, error] = await of(eventTypeService.getAllServices());
      if(error) {
        swal("Error","Something went wrong!","error");
        return;
      }
      if(response)setAdditionalServices(response);
    })();
  },[])
  const next = (values:any) => {
    const temp:any[] = servicesSelected.map((id:any) => {
      for(let service of additionalServices) {
        if(service.id === Number(id) ) return service;
      }
      return null;
    });
    console.log(temp);
    props.handleNext(values,temp);
  }
  const toggleCheked = (event) => {
    const value = event.target.value;
    if(servicesSelected.includes(value))setServicesSelected(prev => prev.filter(service => service !==value));
    else setServicesSelected(prev => [...prev, value]);
  }
  return (
    <React.Fragment>
      <div className="additional-form-labels">Additional Details</div>
      <Formik
        initialValues={initialValues}
        onSubmit={next}
      >
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                required
                id="NoOfAttendees"
                name="noOfAttendees"
                label="Number Of Attendees"
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="alternateContactNumber"
                name="alternateContactNumber"
                label="Alternate Contact Number"
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
               as= {TextField}
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
                              onChange={toggleCheked}
                              name={service.name}
                              value={service.id}
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
            <Grid lg={12}>
              <Button
                variant="contained"
                color="primary"
                className="af-button"
                type="submit"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  );
}
