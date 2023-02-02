import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(6),
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography variant="subtitle1" align="center" color="inherit">
            We are a team of passionate individuals who strive to bring you the
            best quality shoes at affordable prices. Our goal is to make shoe
            shopping an enjoyable experience for everyone.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="subtitle1" align="center" color="inherit">
            Email: contact@shoestore.com
            <br />
            Phone: +1 555 555 5555
            <br />
            Address: 123 Main Street, Anytown USA
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Follow Us
          </Typography>
          <Typography variant="subtitle1" align="center" color="inherit">
            <a href="#" className={classes.link}>
              Facebook
            </a>
            <br />
            <a href="#" className={classes.link}>
              Twitter
            </a>
            <br />
            <a href="#" className={classes.link}>
              Instagram
            </a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
