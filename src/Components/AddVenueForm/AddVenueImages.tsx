import React, { useEffect } from "react";
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
import CircularLoader from '../CircularLoader/CircularLoader';
import "./addenueimages.scss";
import { VenueService } from "../../Services/VenueService";
import swal from "sweetalert";
const venueService = new VenueService();
export default function AddVenueImages({ handleBack, venueId }:any) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [imageFiles, setImageFiles] = React.useState([]); 
  const [images, setImages] = React.useState([]);
  const [loading, setLoading]= React.useState(false);

  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    let temp:any = imageList.map(data => data.file);
    setImages(imageList as never[]);
    setImageFiles(temp);
  };

  const submitImages = async ()=> {
    setLoading(true);
    const data = new FormData();
    data.append('venueId', `${venueId}`);
    data.append('hostId', `${user.id}`);
    imageFiles.map(image => data.append('files',image));
    const [response,error]= await of(venueService.uploadVenuePictures(data));
    if(error) {
      swal("Error", "unable to upload pictures","error");
      setLoading(false);
    }
    if(response) {
      swal(
        "Successfully uploaded photos",
        "your photos are saved",
        "success"
      ).then((value) => window.location.reload());
    }
    setLoading(false);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {loading && <CircularLoader/>}
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
          onClick={submitImages}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
}
