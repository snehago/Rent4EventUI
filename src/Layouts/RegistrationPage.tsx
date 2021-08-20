import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

const RegistrationPage = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: 500,
    margin: "20px auto",
  };
  const headerStyle = {
    margin: 0,
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };
  const textFieldStyle = {
    marginBottom: "5%",
  };
  const btnStyle = { margin: "8px 0" };

  const [role] = useState("host");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    role: "",
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
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    role: Yup.string().oneOf(["user", "host"], "Required").required("Required"),
    dob: Yup.string().required("Required"),
  });
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Register</h2>
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
                style={textFieldStyle}
                variant="outlined"
                fullWidth
                label="First Name"
                placeholder="Enter your First name"
                required
                helperText={
                  <ErrorMessage name="firstName">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="lastName"
                style={textFieldStyle}
                variant="outlined"
                fullWidth
                label="Last Name"
                placeholder="Enter your Last name"
                required
                helperText={
                  <ErrorMessage name="lastName">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="email"
                style={textFieldStyle}
                variant="outlined"
                fullWidth
                label="Email"
                placeholder="Enter your Email Id"
                required
                helperText={
                  <ErrorMessage name="email">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="password"
                style={textFieldStyle}
                variant="outlined"
                fullWidth
                type="password"
                label="Password"
                placeholder="Enter a Password"
                required
                helperText={
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="confirmPassword"
                style={textFieldStyle}
                variant="outlined"
                fullWidth
                type="password"
                label="Confirm Password"
                placeholder="Confirm your Password"
                required
                helperText={
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="dob"
                variant="outlined"
                fullWidth
                style={textFieldStyle}
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
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />

              <FormControl
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
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </FormHelperText>
              </FormControl>

              {role === "host" ? (
                <TextField
                  required
                  style={textFieldStyle}
                  variant="outlined"
                  fullWidth
                  label="Upi Id"
                  placeholder="Give your Upi Id"
                />
              ) : null}

              <Button
                type="submit"
                fullWidth
                color="primary"
                style={btnStyle}
                disabled={props.isSubmitting}
                variant="contained"
                // onClick={handleSubmit}
              >
                {props.isSubmitting ? "LOADING" : "REGISTER"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};
export default RegistrationPage;
