import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import styles from "../LayoutStyles/Registration.styles";

const RegistrationPageHost = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  };

  const onSubmit = (values: any, props: any) => {
    console.log(values);
    console.log(props);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "It's too short").required("Required"),
    lastName: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string()
      .email("Enter valid email")
      .required("Required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter a valid email"
      ),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    dob: Yup.string().required("Required"),
    upiId: Yup.string()
      .required("Required")
      .matches(/^[\w.-]+@[\w.-]+$/, "Please Enter a Valid Upi Id"),
  });
  return (
    <Grid>
      <Paper elevation={20} style={styles.paperstyle}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar style={styles.avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={styles.headerStyle}>Register as Host</h2>
          <Typography variant="caption">
            Please fill this form to create an account !
          </Typography>
        </Grid>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                name="firstName"
                style={styles.textFieldStyle}
                variant="outlined"
                fullWidth
                label="First Name"
                placeholder="Enter your First name"
                required
                helperText={
                  <ErrorMessage name="firstName">
                    {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="lastName"
                style={styles.textFieldStyle}
                variant="outlined"
                fullWidth
                label="Last Name"
                placeholder="Enter your Last name"
                required
                helperText={
                  <ErrorMessage name="lastName">
                    {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="email"
                style={styles.textFieldStyle}
                variant="outlined"
                fullWidth
                label="Email"
                placeholder="Enter your Email Id"
                required
                helperText={
                  <ErrorMessage name="email">
                    {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="password"
                style={styles.textFieldStyle}
                variant="outlined"
                fullWidth
                type="password"
                label="Password"
                placeholder="Enter a Password"
                required
                helperText={
                  <ErrorMessage name="password">
                    {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="confirmPassword"
                style={styles.textFieldStyle}
                variant="outlined"
                fullWidth
                type="password"
                label="Confirm Password"
                placeholder="Confirm your Password"
                required
                helperText={
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="dob"
                variant="outlined"
                fullWidth
                style={styles.textFieldStyle}
                id="date"
                label="Date Of Birth"
                placeholder="Select your Date Of Birth"
                type="date"
                defaultValue="2021-08-10"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                helperText={
                  <ErrorMessage name="lastName">
                    {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                  </ErrorMessage>
                }
              />

              {/* <FormControl
                  component="fieldset"
                  required
                  style={textFieldStyle}
                  name="role"
                >
                  <FormLabel component="legend">Role</FormLabel>
                  <Field
                    as={RadioGroup}
                    aria-label="role"
                    name="role"
                    style={{ display: "initial" }}
                    // value={value}
                    // onChange={handleChange}
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="User"
                    />
                    <FormControlLabel
                      value="host"
                      control={<Radio />}
                      label="Host"
                    />
                  </Field>
                  <FormHelperText>
                    <ErrorMessage name="role">
                      {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                    </ErrorMessage>
                  </FormHelperText>
                </FormControl> */}

              <Field
                as={TextField}
                name="upiId"
                required
                style={styles.textFieldStyle}
                variant="outlined"
                fullWidth
                label="Upi Id"
                placeholder="Give your Upi Id"
                helperText={
                  <ErrorMessage name="upiId">
                    {(msg) => <div style={styles.errorMsg}>{msg}</div>}
                  </ErrorMessage>
                }
              />

              <Button
                type="submit"
                fullWidth
                color="primary"
                style={styles.btnStyle}
                disabled={props.isSubmitting}
                variant="contained"
              >
                {props.isSubmitting ? "LOADING" : "REGISTER"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          {" "}
          Already have an account ?
          <NavLink style={styles.navLink} exact to="/user/login/">
            Login
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default RegistrationPageHost;
