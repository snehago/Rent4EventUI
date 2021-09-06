import Header from "../Components/Header";
import errorImg from "../assets/images/error.gif";
import "./styles/errorpage.scss";
import { Grid } from "@material-ui/core";

export default function ErrorPage() {
  return (
    <div className="whole-error-page">
      <Header></Header>
      <Grid container style={{ marginTop: "3%" }}>
        <Grid item xs={7}  style={{marginTop:"3%"}}>
          <span id="error-oops">Oops !</span> <br />
          <span className="error-page-msg">
          We can't seem to find the page you are looking for <br/>
          Error code: 404
          </span>
          
        </Grid>

        <Grid item xs={5}>
          <img src={errorImg} className="error-img" />
        </Grid>
      </Grid>
    </div>
  );
}
