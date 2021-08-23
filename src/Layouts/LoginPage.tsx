import React from "react";
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
import styles from "../LayoutStyles/Login.styles";
import { UserService } from "../Services/UserService";
import { useDispatch } from "react-redux";
import {of} from 'await-of';
import { login } from "../Redux/reducers/AuthReducer";

const userService = new UserService();
const LoginPage = () => {
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


  const onSubmit =async (values: any, props: any) => {
    console.log(values); 
     const [response, error] = await of(userService.login(values));
     if (error) {
       alert(error);
     }
     if (response) {
       alert(response);
       dispatch(login(response));
     }
  };
  return (
    <Grid>
      <Paper elevation={10} style={styles.paperstyle}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar style={styles.avatarStyle}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props:any) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                // value={email}
                // onChange={emailHandler}
                label="Email"
                placeholder="Enter Email"
                variant="outlined"
                fullWidth
                required
                style={{ marginBottom: "5%" }}
                helperText={
                  <ErrorMessage name="email">
                    {(msg:any) => <div style={styles.errorMsg}>{msg}</div>}
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
                variant="outlined"
                fullWidth
                required
                helperText={
                  <ErrorMessage name="passwordHash">
                    {(msg:any) => <div style={styles.errorMsg}>{msg}</div>}
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
                style={styles.btnStyle}
                variant="contained"
                // onClick={handleSubmit}
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "LOADING" : "SIGN IN"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Forgot Password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <br />
          <NavLink style={styles.navLink} exact to="/user/register/user/">
            Register
          </NavLink>
          <br />
          <NavLink style={styles.navLink} exact to="/user/register/host/">
            Register as a Host
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
