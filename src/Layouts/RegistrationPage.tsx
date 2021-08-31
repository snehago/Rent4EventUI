import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Formik, Field, Form, ErrorMessage } from "formik";
import MuiPhoneNumber from "material-ui-phone-number";

import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { of } from "await-of";
import { UserService } from "../Services/UserService";
import { useHistory } from "react-router";
import "./styles/registration.scss";
import Notification from "../Components/Notification";
import { NotificationType } from "../Components/Notification";
import { useState } from "react";
import image from "../assets/images/banner1.jpeg";
const userService = new UserService();
const RegistrationPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    passwordHash: "",
    confirmPasswordHash: "",
    contactNumber: "",
    dob: "",
  };

  const onSubmit = async (values: any) => {
    values.role = "client";
    console.log(values);
    const [response, error] = await of(userService.signup(values));
    if (error) alert(error.message);
    if (response) {
      setOpen(true);
      setTimeout(() => {
        history.push("/user/login");
      }, 3000);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "It's too short").required("Required"),
    lastName: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    passwordHash: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPasswordHash: Yup.string()
      .oneOf([Yup.ref("passwordHash")], "Password not matched")
      .required("Required"),

    dob: Yup.string().required("Required"),
    contactNumber: Yup.string()
      .min(13, "Contact Number Should be of 10 digits")
      .required("Required"),
  });
  return (
    <>
      {open && (
        <Notification
          type={NotificationType.success}
          content="User registered successfully"
        ></Notification>
      )}
      <Grid container>
        <Grid item xs={6}>
          <img
            src={image}
            className="reg-side-image"
            alt=""
          />
          <div className="login-img-text">
            GET STARTED <br /> FOR MAKING YOUR STAYS AND EVENTS SPECIAL WITH US
            !!
          </div>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={20} className="paperStyle">
            <Grid className="gridStyle">
              <Avatar className="avatarStyle">
                <AddCircleOutlineOutlinedIcon />
              </Avatar>
              <h2 className="headerStyle">Register</h2>
              <Typography variant="caption">
                Please fill this form to create an account !
              </Typography>
            </Grid>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(props: any) => (
                <Form className="register-form">
                  <Field
                    as={TextField}
                    name="firstName"
                    className="textFieldStyle"
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    placeholder="Enter your First name"
                    required
                    helperText={
                      <ErrorMessage name="firstName">
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />
                  <Field
                    as={TextField}
                    name="lastName"
                    className="textFieldStyle"
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    placeholder="Enter your Last name"
                    required
                    helperText={
                      <ErrorMessage name="lastName">
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />
                  <Field
                    as={TextField}
                    name="email"
                    className="textFieldStyle"
                    variant="outlined"
                    fullWidth
                    label="Email"
                    placeholder="Enter your Email Id"
                    required
                    helperText={
                      <ErrorMessage name="email">
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />
                  <Field
                    as={TextField}
                    name="passwordHash"
                    className="textFieldStyle"
                    variant="outlined"
                    fullWidth
                    type="password"
                    label="Password"
                    placeholder="Enter a Password"
                    required
                    helperText={
                      <ErrorMessage name="passwordHash">
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />
                  <Field
                    as={TextField}
                    name="confirmPasswordHash"
                    className="textFieldStyle"
                    variant="outlined"
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your Password"
                    required
                    helperText={
                      <ErrorMessage name="confirmPasswordHash">
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />

                  <MuiPhoneNumber
                    defaultCountry={"in"}
                    name="contactNumber"
                    onChange={(e: any) =>
                      props.setFieldValue("contactNumber", e)
                    }
                    variant="outlined"
                    className="textFieldStyle"
                    fullWidth
                    label="Contact Number"
                    required
                    helperText={
                      <ErrorMessage name="contactNumber">
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />
                  <Field
                    as={TextField}
                    name="dob"
                    variant="outlined"
                    fullWidth
                    className="textFieldStyle"
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
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />

                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    //className="btnStyle"
                    disabled={props.isSubmitting}
                    variant="contained"
                    // onClick={handleSubmit}
                  >
                    {props.isSubmitting ? "LOADING" : "REGISTER"}
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography className="register-text-links">
              {" "}
              Already have an account ?
              <NavLink className="navLink" exact to="/user/login/">
                Login
              </NavLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default RegistrationPage;
