import React from "react";

import { Form, Button } from "react-bootstrap";

export default function FormProfile() {
  const styles = {
    input: {
      backgroundColor: "rgba(210, 210, 210, 0.25)",
    },
    button: {
      float: "right",
      background: "#FF0000",
      borderRadius: "5px",
      border: "none",
      fontWeight: "400",
    },
  };

  return (
    <div
      style={{ width: "70%", height: "100vh", margin: "100px auto 30px auto" }}
    >
      <Form>
        <h3 className="mb-5">Add Book</h3>
        <Form.Control
          name="title"
          type="Email"
          placeholder="Title"
          className="mb-4"
          style={styles.input}
        />
        <Form.Control
          name="publicationDate"
          type="text"
          placeholder="Publication Date"
          className="mb-4"
          style={styles.input}
        />
        <Form.Control
          name="pages"
          type="number"
          placeholder="Pages"
          className="mb-4"
          style={styles.input}
        />
        <Form.Control
          name="author"
          type="text"
          placeholder="Author"
          className="mb-4"
          style={styles.input}
        />

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control name="bookFile" type="file" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={styles.button}
          className="d-flex justify-content-end align-items-center"
        >
          Add Book
          <i
            className="bi bi-journal-arrow-up"
            style={{ marginLeft: "8px", fontSize: "20px" }}
          ></i>
        </Button>
      </Form>
    </div>
  );
}
