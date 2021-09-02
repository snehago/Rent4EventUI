
import { Avatar, Box, Link } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import "./footer.scss";

export default function Footer() {
 
  return (
    <Grid container spacing={0} className="footer-main-grid-container">
      <Grid item xs={4} lg={2} style={{ marginLeft: "6%", marginRight: "4%" }}>
        <Box className="label">About Us</Box>
        <Box className="aboutText">
          Rent4You is designed to bring clients and hosts together to create a
          quick and easy event planning experience. We also serve the
          hospitality industry by helping event venues grow their events
          business in our cloud-based service
        </Box>
      </Grid>

      <Grid item xs={4} lg={2}>
        <Box className="label">Services</Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            Caterine
          </Link>
          <p></p>
        </Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            Decoration
          </Link>
          <p></p>
        </Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            Music Systems
          </Link>
        </Box>
      </Grid>

      <Grid item xs={2} lg={2}>
        <Box className="label">Terms&nbsp;and&nbsp;Conditions</Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            Cancellation Policy
          </Link>
          <p></p>
        </Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            Conditions
          </Link>
          <p></p>
        </Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            PrivacyPolicy
          </Link>
        </Box>
      </Grid>

      <Grid item xs={2} lg={2}>
        <Box className="label">Contact Us</Box>
        <Box>
          <Link id="blueLink" className="contentText" href="/" color="inherit">
            info@rent4event@gmai.com
          </Link>
          <p></p>
        </Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            Office: +91 903XXXX545
          </Link>
          <p></p>
        </Box>
        <Box>
          <Link className="contentText" href="/" color="inherit">
            Fax: +91 903XXXX545
          </Link>
          <p></p>
        </Box>
        <Box>
          <Link id="blueLink" className="contentText" href="/" color="inherit">
            Enquire
          </Link>
        </Box>
      </Grid>

      <Grid item xs={2} lg={2}>
        <Box className="label" id="followLabel">
          Follow Us
        </Box>
        <Grid container spacing={5}>
          <Grid item lg={2} xs={12} sm={4} md={3} className="avatarGridItem">
            <Avatar className="socalIconAvatar">
              <FacebookIcon />
            </Avatar>
          </Grid>
          <Grid item lg={2} xs={12} sm={4} md={3} className="avatarGridItem">
            <Avatar className="socalIconAvatar">
              <InstagramIcon />
            </Avatar>
          </Grid>
          <Grid item lg={2} xs={12} sm={4} md={3} className="avatarGridItem">
            <Avatar className="socalIconAvatar">
              <TwitterIcon />
            </Avatar>
          </Grid>
          <Grid item lg={2} xs={12} sm={4} md={3} className="avatarGridItem">
            <Avatar className="socalIconAvatar">
              <YouTubeIcon />
            </Avatar>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
