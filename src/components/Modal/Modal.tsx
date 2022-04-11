import React from "react";

interface ModalProps {
  isActive: boolean;
  setInactive: () => void;
  switchMode: () => void;
}

const Modal = (props: ModalProps) => {
  const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLButtonElement).value;
    if (value === "switch") {
      props.switchMode();
    }
    props.setInactive();
  };
  return (
    <div className={`modal ${props.isActive && "is-active"}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Warning!</p>
          <button
            onClick={closeModal}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          The timer is still running, are you sure you want to switch?
        </section>
        <footer className="modal-card-foot">
          <button
            value="switch"
            onClick={closeModal}
            className="button is-warning"
          >
            Switch mode
          </button>
          <button onClick={closeModal} className="button is-info">
            Cancel
          </button>
        </footer>
      </div>
      <button
        onClick={closeModal}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
