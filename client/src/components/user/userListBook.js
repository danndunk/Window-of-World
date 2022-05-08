import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { API } from "../../config/api";
import { useState, useEffect } from "react";

export default function UserListBook() {
  const [books, setBooks] = useState([]);

  const getListBook = async () => {
    try {
      const response = await API.get("/list-user");

      console.log(response.data.data);
      setBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListBook();
  }, []);

  return (
    <div style={{ marginTop: "51px" }}>
      <h2>List Book</h2>
      <Row style={{ marginTop: "45px" }}>
        {books.map((data, index) => (
          <Col md={3} key={index}>
            <Card
              style={{
                width: "14rem",
                border: "none",
                margin: "0px auto",
                backgroundColor: "#F2F2F2",
              }}
            >
              <Link
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "none",
                }}
                to={`/detail-book-user/` + data.id}
              >
                <Card.Img
                  variant="top"
                  src={data.bookCover}
                  style={{
                    borderRadius: "10px",
                    widht: "100%",
                    maxHeight: "300px",
                  }}
                />
                <Card.Body
                  style={{
                    color: "black",
                    paddingLeft: "0px",
                    textAlign: "left",
                  }}
                >
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>{data.author}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
