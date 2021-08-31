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
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { NavLink } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserService } from "../Services/UserService";
import { useDispatch } from "react-redux";
import { of } from "await-of";
import { login } from "../Redux/reducers/AuthReducer";
import "./styles/login.scss";
import { useHistory } from "react-router-dom";
import image from "../assets/images/banner1.jpeg";
const userService = new UserService();
const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    passwordHash: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    passwordHash: Yup.string().required("Required"),
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    const [response, error] = await of(userService.login(values));
    if (error) {
      alert(error);
    }
    if (response) {
      if (response.role === "client") history.push("/home");
      else history.push("/dashboard/host");
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
      <Grid item xs={6}>
        <img
          src={image}
          className="login-side-image"
          alt=""
        />
        <div className="login-img-text">
          GET STARTED <br /> FOR MAKING YOUR STAYS AND EVENTS SPECIAL WITH US !!
        </div>
      </Grid>
      <Grid container xs={6} className="login-form-section">
        <Paper elevation={10} className="paperStyle">
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
                  // value={email}
                  // onChange={emailHandler}
                  label="Email"
                  placeholder="Enter Email"
                  // variant="outlined"
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
                  as={TextField}
                  name="passwordHash"
                  // value={password}
                  // onChange={passwordHandler}
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  // variant="outlined"
                  fullWidth
                  required
                  helperText={
                    <ErrorMessage name="password">
                      {(msg) => <div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                  }
                />
                <Field
                  as={FormControlLabel}
                  name="rememberMe"
                  control={<Checkbox color="primary" />}
                  label="Remember Me"
                />
                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  //className="btnStyle"
                  variant="contained"
                  // onClick={handleSubmit}
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "LOADING" : "SIGN IN"}
                </Button>
              </Form>
            )}
          </Formik>
          <Typography className="login-text-links">
            <Link href="#">Forgot Password ?</Link>
          </Typography>
          <Typography className="login-text-links">
            {" "}
            Do you have an account ?
            <br />
            {/* <NavLink className="navLink" exact to="/user/register/user/">
            Register
          </NavLink> */}
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
            {/* <NavLink className="navLink" exact to="/user/register/host/">
            Register as a Host
          </NavLink> */}
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
