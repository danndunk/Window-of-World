import { Form, Button, Modal, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// import { UserContext } from "../../context/userContext";
// import { useContext } from "react";
import { useState } from "react";
import cssModules from "./sign.module.css";

import { API } from "../../config/api";

function FormSignUp(props) {
  const { setIsRegister } = props;
  // const navigate = useNavigate();

  const switchToSignIn = () => {
    setIsRegister(true);
  };

  // const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const { email, password, fullname } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);
      console.log(response);

      if (response.data.status == "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Modal {...props} centered aria-labelledby="contained-modal-title-vcenter">
      <Form onSubmit={handleOnSubmit} style={{ margin: "0px auto" }}>
        <p className={cssModules.title}>Sign Up</p>
        {message}
        <Form.Control
          className={cssModules.input}
          id="email"
          value={email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />
        <Form.Control
          className={cssModules.input}
          value={password}
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Form.Control
          className={cssModules.input}
          value={fullname}
          onChange={handleChange}
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Full Name"
        />
        <Button className={cssModules.btnSign} type="submit">
          Sign Up
        </Button>
        <p
          onClick={switchToSignIn}
          className={cssModules.link}
          style={{ cursor: "pointer" }}
        >
          Already have an account ? Klik <strong>Here</strong>
        </p>
      </Form>
    </Modal>
  );
}

export default FormSignUp;
