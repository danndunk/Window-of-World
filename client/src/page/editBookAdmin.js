import NavbarComponent from "../components/admin/navBar";
import FormEditBook from "../components/admin/formEditBook";
import { Container } from "react-bootstrap";

export default function EditBookPage() {
  return (
    <Container fluid>
      <NavbarComponent />
      <FormEditBook />
    </Container>
  );
}
