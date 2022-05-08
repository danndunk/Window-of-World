import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import LandingPage from "./page/landingPage";
import HomePage from "./page/homePage";
import SubscribePage from "./page/subscribePage";
import ProfilePage from "./page/profilePage";
import AddBookPage from "./page/addBookPage";
import ListBooksAdmin from "./page/listBooksAdmin";
import ReadBookPage from "./page/readBookPage";
import EditBookPage from "./page/editBookAdmin";
import DetailBookInUserPage from "./page/detailBookInUserPage";
import DetailBookInHomePage from "./page/detailBookInHomePage";
import ListTransactionsPage from "./page/ListTransactionsPage";
import FormProfile from "./components/user/formEditProfile";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (!state.isLogin) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/list-transaction");
      } else if (state.user.role === "user") {
        navigate("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      return dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/subscribe" element={<SubscribePage />} />
        <Route exact path="/read-book/:id" element={<ReadBookPage />} />
        <Route exact path="/add-book" element={<AddBookPage />} />
        <Route exact path="/edit-book/:id" element={<EditBookPage />} />
        <Route exact path="/list-books" element={<ListBooksAdmin />} />
        <Route exact path="/edit-profile" element={<FormProfile />} />
        <Route
          exact
          path="/detail-book-user/:id"
          element={<DetailBookInUserPage />}
        />
        <Route
          exact
          path="/detail-book-list/:id"
          element={<DetailBookInHomePage />}
        />
        <Route
          exact
          path="/list-transaction"
          element={<ListTransactionsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
