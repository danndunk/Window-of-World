import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../config/api";

const styles = {
  book: {
    width: "400px",
    height: "600px",
    borderRadius: "8px",
  },
  title: {
    fontWeight: "700",
    fontSize: "64px",
  },
  author: {
    marginTop: "-10px",
    fontSize: "24px",
    color: "#929292",
  },
  another: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  anotherOne: {
    color: "#929292",
    fontSize: "18px",
  },
  about: {
    fontWeight: "bold",
    fontSize: "30px",
  },
  detail: {
    color: "#929292",
    textAlign: "justify",
  },
};

function DetailBookInHome() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [detail, setDetail] = useState({});
  const getBook = async (id) => {
    try {
      const response = await API.get("/book/" + id);
      setDetail(response.data.data.book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook(id);
  }, []);

  const handleAddList = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.post("/list-user/" + id, config);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadBook = (e) => {
    e.preventDefault();
    navigate("/read-book/" + id);
  };

  return (
    <div style={{ width: "100%", marginBottom: "30px", marginTop: "50px" }}>
      <div className="d-flex">
        <div>
          <img src={detail.bookCover} alt="book cover" style={styles.book} />
        </div>
        <div style={{ marginLeft: "54px" }}>
          <div style={{ marginBottom: "50px" }}>
            <p style={styles.title}>{detail.title}</p>
            <p style={styles.author}>{detail.author}</p>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <p style={styles.another}>Publication Date</p>
            <p style={styles.anotherOne}>{detail.publicationDate}</p>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <p style={styles.another}>Pages</p>
            <p style={styles.anotherOne}>{detail.pages}</p>
          </div>
          <div>
            <p style={{ ...styles.another, color: "red" }}>ISBN</p>
            <p style={styles.anotherOne}>{detail.isbn}</p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "90px" }}>
        <p style={styles.about}>About This Book</p>
        <p style={styles.detail}>{detail.about}</p>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          onClick={handleAddList}
          style={{
            marginRight: "20px",
            background: "#D60000",
            border: "none",
          }}
        >
          Add My Book
          <i class="bi bi-bookmark" style={{ marginLeft: "8px" }}></i>
        </Button>
        <Button
          onClick={handleReadBook}
          style={{ background: "#CDCDCD", border: "none", color: "black" }}
        >
          Read Book
          <i class="bi bi-chevron-right" style={{ marginLeft: "8px" }}></i>
        </Button>
      </div>
    </div>
  );
}

export default DetailBookInHome;
