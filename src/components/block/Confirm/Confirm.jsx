import React from "react";
import { ReactDOM } from "react";
import Modal from "react-modal";

import "./Confirm.css";

export default function Confirm({
  isOpen,
  onConfirm,
  onCancel,
  modalTitle,
  modalBody,
}) {
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");
  let subtitle;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h3 className="modal__title">{modalTitle}</h3>
      <p className="modal__body">{modalBody}</p>
      <div className="modal__actions">
        <button className="modal__cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal__confirm" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
