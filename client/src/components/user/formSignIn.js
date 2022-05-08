import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useState } from "react";

import { API } from "../../config/api";

import cssModules from "./sign.module.css";

function FormSignIn(props) {
  const { setIsRegister } = props;
  const switchToSignUp = () => {
    setIsRegister(false);
  };
  const navigate = useNavigate();

  const [_, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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

      const response = await API.post("/login", body, config);
      console.log(response.data);

      if (response?.data.status === "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.role === "admin") {
          navigate("/list-transaction");
        } else {
          navigate("/home");
        }
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal {...props} centered aria-labelledby="contained-modal-title-vcenter">
      <Form onSubmit={handleOnSubmit} style={{ margin: "0px auto" }}>
        <p className={cssModules.title}>Sign In</p>
        {message}
        <Form.Control
          className={cssModules.input}
          onChange={handleChange}
          value={email}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        <Form.Control
          className={cssModules.input}
          onChange={handleChange}
          value={password}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button className={cssModules.btnSign} type="submit">
          Sign In
        </Button>
        <p
          onClick={switchToSignUp}
          className={cssModules.link}
          style={{ cursor: "pointer" }}
        >
          Don't have an account ? Klik <strong>Here</strong>
        </p>
      </Form>
    </Modal>
  );
}

export default FormSignIn;
