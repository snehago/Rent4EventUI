import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./cardStyle.scss";
import image from "../../assets/images/download.jpg";

interface cardProps {
  id: number,
  title: String;
  description: String;
  price: number;
}

export default function CardItem({id,title, description, price} : cardProps) {
  // const classes = useStyles();
  const history = useHistory();

  const handleClick = () => history.push(`/venue-details/${id}`);

  return (
    <Card className="root">
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          className="media"
          src={image}
          title="Venue Image"
        />
        <CardContent className="card-content">
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="title"
          >
            {title.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <p className="venue-card-price">${price}</p>
      </CardActions>
    </Card>
  );
}
