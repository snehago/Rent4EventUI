import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./cardStyle.scss";
import imageSrc from "../../assets/images/download.jpg";
import { VenueService } from "../../Services/VenueService";
import { useEffect } from "react";
import { useState } from "react";
import { of } from "await-of";
import { v4 } from "uuid";

interface cardProps {
  id: number;
  title: String;
  description: String;
  price: number;
  host:any;
}
const venueService = new VenueService();
export default function CardItem({ id, title, description, price, host }: cardProps) {
  // const classes = useStyles();
  const [image, setImage]= useState<any>(imageSrc);
  const history = useHistory();
  const handleClick = () => history.push(`/venue-details/${id}`);

  useEffect(()=>{
    (async ()=> {
      const [response,error]= await of(venueService.getVenuePictures(id,host?.id));
      if(error || response.length===0) {
        setImage(imageSrc);
        return
      }
      if(response) {
        setImage(response[0]);
      }
    })();
  },[])

  return (
    <Card className="root">
      <CardActionArea onClick={handleClick}>
        <CardMedia
          key={v4()}
          component="img"
          className="media"
          src={image}
          title="Venue Image"
        />
        <CardContent key={v4()} className="card-content">
          <Typography
            key={v4()}
            gutterBottom
            variant="h5"
            component="h2"
            className="title"
          >
            {title.toUpperCase()}
          </Typography>
          <Typography
            key={v4()}
            variant="body2"
            color="textSecondary"
            component="p"
            className="text"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions key={v4()}>
        <p className="venue-card-price">${price}</p>
      </CardActions>
    </Card>
  );
}
