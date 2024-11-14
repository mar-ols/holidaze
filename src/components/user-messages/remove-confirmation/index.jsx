import {
  DangerButton,
  CtaButton,
} from "../../../styles/styled-components/buttons";
import { Modal } from "react-bootstrap";
import { StyledModal } from "../../../styles/styled-components/forms";

/* eslint-disable react/prop-types */

function DeleteConfirmationModal({ showDeleteConfirm, onClose, onConfirm }) {
  return (
    <StyledModal show={showDeleteConfirm} onHide={onClose}>
      <Modal.Header closeButton />
      <Modal.Title>Are you sure you want to delete?</Modal.Title>
      <Modal.Body className="text-center">
        <DangerButton onClick={onConfirm}>Yes</DangerButton>{" "}
        <CtaButton onClick={onClose}>No</CtaButton>
      </Modal.Body>
    </StyledModal>
  );
}

export { DeleteConfirmationModal };
