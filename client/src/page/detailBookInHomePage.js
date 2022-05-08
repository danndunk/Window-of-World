import { Container } from "react-bootstrap";
import DetailBookInHome from "../components/user/detailBookInHomeList";
import SideBar from "../components/user/sideBar";

export default function DetailBookInHomePage() {
  return (
    <Container fluid style={{ backgroundColor: "#F2F2F2" }}>
      <div className="d-flex">
        <SideBar />
        <div style={{ width: "75%", marginLeft: "50px" }}>
          <DetailBookInHome />
        </div>
      </div>
    </Container>
  );
}
