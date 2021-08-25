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

import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { of } from "await-of";
import { UserService } from "../Services/UserService";
import { useHistory } from "react-router";
import "./styles/registration.scss";
const userService = new UserService();
const RegistrationPageHost = () => {
  const history = useHistory();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
    dob: "",
  };

  const onSubmit =async (values: any) => {
    values.role = "host";
    console.log(values);
    const [response, error] = await of(userService.signup(values));
    if (error) alert(error.message);
    if (response) {
      history.push("/user/login");
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
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("passwordHash")], "Password not matched")
      .required("Required"),
    dob: Yup.string().required("Required"),
    upiId: Yup.string()
      .required("Required")
      .matches(/^[\w.-]+@[\w.-]+$/, "Please Enter a Valid Upi Id"),
  });
  return (
    <Grid>
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
            <Form>
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
                  <ErrorMessage name="password">
                    {(msg) => <div className="errorMsg">{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="confirmPassword"
                className="textFieldStyle"
                variant="outlined"
                fullWidth
                type="password"
                label="Confirm Password"
                placeholder="Confirm your Password"
                required
                helperText={
                  <ErrorMessage name="confirmPassword">
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

              <Field
                as={TextField}
                name="upiId"
                required
                className="textFieldStyle"
                variant="outlined"
                fullWidth
                label="Upi Id"
                placeholder="Give your Upi Id"
                helperText={
                  <ErrorMessage name="upiId">
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
        <Typography>
          {" "}
          Already have an account ?
          <NavLink className="navLink" exact to="/user/login/">
            Login
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default RegistrationPageHost;
