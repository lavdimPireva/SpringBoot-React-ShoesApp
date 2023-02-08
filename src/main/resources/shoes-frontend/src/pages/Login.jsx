import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FooterContainer = styled.footer`
  margin-top: auto;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Username: ", username);
    console.log("Password: ", password);

    const loggedUser = {
      email: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/api/v1/auth/login", loggedUser)
      .then((res) => {
        if (res.status === 200) {
          console.log("User login successfully");
          localStorage.setItem("token", res.data.token);

          console.log(localStorage);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error registering user:", err);
      });
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Container component="main" maxWidth="xs">
          <Box mt={5}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
            <Link to="/register">Don't have an account? Register here.</Link>
          </Box>
        </Container>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </PageContainer>
    </>
  );
};

export default Login;
