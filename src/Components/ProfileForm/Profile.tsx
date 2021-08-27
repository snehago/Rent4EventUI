import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import "./profile.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import profileImage from "../../assets/images/ppic.jpg";
import { Paper, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { SharedService } from "../../Services/SharedService";
import { login } from "../../Redux/reducers/AuthReducer";

const sharedService = new SharedService();

const Profile = (props: any) => {
  const [editProfile, setEditProfile] = useState(false);
  const [profileDetails, setProfileDetails] = useState<any>({});
  const [firstName, setFirstName] = useState<any>("");
  const [lastName, setLastName] = useState<any>("");
  const [contactNumber, setContactNumber] = useState<any>();
  const [email, setEmail] = useState<any>("");
  const [paymentDetails, setPaymentDetails] = useState<any>("");

  const user = useSelector((state: RootState) => state.auth.user);

  const handleEditButton = () => {
    setEditProfile(!editProfile);
    console.log("EP:", editProfile);
  };

  const handleBlankFunction = () => {};

  useEffect(() => {
    console.log("use effect of profile");
    if (sharedService.isUserLoggedIn()) {
      console.log(sharedService.getUser());
      setProfileDetails(JSON.parse(sharedService.getUser()));
      console.log("pd::", profileDetails);
      setFirstName(profileDetails.firstName);
      console.log(firstName);
      setLastName(profileDetails.lastName);
      setContactNumber(profileDetails.contactNumber);
      setEmail(profileDetails.email);
      setPaymentDetails(profileDetails.paymentDetails);
    }
  }, [user]);

  return (
    <div>
      <Paper elevation={10} className="profile-paper-container">
        <Grid container spacing={2} className="profile-main-grid-container">
          <Grid item xs={12}>
            <h2 className="profile-section-label">Profile</h2>
          </Grid>
          {/* Profile Picture Sidebar starts here */}
          <Grid item xs={2} className="profile-pic-grid">
            <Card className="profile-pic-card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={profileImage}
                  title="Profile Image"
                />
              </CardActionArea>
            </Card>
          </Grid>

          {/* Profile Picture Sidebar ends here */}

          {/* Profile Details Section Starts Here */}

          <Grid
            container
            spacing={7}
            item
            xs={8}
            className="profile-details-grid-container"
          >
            <Grid item xs={6}>
              <TextField
                size="small"
                InputLabelProps={{ shrink: true }}
                // variant="outlined"
                label="First Name"
                // value={profileDetails.firstName}
                value={firstName}
                onChange={
                  editProfile
                    ? (e: any) => {
                        setFirstName(e.target.value);
                      }
                    : handleBlankFunction
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                size="small"
                // variant="outlined"
                label="Last Name"
                InputLabelProps={{ shrink: true }}
                value={lastName}
                onChange={
                  editProfile
                    ? (e: any) => setLastName(e.target.value)
                    : handleBlankFunction
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                size="small"
                // variant="outlined"
                type="number"
                label="Phone Number"
                InputLabelProps={{ shrink: true }}
                value={contactNumber}
                onChange={
                  editProfile
                    ? (e: any) => setContactNumber(e.target.value)
                    : handleBlankFunction
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                size="small"
                InputLabelProps={{ shrink: true }}
                // variant="outlined"
                type="date"
                label="Date Of Birth"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                size="small"
                // variant="outlined"
                type="email"
                label="Email"
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={
                  editProfile
                    ? (e: any) => setEmail(e.target.value)
                    : handleBlankFunction
                }
              />
            </Grid>

            {props.userRole === "host" && (
              <Grid item xs={6}>
                <TextField
                  size="small"
                  //   variant="outlined"
                  label="Payment"
                  InputLabelProps={{ shrink: true }}
                  value={paymentDetails}
                  onChange={
                    editProfile
                      ? (e: any) => setPaymentDetails(e.target.value)
                      : handleBlankFunction
                  }
                />
              </Grid>
            )}

            <Grid item>
              <Button
                onClick={handleEditButton}
                variant="contained"
                className="profile-edit-button"
              >
                {editProfile ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>

          {/* Profile Details Section Ends Here */}
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
