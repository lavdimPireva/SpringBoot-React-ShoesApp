import React from "react";
import { Typography } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

const WelcomeDescription = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 768px)");

  const shoesImage =
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fA%3D%3D&w=1000&q=80";

  return (
    <>
      <Typography
        variant={isTabletOrMobile ? "h5" : "h1"}
        align="center"
        color="primary"
      >
        {/* Shoes shop{" "} */}
      </Typography>
      <Typography
        variant={isTabletOrMobile ? "body2" : "body1"}
        align="center"
        color="textSecondary"
      >
        Browse our wide selection of shoes, find the perfect pair for you, and
        make a purchase today!
      </Typography>
      <div style={{ position: "relative", height: "300px", width: "1000px" }}>
        <Fade
          in={true}
          timeout={1000}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${shoesImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
              width: "1000px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
              position: "relative",
              marginLeft: 76,
            }}
          ></div>
        </Fade>
      </div>
    </>
  );
};

export default WelcomeDescription;
