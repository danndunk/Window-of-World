import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";

import { API } from "../../config/api";

export default function ListBookHome() {
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

  const [modalShow, setModalShow] = useState(false);
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
              <Button
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={() => setModalShow(true)}
              >
                <Card.Img
                  variant="top"
                  src={data.bookCover}
                  style={{ borderRadius: "10px", height: "300px" }}
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
              </Button>
              <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <p
                  className="text-danger"
                  style={{
                    margin: "10px auto",
                    fontSize: "24px",
                    color: "#29BD11",
                  }}
                >
                  please make a payment to read the latest books
                </p>
              </Modal>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
