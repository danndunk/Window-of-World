import NavbarComponent from "../components/admin/navBar";
import ModalDelete from "../components/admin/modalDelete";

import { Container, Button } from "react-bootstrap";

import { API } from "../config/api";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ListBooksAdmin() {
  const navigate = useNavigate();
  const [books, setBooks] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);

  const getBooks = async () => {
    try {
      const response = await API.get("/books");
      console.log(response.data.data);
      setBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleEdit = (id) => {
    navigate("/edit-book/" + id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  return (
    <Container fluid>
      <NavbarComponent />
      <div style={styles.containerList}>
        {books?.map((item, index) => (
          <div
            className="d-flex justify-content-between align-items-center"
            style={styles.list}
            key={index}
          >
            <div>
              <img src={item.bookCover} alt="Cover" style={styles.cover} />
              <p style={styles.title}>{item.title}</p>
            </div>
            <div>
              <Button
                variant="secondary"
                className="me-3"
                style={styles.btn}
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                style={styles.btn}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ModalDelete show={show} setShow={setShow} deleteId={deleteId} />
    </Container>
  );
}

const styles = {
  containerList: {
    width: "70%",
    margin: "180px auto 130px auto",
  },
  list: {
    padding: "10px",
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
  },
  cover: {
    maxWidth: "50px",
    marginRight: "15px",
  },
  title: {
    display: "inline",
    fontWeight: "bold",
    fontSize: "20px",
  },
  btn: {
    width: "80px",
  },
};
