import Frame from "../../Assets/Frame.png";

import ListBookHome from "../user/listBook";
import ListBookHomePremium from "../user/listBookPremium";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

import { API } from "../../config/api";

function HomeContent() {
  const [state, _] = useContext(UserContext);
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

  return (
    <div>
      <img src={Frame} alt="frame" style={{ width: "100%" }} />

      {status === "Active" || status === "active" ? (
        <ListBookHomePremium />
      ) : (
        <ListBookHome />
      )}
    </div>
  );
}

export default HomeContent;
