import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

import { API } from "../../config/api";

export default function ListBookHomePremium() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await API.get("/books");
      setBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div style={{ marginTop: "51px" }}>
      <p
        style={{
          fontSize: "36px",
          fontFamily: "Times New Roman",
          fontWeight: "bold",
        }}
      >
        List Book
      </p>
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
                to={`/detail-book-list/` + data.id}
                style={{ textDecoration: "none" }}
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
                  <Card.Title
                    style={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    {data.title}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontFamily: "Avenir",
                      fontSize: "18px",
                      color: "#929292",
                    }}
                  >
                    {data.author}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
