import React from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/user/sideBar";
import HomeContent from "../components/user/homeContent";

export default function HomePage() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  console.log(state);

  const checkLogin = () => {
    if (state.isLogin === false) {
      navigate("/");
    }
  };
  checkLogin();

  return (
    <Container fluid style={{ backgroundColor: "#F2F2F2" }}>
      <div className="d-flex">
        <SideBar />
        <div style={{ marginTop: "60px" }}>
          <HomeContent />
        </div>
      </div>
    </Container>
  );
}
