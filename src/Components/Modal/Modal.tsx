import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    topBorder: {
      backgroundColor: "#eaeaea",
      width: "100%",
      height: "2rem",
    },
    closeButton: {
      float: "right",
      paddingRight: "2%",
      fontSize: "2rem",
      marginTop: "-2%",
      cursor: "pointer",
    },
    successIcon: {
      color: "green",
    },
    errorIcon: {
      color: "red",
    },
    title: {
      display: "flex",
      flexDirection: "row",
      paddingTop: "5%",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      width: "35rem",
      height: "10rem",
    },
  })
);

export default function TransitionsModal({
  open,
  title,
  content,
  type,
  closeCallback,
}: any) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeCallback}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.topBorder}>
              {" "}
              <span
                aria-hidden="true"
                onClick={closeCallback}
                className={classes.closeButton}
              >
                &times;
              </span>
            </div>
            <span className={classes.title} id="transition-modal-title">
              <span>
                {type === "success" && (
                  <CheckCircleOutlineRoundedIcon
                    className={classes.successIcon}
                  />
                )}
                {type === "error" && (
                  <HighlightOffRoundedIcon
                    className={classes.errorIcon}
                  />
                )}
              </span>
              <h4>{title}</h4>
            </span>
            <p id="transition-modal-description">{content}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
