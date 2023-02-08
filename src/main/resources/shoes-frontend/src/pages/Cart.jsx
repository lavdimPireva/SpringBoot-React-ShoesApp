import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Card,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      maxWidth: "100%",
    },
  },
  total: {
    fontWeight: "bold",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
    height: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
  },
}));

const countries = {
  Albania: [
    "Berat",
    "Durres",
    "Tirana",
    "Elbasan",
    "Shkoder",
    "Vlora",
    "Fier",
    "Korça",
    "Lushnje",
    "Gjirokaster",
  ],
  Kosova: [
    "Prishtina",
    "Mitrovica",
    "Peja",
    "Gjakova",
    "Gjilan",
    "Ferizaj",
    "Drenas",
    "Malisheva",
    "Suhareka",
    "Podujeva",
    "Kamenica",
  ],
};

const Cart = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    country: "",
    city: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItemsFromStorage) {
      setCartItems(cartItemsFromStorage);
      let total = 0;
      cartItemsFromStorage.forEach((item) => {
        total += item.price;
      });
      setTotalPrice(total);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem("cartItems", JSON.stringify([]));
    setCartItems([]);
    setTotalPrice(0);

    const orderDetails = {
      formData: formData,
      cartItems: cartItems,
    };
    console.log(orderDetails);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders",
        orderDetails
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    toast("Porosia juaj eshte regjistruar me sukses! Faleminderit", {
      type: "success",
    });

    handleClose();
  };

  const removeItem = (item) => {
    const updatedCartItems = cartItems.filter((i) => i !== item);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    let total = 0;
    updatedCartItems.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  };

  const CitySelect = () => {
    const cityOptions = countries[formData.country] || [];
    return (
      <FormControl margin="normal" fullWidth>
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        >
          {cityOptions.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Your orders
        </Typography>
        <List component="nav" aria-label="main mailbox folders">
          {cartItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem button>
                <ListItemText
                  primary={item.name}
                  secondary={item.selectedSeries}
                />
                <Box ml="auto">
                  <Typography variant="body2">€{item.price}</Typography>
                  <Button onClick={() => removeItem(item)}>Largo</Button>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Typography className={classes.total} variant="h6" gutterBottom>
            Total: €{totalPrice}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" p={2} onClick={handleOpen}>
          <Button
            type="submit"
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Porosit
          </Button>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Card className={classes.paper}>
              <Typography variant="h6">Sheno te dhenat tuaja</Typography>
              <Divider />
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  label="Name"
                  name="name"
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  margin="normal"
                  label="Surname"
                  name="surname"
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  margin="normal"
                  label="Address"
                  name="address"
                  onChange={handleInputChange}
                  fullWidth
                />
                <FormControl margin="normal" fullWidth>
                  <InputLabel id="country-select-label">Country</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Albania">Albania</MenuItem>
                    <MenuItem value="Kosova">Kosova</MenuItem>
                  </Select>
                </FormControl>
                <CitySelect />
                <TextField
                  margin="normal"
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  fullWidth
                />
                <Box display="flex" justifyContent="center" p={2}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "blue", color: "white" }}
                  >
                    Porosit
                  </Button>
                </Box>
              </form>
            </Card>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Cart;
