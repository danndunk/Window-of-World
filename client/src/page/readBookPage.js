import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ReactReader } from "react-reader";

import { Container, Navbar } from "react-bootstrap";
import Logo from "../Assets/Wow.png";

import { API } from "../config/api";

export default function ReadBookPage() {
  let { id } = useParams();
  const [book, setBook] = useState(null);

  const getBook = async (id) => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data.data.book.bookFile);
    } catch (error) {
      console.log(error);
    }
  };

  const [location, setLocation] = useState(null);
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  useEffect(() => {
    getBook(id);
  }, []);

  return (
    <Container fluid style={{ backgroundColor: " #F2F2F2" }}>
      <Navbar>
        <Container style={{ marginTop: "15px" }}>
          <Navbar.Brand as={Link} to="/home">
            <img src={Logo} alt="" style={styles.logo} />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div style={styles.containerEpub}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={book}
          showToc={false}
        />
      </div>
    </Container>
  );
}

const styles = {
  logo: {
    width: "105.03px",
    transform: "rotate(-13.38deg)",
  },
  content: {
    margin: "50px 0px 30px 0px",
    width: "100%",
  },
  containerEpub: {
    height: "100vh",
    margin: "50px 10px 10px 10px",
  },
};
