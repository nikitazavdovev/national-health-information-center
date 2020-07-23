import React from "react";
import ReactModal from 'react-modal';

import './Modal.css';

const Modal = (props) => {

  const modalStyle = {
    overlay: {
      zIndex: 998,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'auto'
    }
  };

  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={props.modalIsOpen}
      style={modalStyle}
      className='modal'
      onRequestClose={() => props.closeModal()}
    >
      {props.children}
    </ReactModal>
  )
};

export default Modal;