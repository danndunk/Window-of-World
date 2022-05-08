import SideBar from "../components/user/sideBar";
import { Container } from "react-bootstrap";
import DetailBookInUser from "../components/user/detailBookInUserList";

export default function DetailBookInUserPage() {
  return (
    <Container fluid style={{ backgroundColor: "#F2F2F2" }}>
      <div className="d-flex">
        <SideBar />
        <div style={{ width: "75%", marginLeft: "50px" }}>
          <DetailBookInUser />
        </div>
      </div>
    </Container>
  );
}
