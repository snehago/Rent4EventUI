import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import "./addVenue.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { of } from "await-of";
import ImageUploading, { ImageListType } from "react-images-uploading";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useHistory } from "react-router";
import Notification, { NotificationType } from "../Notification";
import "./addenueimages.scss";

export default function AddVenueImages({ handleBack }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = React.useState([]);

  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {open && (
        <Notification
          type={NotificationType.success}
          content="Venue Added Successfully successfully"
        ></Notification>
      )}

      <Paper elevation={10} className="addvenue-images-paper">
        <Grid item xs={12} className="addvenue-upload-image-section">
          <div className="addVenueSubLabels">Add Images Of The Venue</div>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <Button
                  variant="outlined"
                  className="upload-btn-style"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here &nbsp;
                  <PublishOutlinedIcon />
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  className="upload-btn-style"
                  onClick={onImageRemoveAll}
                >
                  Remove all images &nbsp;
                  <RemoveCircleOutlineOutlinedIcon />
                </Button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.dataURL} alt="" width="400" height="200" />
                    <div className="image-item__btn-wrapper">
                      <Button
                        variant="outlined"
                        className="upload-btn-style"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update &nbsp;
                        <EditOutlinedIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        className="upload-btn-style"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove &nbsp;
                        <DeleteOutlinedIcon />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          className="submit-images-venue-btn"
        >
          Submit
        </Button>

        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
      </Paper>
    </div>
  );
}
