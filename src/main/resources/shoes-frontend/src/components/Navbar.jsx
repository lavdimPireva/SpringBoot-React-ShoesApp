import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/");
  };

  const handleClick2 = (id) => {
    navigate("/cart");
  };

  const handleClick3 = (id) => {
    navigate("/login");
  };

  const handleClick4 = (id) => {
    navigate("/register");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#ff5733" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            Shoe Store
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            Home
          </Button>
          <Button color="inherit" onClick={handleClick2}>
            Orders
          </Button>
          <Button color="inherit" onClick={handleClick3}>
            Login
          </Button>
          <Button color="inherit" onClick={handleClick4}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
