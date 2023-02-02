import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "25%",
    margin: "10px",
  },
  media: {
    height: 200,
    maxWidth: "100%",
  },
  discount: {
    textDecoration: "line-through",
    color: "gray",
    marginRight: "10px",
  },
  price: {
    color: "green",
    fontWeight: "bold",
  },
  "@media only screen and (max-width: 600px)": {
    card: {
      width: "100%",
      height: "100%",
    },
    media: {
      width: "100%",
    },
  },
});

const ShoeCard = ({ image, name, description, price, discountPrice }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/single-product", {
      state: { image, name, description, price, discountPrice },
    });
  };

  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography className={classes.discount}>€{discountPrice}</Typography>
        <Typography className={classes.price}>€{price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ShoeCard;
