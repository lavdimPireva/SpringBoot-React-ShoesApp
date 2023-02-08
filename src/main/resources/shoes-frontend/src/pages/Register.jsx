import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, surname, email, password, phoneNumber);
    // Add your own code here to handle the form submission and register a new user

    const newUser = {
      name: name,
      surname: surname,
      email: email,
      password: password,
    };

    console.log("User", newUser);

    axios
      .post("http://localhost:8080/api/v1/auth/register", newUser)
      .then((res) => {
        if (res.status === 200) {
          console.log("User registered successfully");
          localStorage.setItem("token", res.data.token);

          console.log(localStorage);

          setPassword("");

          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error registering user:", err);
      });
  };

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.main}>
        <Container component="main" maxWidth="xs">
          <Box mt={5}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="surname"
                label="Surname"
                name="surname"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Box mt={2}>
                <Typography variant="body2">
                  Already have an account? <Link to="/login">Login</Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
