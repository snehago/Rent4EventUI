import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import "./profile.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import { Paper, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { SharedService } from "../../Services/SharedService";
import { User } from "../../Shared/Interfaces/User";
import { UserService } from "../../Services/UserService";
import { of } from "await-of";
import CircularLoader from "../CircularLoader/CircularLoader";
import swal from "sweetalert";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import image from "../../assets/images/ppic.jpg";
import moment from "moment";

const sharedService = new SharedService();
const userService = new UserService();
const Profile = (props: any) => {
  const [editProfile, setEditProfile] = useState(false);
  const [userId, setUserId] = useState<any>();
  const [firstName, setFirstName] = useState<any>("");
  const [lastName, setLastName] = useState<any>("");
  const [contactNumber, setContactNumber] = useState<any>();
  const [email, setEmail] = useState<any>("");
  const [paymentDetails, setPaymentDetails] = useState<any>("");
  const [dateOfBirth, setDateOfBirth] = useState<any>(
    moment(Date.now()).format("YYYY-MM-DD")
  );
  const [role, setRole] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);

  const user: User = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        userService.getProfilePicture(user.id)
      );
      if (error) {
        swal("Error","Not able to fetch profile picture", "error");
      }
      if (response) {
      }
    })();
  }, [user,editProfile]);

  async function handleEditFormHost(user: any) {
    const [response, error] = await of(userService.editHostProfile(user));
    if (error) {
      swal("Error","Unable to update details", "error");
    }
    if (response) {
      swal("Success","profile updated successfully", "success");
    }
  }

  async function handleEditFormClient(user: any) {
    const [response, error] = await of(userService.editClientProfile(user));
    if (error) {
      swal("Error", "Unable to update details", "error");
    }
    if (response) {
      swal("Success", "profile updated successfully", "success");
    }
  }

  const handleEditButton = async () => {
    if (editProfile && user.role === "host") {
      const editedUser: any = {
        id: userId,
        firstName: firstName,
        lasName: lastName,
        contactNumber: contactNumber,
        email: email,
        paymentDetails: paymentDetails,
        passwordHash: user.passwordHash,
        dateOfBirth: dateOfBirth,
        role: role,
      };

      await handleEditFormHost(editedUser);
    } else if (editProfile && user.role === "client") {
      const editedUser: any = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        contactNumber: contactNumber,
        email: email,
        passwordHash: user.passwordHash,
        dateOfBirth: dateOfBirth,
        role: role,
      };
      await handleEditFormClient(editedUser);
    }
    setEditProfile(!editProfile);
  };

  const handleBlankFunction = () => {};

  useEffect(() => {
    if (sharedService.isUserLoggedIn()) {
      setLoading(false);
      setTimeout(() => {
        setUserId(user.id);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setContactNumber(user.contactNumber);
        setEmail(user.email);
        setPaymentDetails(user.paymentDetails);
        setRole(user.role);
        setDateOfBirth(moment(user.dateOfBirth).format("YYYY-MM-DD"));
      }, 1000);
    }
  }, [user]);

  return (
    <div className="scroll-div">
      <Paper elevation={10} className="profile-paper-container">
        {loading && <CircularLoader />}
        <Grid container spacing={2} className="profile-main-grid-container">
          <Grid item xs={12}>
            <h2 className="profile-section-label">Profile</h2>
          </Grid>
          {/* Profile Picture Sidebar starts here */}
          <Grid item xs={12} className="profile-pic-grid">
            <Paper elevation={8} className="profile-pic-paper" >
              <Card className="profile-pic-card">
                <CardActionArea className="ppic-action-area" style={{height:"100%",borderRadius:"0.5rem"}}>
                    <img
                      className="profile-image"
                      src={image}
                      height="100%"
                      width="100%"
                      alt="profilePic"
                    />
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>

          {/* Profile Picture Sidebar ends here */}

          {/* Profile Details Section Starts Here */}

          <Grid
            container
            spacing={7}
            item
            xs={12}
            className="profile-details-grid-container"
          >
            <Grid item xs={6}>
              <TextField
                size="small"
                InputLabelProps={{ shrink: true }}
                label="First Name"
                value={firstName}
                disabled={!editProfile}
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
                label="Last Name"
                InputLabelProps={{ shrink: true }}
                value={lastName}
                disabled={!editProfile}
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
                // type="number"
                label="Phone Number"
                InputLabelProps={{ shrink: true }}
                value={contactNumber}
                disabled={!editProfile}
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
                value={dateOfBirth}
                label="Date Of Birth"
                disabled={!editProfile}
                onChange={
                  editProfile
                    ? (e: any) => setDateOfBirth(e.target.value)
                    : handleBlankFunction
                }
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
                disabled={!editProfile}
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
                  disabled={!editProfile}
                  onChange={
                    editProfile
                      ? (e: any) => setPaymentDetails(e.target.value)
                      : handleBlankFunction
                  }
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                onClick={handleEditButton}
                variant="contained"
                className="profile-edit-button"
              >
                {editProfile ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <SaveOutlinedIcon /> &nbsp; Save
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <EditOutlinedIcon /> &nbsp; Edit
                  </div>
                )}
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
