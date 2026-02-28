import React from "react";

const Modal = ({ showModal, setShowModal, data }) => {
  const closeModal = () => {
    data = "";
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Hint</h2>
          {data === "" ? <p>Loading...</p> : <p>{data}</p>}
          <button className="close-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
