import React from "react";
import "./style.css"; // Import the CSS file for animations

// Reusable Modal component
const Modal = ({ showModal, closeModal, title, children, Submit, footer,width }) => {
  if (!showModal) return null;

  return (
    <div style={{zIndex:1000}} className={`modal-backdrop ${showModal ? "fade-in" : "fade-out"}`}>
      <div
        style={{ width: width,zIndex:1000 }}
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
