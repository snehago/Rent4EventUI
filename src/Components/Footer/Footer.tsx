import { Avatar, Box, Link, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "./footer.scss";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  return (
    <div className="mainContainer">
      <Box className="mainBox">
        <div className="footerContainer">
          <Grid container spacing={10}>
            <Grid item lg={2} xs={12} sm={4} md={4}>
              <Box className="label">About Us</Box>
              <p></p>
              <Box className="aboutText">
                
                  Vestibulum eget nisi malesuada, blandit augue faucibus, mollis
                  lectus. Integer pharetra blandit elit at eleifend.
                
              </Box>
            </Grid>

            <Grid item lg={2} xs={12} sm={4} md={4}>
              <Box className="label">Services</Box>
              <Box>
                <Link className="contentText" href="/" color="inherit">
                  Services 1
                </Link>
                <p></p>
              </Box>
              <Box>
                <Link className="contentText" href="/" color="inherit">
                  Services 1
                </Link>
                <p></p>
              </Box>
              <Box>
                <Link className="contentText" href="/" color="inherit">
                  Services 1
                </Link>
              </Box>
            </Grid>

            <Grid item lg={2} xs={12} sm={4} md={4}>
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

            <Grid item lg={2} xs={12} sm={4} md={4}>
              <Box className="label">Contact Us</Box>
              <Box>
                <Link
                  id="blueLink"
                  className="contentText"
                  href="/"
                  color="inherit"
                >
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
                <Link
                  id="blueLink"
                  className="contentText"
                  href="/"
                  color="inherit"
                >
                  Enquire
                </Link>
              </Box>
            </Grid>

            <Grid item lg={2} xs={12} sm={4} md={4}>
              <Box className="label" id="followLabel">
                Follow Us
              </Box>
              <Grid container spacing={5}>
                <Grid
                  item
                  lg={2}
                  xs={12}
                  sm={4}
                  md={3}
                  className="avatarGridItem"
                >
                  <Avatar className="socalIconAvatar">
                    <FacebookIcon />
                  </Avatar>
                </Grid>
                <Grid
                  item
                  lg={2}
                  xs={12}
                  sm={4}
                  md={3}
                  className="avatarGridItem"
                >
                  <Avatar className="socalIconAvatar">
                    <InstagramIcon />
                  </Avatar>
                </Grid>
                <Grid
                  item
                  lg={2}
                  xs={12}
                  sm={4}
                  md={3}
                  className="avatarGridItem"
                >
                  <Avatar className="socalIconAvatar">
                    <TwitterIcon />
                  </Avatar>
                </Grid>
                <Grid
                  item
                  lg={2}
                  xs={12}
                  sm={4}
                  md={3}
                  className="avatarGridItem"
                >
                  <Avatar  className="socalIconAvatar">
                    <YouTubeIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={2} xs={12} sm={4} md={4}>
              <Box className="label">Go To Top</Box>
              <p></p>
              <Box>
                <Avatar className="topAvatar" onClick={scrollToTop}>
                  <ArrowUpwardIcon />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
}