import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserService } from "../Services/UserService";
import { useDispatch } from "react-redux";
import { of } from "await-of";
import { login } from "../Redux/reducers/AuthReducer";
import "./styles/login.scss";
import { useHistory } from "react-router-dom";
import image from "../assets/images/login2.jpg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useState } from "react";
import swal from "sweetalert";

const userService = new UserService();
const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    passwordHash: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    passwordHash: Yup.string()
      .min(8, "Password Incorrect")
      .required("Required"),
  });

  const onSubmit = async (values: any) => {
    const [response, error] = await of(userService.login(values));
    if (error) {
      swal("Error","Invalid Username or Password","error");
    }
    if (response) {
      if (response.role === "client") history.push("/home");
      if (response.role === "host") history.push("/dashboard/host");
      if (response.role === "admin") history.push("/dashboard/admin");
      dispatch(login(response));
    }
  };

  const handleRegister = () => {
    history.push("/user/register/user/");
  };

  const handleRegisterHost = () => {
    history.push("/user/register/host/");
  };

  return (
    <Grid container className="login-root-grid">
      <Grid item xs={6} className="login-side-img-section">
        <img src={image} className="login-side-image" alt="" />
        <div className="login-img-text">
          GET STARTED <br /> FOR MAKING YOUR STAYS AND EVENTS SPECIAL WITH US !!
        </div>
      </Grid>
      <Grid
        container
        xs={12}
        lg={6}
        md={6}
        sm={12}
        className="login-form-section"
      >
        <div className="paperStyle">
          <Grid item className="gridStyle">
            <Avatar className="avatarStyle">
              <LockOpenOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props: any) => (
              <Form className="login-form">
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  fullWidth
                  required
                  style={{ marginBottom: "5%" }}
                  helperText={
                    <ErrorMessage name="email">
                      {(msg) => <div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                  }
                />

                <Field
                  as={Input}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="passwordHash"
                  // value={password}
                  // onChange={passwordHandler}
                  label="Password"
                  placeholder="Enter Password"
                  // type="password"
                  // variant="outlined"
                  fullWidth
                  required
                  helperText={
                    <ErrorMessage name="passwordHash">
                      {(msg) => <div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  className="login-btn-Style"
                  variant="contained"
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "LOADING" : "SIGN IN"}
                </Button>
              </Form>
            )}
          </Formik>
          <Typography className="login-text-links">
            {" "}
            Do you have an account ?
            <br />
            <Button
              onClick={handleRegister}
              variant="outlined"
              color="primary"
              fullWidth
              className="register-button"
            >
              Register
            </Button>
            <br />
            <Button
              onClick={handleRegisterHost}
              variant="outlined"
              color="primary"
              fullWidth
              className="register-button"
            >
              Register as a Host
            </Button>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
