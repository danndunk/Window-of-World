import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";

import Logo from "../../Assets/Wow.png";
import Profile from "../../Assets/blank.jpg";

import { API } from "../../config/api";

export default function SideBar(props) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [status, setStatus] = useState(null);

  const idUser = state.user.id;

  const getTransaction = async (id) => {
    try {
      const response = await API.get("/transaction/" + id);
      setStatus(response.data.data.transaction.userStatus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction(idUser);
  }, []);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });

    navigate("/");
  };

  return (
    <Nav Link className="flex-column" style={styles.Nav}>
      <Nav.Link as={Link} to="/home" style={styles.centerNav}>
        <img
          src={Logo}
          alt="Logo"
          style={{ ...styles.imageLogo, transform: "rotate(-13.38deg)" }}
        />
      </Nav.Link>
      <Nav.Link as={Link} to="/home" style={styles.centerNav}>
        <img src={Profile} alt="profile" style={styles.imageProfile} />
      </Nav.Link>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "900", fontSize: "24px" }}>
          {state.user.fullname}
        </p>
      </div>
      {status === "Active" || status === "active" ? (
        <div
          style={{
            textAlign: "center",
            color: "#29BD11",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          Subscribed
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#D60000",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          Not Subscribed Yet
        </div>
      )}

      <hr style={{ width: "100%" }} />
      <Nav.Link
        as={Link}
        to="/profile"
        style={
          props?.title === "Profile"
            ? { ...styles.linkNavs, marginTop: "55px", color: "red" }
            : { ...styles.linkNavs, marginTop: "55px" }
        }
      >
        <i className="bi bi-person" style={styles.icon}></i>
        Profile
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/subscribe"
        style={
          props?.title === "Subscribe"
            ? { ...styles.linkNavs, marginTop: "85px", color: "red" }
            : { ...styles.linkNavs, marginTop: "85px" }
        }
      >
        <i className="bi bi-cash-coin" style={styles.icon}></i>
        Subscribe
      </Nav.Link>
      <hr style={{ marginTop: "85px" }} />
      <Nav.Link
        as={Link}
        to="/"
        style={{
          ...styles.linkNavs,
          marginTop: "55px",
          marginBottom: "30px",
        }}
        onClick={logout}
      >
        <i className="bi bi-box-arrow-in-left" style={styles.icon}></i>
        Logout
      </Nav.Link>
    </Nav>
  );
}

const styles = {
  Nav: {
    margin: "27px 40px 0px 79px",
  },
  centerNav: {
    textAlign: "center",
  },
  imageLogo: {
    width: "150px",
    marginBottom: "32px",
  },
  imageProfile: {
    width: "120px",
    height: "120px",
    marginBottom: "32px",
    borderRadius: "50%",
  },
  icon: {
    marginRight: "23px",
  },
  linkNavs: {
    fontSize: "23px",
    lineHeight: "101.5%",
    color: "#929292",
    textDecoration: "none",
  },
};
