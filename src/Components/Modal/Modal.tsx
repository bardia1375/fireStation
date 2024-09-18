import React from "react";
import "./style.css"; // Import the CSS file for animations

// Reusable Modal component
const Modal = ({ showModal, closeModal, title, children, Submit, footer }) => {
  if (!showModal) return null;

  return (
    <div className={`modal-backdrop ${showModal ? "fade-in" : "fade-out"}`}>
      <div
        style={{ width: "20%" }}
        className={`modal-content ${showModal ? "slide-in" : "slide-out"}`}
      >
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        {footer}
      </div>
    </div>
  );
};

export default Modal;
