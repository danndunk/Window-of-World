import React from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/justwow.png";

import { API } from "../../config/api";

export default function FormSub(props) {
  const [state, _] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    idUser: "",
    transferProof: "",
  });

  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set(
        "transferProof",
        form.transferProof[0],
        form.transferProof[0].name
      );
      formData.set("idUser", state.user.id);

      const response = await API.post("/transaction", formData, config);

      if (response.data.status === "success") {
        setModalShow(true);
      } else {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setModalShow(false);
    navigate("/home");
  };

  return (
    <div
      style={{
        ...styles.containerForm,
        fontFamily: "avenir",
        fontSize: "18px",
      }}
    >
      <Form onSubmit={handleOnSubmit}>
        <p
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontWeight: "900",
            fontSize: "36px",
          }}
        >
          Premium
        </p>
        <p
          style={{
            textAlign: "center",
            fontFamily: "Avenir",
          }}
        >
          Pay now and access all the latest books from
          <img
            src={Logo}
            alt="logo"
            style={{ ...styles.logo, marginLeft: "5px" }}
          />
        </p>
        <p
          style={{
            textAlign: "center",
            fontWeight: "900",
            fontFamily: "avenir",
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ ...styles.logo, marginRight: "5px" }}
          />
          : 0981312323
        </p>
        <Form.Control
          type="number"
          onChange={handleChange}
          name="accNumber"
          placeholder="Input your account number"
          className="mb-3 mt-4"
          style={{ background: "#BCBCBC40" }}
        />
        <Form.Group className="mb-3">
          <Form.Control
            onChange={handleChange}
            type="file"
            name="transferProof"
            id="image"
            style={{ boxSixing: "border-box" }}
          />
        </Form.Group>
        {preview && (
          <div className="d-flex justify-content-center">
            <img
              src={preview}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                objectFit: "cover",
                margin: "10px 0px",
              }}
              alt="preview"
            />
          </div>
        )}
        {message}
        <Button variant="primary" type="submit" style={styles.button}>
          Submit
        </Button>
      </Form>

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Button
          onClick={handleOnClick}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "24px",
              color: "#29BD11",
            }}
          >
            Thank you for subscribing to premium, your premium package will be
            active after our admin approves your transaction, thank you
          </p>
        </Button>
      </Modal>
    </div>
  );
}

const styles = {
  containerForm: {
    margin: "auto",
  },
  inputFile: {
    cursor: "pointer",
    border: "1px solid #BCBCBC",
    color: "#D60000",
    fontWeight: "900",
    width: "400px",
    height: "40px",
    boxSizing: "borderBox",
    borderRadius: "4px",
    backgroundColor: "#BCBCBC40",
    paddingLeft: "14px",
  },
  button: {
    width: "100%",
    background: "#D60000",
    borderRadius: "5px",
    fontWeight: "600",
    marginTop: "35px",
  },
  logo: {
    width: "45px",
  },
};
