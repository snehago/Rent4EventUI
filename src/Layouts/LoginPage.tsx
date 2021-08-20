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
import { useState } from "react";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };
  const btnStyle = { margin: "8px 0" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event: any) => {
    setEmail(event.target.value)
  };
  const passwordHandler = (event: any) => {
    setPassword(event.target.value)
  };
  const handleSubmit=()=>{
    console.log("Email:"+email)
    console.log("Password:"+password)
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid style={{ display:'flex',flexDirection:"column",alignItems:'center' }} >
          <Avatar style={avatarStyle}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          value={email}
          onChange={emailHandler}
          label="Email"
          placeholder="Enter Email"
          variant="outlined"
          fullWidth
          required
          style={{ marginBottom: "5%" }}
        />
        <TextField
          value={password}
          onChange={passwordHandler}
          label="Password"
          placeholder="Enter Password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checkedb"
              color="primary"
            />
          }
          label="Remember Me"
        />
        <Button
          type="submit"
          fullWidth
          color="primary"
          style={btnStyle}
          variant="contained"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Typography>
          <Link href="#">Forgot Password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <NavLink style={{textDecoration:"none"}}  exact to="/user/register/">
            Register
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default LoginPage;
