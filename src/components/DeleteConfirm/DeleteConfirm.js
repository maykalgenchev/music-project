import { Modal, Button } from 'react-bootstrap';

const DeleteConfirm = ({
    show,
    onClose,
    onSave,
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure, that you want to delete this song?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={onSave}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirm;