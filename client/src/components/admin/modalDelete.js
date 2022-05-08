import { Modal, Button } from "react-bootstrap";
import { API } from "../../config/api";

export default function ModalDelete(props) {
  const handleClose = () => {
    props.setShow(false);
  };

  const handleDelete = async () => {
    try {
      const response = await API.delete("/book/" + props.deleteId);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>Are you sure want to delete this book ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
