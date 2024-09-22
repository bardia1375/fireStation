import React from "react";
import "./style.css"; // Import the CSS file for animations

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
  Submit?: () => void;
  footer?: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  closeModal,
  title,
  children,
  footer,
  width = "500px",
}) => {
  if (!showModal) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal(); // Close modal when clicking outside the modal content
    }
  };

  return (
    <div
      style={{ zIndex: 1000 }}
      className={`modal-backdrop ${showModal ? "fade-in" : "fade-out"}`}
      onClick={handleBackdropClick}
    >
      <div
        style={{ width, zIndex: 1000, maxHeight: "600px", overflow: "auto" }}
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
