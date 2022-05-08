import React from "react";
import { Container } from "react-bootstrap";

import SideBar from "../components/user/sideBar";
import FormSub from "../components/user/formSub";

export default function SubscribePage() {
  const title = "Subscribe";

  return (
    <Container fluid style={{ backgroundColor: "#F2F2F2" }}>
      <div className="d-flex ">
        <SideBar title={title} />
        <div style={{ margin: "auto" }}>
          <FormSub />
        </div>
      </div>
    </Container>
  );
}
