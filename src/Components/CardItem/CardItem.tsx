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
import { Button, Icon } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { User } from "../../Shared/Interfaces/User";
import { SharedService } from "../../Services/SharedService";

interface cardProps {
  id: number;
  title: String;
  description: String;
  price: number;
  host: any;
  wish: any;
}
const venueService = new VenueService();
const sharedService = new SharedService();
export default function CardItem({
  id,
  title,
  description,
  price,
  host,
  wish,
}: cardProps) {
  // const classes = useStyles();
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [image, setImage] = useState<any>(imageSrc);
  const history = useHistory();
  const handleClick = () => history.push(`/venue-details/${id}`);

  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getVenuePictures(id, host?.id)
      );
      if (error || response.length === 0) {
        setImage(imageSrc);
        return;
      }
      if (response) {
        setImage(response[0]);
      }
    })();

    console.log("CardUser:", user);
  }, []);

  useEffect(() => {
    if (wish) {
      setWishlisted(true);
    }
  }, [wish]);

  const handleAddToWishlist = async () => {
    const venue = {
      userId: user.id,
      venueId: id,
    };

    console.log(venue);

    if (!wishlisted) {
      const [response, error] = await of(
        venueService.addVenueToWishlist(venue)
      );
      if (error) {
        sweetAlert("Not able to add to wishlist");
      }
      if (response) {
        sweetAlert(`${title} is added to your wishlist`);
        setWishlisted(!wishlisted);
        console.log(user);
        console.log(await of(venueService.getVenueByVenueId(id)));
      }
    } else {
      const [response, error] = await of(
        venueService.removeVenueToWishlist(venue)
      );
      if (error) {
        sweetAlert("Not able to remove from wishlist");
      }
      if (response) {
        sweetAlert(`${title} is removed from your wishlist`);
        setWishlisted(!wishlisted);
      }
    }
  };

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
      <CardActions key={v4()} className="card-item-price-section">
        <p className="venue-card-price">${price}</p>

        {sharedService.isUserLoggedIn() ? (
          <div>
            {wishlisted ? (
              <IconButton
                onClick={handleAddToWishlist}
                className="card-item-wishlist-btn"
              >
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleAddToWishlist}
                className="card-item-wishlist-btn"
              >
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            )}
          </div>
        ) : (
          <div></div>
        )}

      </CardActions>
    </Card>
  );
}
