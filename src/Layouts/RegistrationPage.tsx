import { Avatar, Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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


  const [role,setRole]=useState('host')
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

        <form>
          <TextField
            style={textFieldStyle}
            variant="outlined"
            fullWidth
            label="First Name"
            placeholder="Enter your First name"
            required
          />
          <TextField
            style={textFieldStyle}
            variant="outlined"
            fullWidth
            label="Last Name"
            placeholder="Enter your Last name"
            required
          />
          <TextField
            style={textFieldStyle}
            variant="outlined"
            fullWidth
            label="Email"
            placeholder="Enter your Email Id"
            required
          />
          <TextField
            style={textFieldStyle}
            variant="outlined"
            fullWidth
            type="password"
            label="Password"
            placeholder="Enter a Password"
            required
          />
          <TextField
            style={textFieldStyle}
            variant="outlined"
            fullWidth
            type="password"
            label="Confirm Password"
            placeholder="Confirm your Password"
            required
          />
          <TextField
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
          />

          <FormControl component="fieldset" required style={textFieldStyle}>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              aria-label="role"
              name="role1"
              style={{display:"initial"}}
              // value={value}
              // onChange={handleChange}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="User"
              />
              <FormControlLabel value="host" control={<Radio />} label="Host" />
         
            </RadioGroup>
          </FormControl>

          {
            role==='host'
            ?
            <TextField
            required
            style={textFieldStyle}
            variant="outlined"
            fullWidth
            label="Upi Id"
            placeholder="Give your Upi Id"
            />
            :
            null
          }
        </form>

        <Button
          type="submit"
          fullWidth
          color="primary"
          style={btnStyle}
          variant="contained"
          // onClick={handleSubmit}
        >
          REGISTER
        </Button>
      </Paper>
    </Grid>
  );
};
export default RegistrationPage;
