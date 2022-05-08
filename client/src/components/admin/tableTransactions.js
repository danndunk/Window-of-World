import { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

import { API } from "../../config/api";

export default function TableTransaction() {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      setTransactions(response.data.data.transactions);
      console.log(response.data.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const handleApproved = async (id) => {
    try {
      const update = await API.patch(
        "/transaction/" + id,
        { paymentStatus: "Approved" },
        config
      );
      console.log(update);

      const response = await API.get("/transactions");
      setTransactions(response.data.data.transactions);
      console.log(response);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const update = await API.patch(
        "/transaction/" + id,
        { paymentStatus: "Cancel" },
        config
      );

      console.log(update);

      const response = await API.get("/transactions");
      setTransactions(response.data.data.transactions);

      console.log(response);

      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "70%", margin: "180px auto 130px auto" }}>
      <h3 className="mb-5">Incoming Transaction</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr style={{ textAlign: "center", color: "red" }}>
            <th>No</th>
            <th>Users</th>
            <th>Bukti Transfer</th>
            <th>Remaining Active</th>
            <th>Status User</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((data) => (
            <tr>
              <td>{data.id}</td>
              <td>{data.user.fullname}</td>
              <td>{data.transferProof}</td>
              <td>{data.remainingActive} / Hari</td>
              <td>{data.userStatus}</td>
              <td>{data.paymentStatus}</td>
              <td>
                <Dropdown style={{ textAlign: "center" }}>
                  <DropdownToggle
                    id="input-group-dropdown-1"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "blue",
                    }}
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleApproved(data.id)}>
                      Approved
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCancel(data.id)}>
                      Cancel
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
