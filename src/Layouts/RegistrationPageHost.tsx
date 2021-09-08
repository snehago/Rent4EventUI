import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { NotificationType } from "../Components/Notification";
import Notification from "../Components/Notification";
import { Formik, Field, Form, ErrorMessage } from "formik";
import MuiPhoneNumber from "material-ui-phone-number";
import * as Yup from "yup";
import { of } from "await-of";
import { UserService } from "../Services/UserService";
import { useHistory } from "react-router";
import "./styles/registration.scss";
import { useState } from "react";
import swal from "sweetalert";
import HostSteps from "../Components/StepsSection/HostSteps";

const userService = new UserService();
const RegistrationPageHost = () => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    passwordHash: "",
    confirmPasswordHash: "",
    contactNumber: null,
    dob: "",
    paymentDetails: "",
  };

  const onSubmit = async (values: any) => {
    values.role = "host";
    const [response, error] = await of(userService.signup(values));
    if (error) swal("Something went wrong", "error");
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
    email: Yup.string()
      .email("Enter valid email")
      .required("Required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter a valid email"
      ),
    passwordHash: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPasswordHash: Yup.string()
      .oneOf([Yup.ref("passwordHash")], "Password not matched")
      .required("Required"),
    dob: Yup.string().required("Required"),
    paymentDetails: Yup.string()
      .required("Required")
      .matches(/^[\w.-]+@[\w.-]+$/, "Please Enter a Valid Upi Id"),
    contactNumber: Yup.string()
      .min(13, "Contact Number Should be of 10 digits")
      .required("Required"),
  });

  const handleLogin = () => {
    history.push("/user/login");
  };

  return (
    <>
      {open && (
        <Notification
          type={NotificationType.success}
          content="User registered successfully"
        ></Notification>
      )}
      <Grid container className="reg-page-conatiner">
        <Grid item xs={12} lg={6} md={6} sm={12}>
          <div className="reg-client-steps-container">
            <HostSteps />
          </div>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={12}>
          <Paper elevation={20} className="paperStyle">
            <Grid className="gridStyle">
              <Avatar className="avatarStyle">
                <AddCircleOutlineOutlinedIcon />
              </Avatar>
              <h2 className="headerStyle">Register as Host</h2>
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
                <Form className="register-form">
                  <Field
                    as={TextField}
                    name="firstName"
                    className="textFieldStyle"
                    // variant="outlined"
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
                    // variant="outlined"
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
                    // variant="outlined"
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
                    // variant="outlined"
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
                    // variant="outlined"
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
                    defaultCountry={"us"}
                    name="contactNumber"
                    onChange={(e: any) =>
                      props.setFieldValue("contactNumber", e)
                    }
                    // variant="outlined"
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
                    // variant="outlined"
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

                  <Field
                    as={TextField}
                    name="paymentDetails"
                    required
                    className="textFieldStyle"
                    // variant="outlined"
                    fullWidth
                    label="Upi Id"
                    placeholder="Give your Upi Id"
                    helperText={
                      <ErrorMessage name="paymentDetails">
                        {(msg) => <div className="errorMsg">{msg}</div>}
                      </ErrorMessage>
                    }
                  />

                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    className="btnStyle"
                    disabled={props.isSubmitting}
                    variant="contained"
                  >
                    {props.isSubmitting ? "LOADING" : "REGISTER"}
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography className="register-text-links">
              {" "}
              Already have an account ?
              <Button
                size="small"
                onClick={handleLogin}
                fullWidth
                // variant="outlined"
                className="register-login-btn"
              >
                Login
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default RegistrationPageHost;
