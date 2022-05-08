import NavbarComponent from "../components/admin/navBar";
import FormAddBook from "../components/admin/formAddBook";
import { Container } from "react-bootstrap";

import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function AddBookPage() {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (state.isLogin === false) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Container fluid>
      <NavbarComponent />
      <FormAddBook />
    </Container>
  );
}
