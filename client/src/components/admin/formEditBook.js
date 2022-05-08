import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { API } from "../../config/api";

export default function FormEditBook() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    author: "",
    pages: "",
    isbn: "",
    about: "",
    bookFile: "",
    bookCover: "",
  });

  const getData = async (id) => {
    try {
      const response = await API.get("/book/" + id);
      console.log(response.data.data.book);

      setForm({
        title: response.data.data.book.title,
        publicationDate: response.data.data.book.publicationDate,
        author: response.data.data.book.author,
        pages: response.data.data.book.pages,
        isbn: response.data.data.book.isbn,
        about: response.data.data.book.about,
      });

      setPreview(response.data.data.book.bookCover);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (
      e.target.type === "file" &&
      e.target.files[0].type !== "application/epub+zip"
    ) {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("author", form.author);
      formData.set("pages", form.pages);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      if (form.bookFile) {
        formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);
      }
      if (form.bookCover) {
        formData.set("bookCover", form.bookCover[0], form.bookCover[0].name);
      }

      const response = await API.patch("/book/" + id, formData, config);

      if (response.data.status === "success") {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Success Add Book
          </Alert>
        );
        setMessage(alert);
        window.location.reload();
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "70%", margin: "180px auto 130px auto" }}>
      <Form onSubmit={handleOnSubmit}>
        <h3 className="mb-5">Add Book</h3>
        <Form.Control
          value={form.title}
          onChange={handleChange}
          name="title"
          type="text"
          placeholder="Title"
          className="mb-4"
          style={styles.input}
          required
        />
        <Form.Control
          value={form.publicationDate}
          onChange={handleChange}
          name="publicationDate"
          type="date"
          placeholder="Publication Date"
          className="mb-4"
          style={styles.input}
          required
        />
        <Form.Control
          value={form.pages}
          onChange={handleChange}
          name="pages"
          type="number"
          placeholder="Pages"
          className="mb-4"
          style={styles.input}
          required
        />
        <Form.Control
          value={form.author}
          onChange={handleChange}
          name="author"
          type="text"
          placeholder="Author"
          className="mb-4"
          style={styles.input}
          required
        />
        <Form.Control
          value={form.isbn}
          onChange={handleChange}
          name="isbn"
          type="text"
          placeholder="ISBN"
          className="mb-4"
          style={styles.input}
          required
        />
        <Form.Control
          value={form.about}
          onChange={handleChange}
          name="about"
          as="textarea"
          rows={5}
          placeholder="About This Book"
          className="mb-4"
          style={{ ...styles.input, resize: "none" }}
          required
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={styles.label}>
            Book File <b>(.epub)</b>
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            name="bookFile"
            type="file"
            required
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={styles.label}>
            Book Cover <b>(.jpg/.png/.jpeg)</b>
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            name="bookCover"
            type="file"
            required
          />
        </Form.Group>
        {preview && (
          <div className="d-flex justify-content-center">
            <img
              src={preview}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                objectFit: "cover",
                margin: "10px 0px",
              }}
              alt="preview"
            />
          </div>
        )}
        {message}
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
    marginTop: "30px",
  },
  label: {
    fontSize: "18px",
  },
};
