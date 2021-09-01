import { Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./circularloader.scss";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "primary",
  },
}));

function CircularLoader() {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open>
        <div className="loader-body-container">
          <div>
            <CircularProgress className={classes.backdrop} color="primary" />
          </div>
          <div className="loader-message">
            Wait !! We are getting things ready for you
          </div>
        </div>
      </Backdrop>
    </div>
  );
}

export default CircularLoader;
