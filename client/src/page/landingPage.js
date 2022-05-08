import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

import FormSignIn from "../components/user/formSignIn";
import FormSignUp from "../components/user/formSignUp";

import { Container, Button } from "react-bootstrap";

import Logo from "../Assets/Wow.png";
import BookImage from "../Assets/book.png";

export default function LandingPage() {
  const [isRegister, setIsRegister] = useState(null);

  const [show, setShow] = useState(false);

  const switchSignUp = () => {
    setIsRegister(false);
    setShow(true);
  };

  const switchSignIn = () => {
    setIsRegister(true);
    setShow(true);
  };

  return (
    <Container fluid style={{ padding: "0px" }}>
      <div
        style={{
          backgroundColor: "#F2F2F2",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={BookImage}
          className="float-end"
          style={styles.ImageLandingImage}
          alt="imageLanding"
        />
        <div style={styles.containerInfo}>
          <img src={Logo} alt="logo" style={styles.Logo} />
          <p style={styles.paragraph}>
            Sign-up now and subscribe to enjoy all the cool and latest books -
            The best book rental service provider in Indonesia
          </p>
          <div style={styles.btnGroup}>
            <Button
              onClick={switchSignUp}
              className="btn btn-login px-5 me-5"
              style={{ background: "#D60000" }}
            >
              Sign Up
            </Button>
            <Button
              onClick={switchSignIn}
              className="btn btn-login px-5"
              style={{ background: "#CDCDCD", border: "none", color: "black" }}
            >
              Sign In
            </Button>
          </div>
        </div>
        {isRegister ? (
          <FormSignIn
            show={show}
            onHide={() => setShow(false)}
            setIsRegister={setIsRegister}
          />
        ) : (
          <FormSignUp
            show={show}
            onHide={() => setShow(false)}
            setIsRegister={setIsRegister}
          />
        )}
      </div>
    </Container>
  );
}

const styles = {
  ImageLandingImage: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  containerInfo: {
    position: "absolute",
    width: "30%",
    marginTop: "80px",
    marginLeft: "102px",
  },
  Logo: {
    width: "95%",
  },
  paragraph: {
    marginTop: "32px",
    marginBottom: "90px",
    fontSize: "24px",
  },
  btnGroup: {
    display: "flex",
  },
};
