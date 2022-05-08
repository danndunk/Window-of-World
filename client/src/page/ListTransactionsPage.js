import NavbarComponent from "../components/admin/navBar";
import TableTransaction from "../components/admin/tableTransactions";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import { Container } from "react-bootstrap";

export default function ListTransactionsPage() {
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
      <TableTransaction />
    </Container>
  );
}
