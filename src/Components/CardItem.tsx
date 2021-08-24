import React from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./cardStyle.scss";
import image from "../assets/images/download.jpg";

interface cardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

export default function CardItem() {
  // const classes = useStyles();
  const history = useHistory();

  const handleClick = () => history.push("/venue-details/1");

  return (
    <Card className="root">
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          className="media"
          src={image}
          title="Venue Image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="title"
          >
            Venue For Stay
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            harum natus nemo aspernatur placeat inventore fugiat vitae odit quam
            assumenda?
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography className="price">$30.00</Typography>
      </CardActions>
    </Card>
  );
}
