import React from "react";
import { Container } from "react-bootstrap";

import SideBar from "../components/user/sideBar";

import ContainerProfile from "../components/user/containerProfile";
import UserListBook from "../components/user/userListBook";

export default function ProfilePage() {
  const title = "Profile";
  return (
    <Container fluid style={{ backgroundColor: "#F2F2F2" }}>
      <div className="d-flex">
        <SideBar title={title} />
        <div style={{ marginTop: "60px" }}>
          <ContainerProfile />
          <UserListBook />
        </div>
      </div>
    </Container>
  );
}
