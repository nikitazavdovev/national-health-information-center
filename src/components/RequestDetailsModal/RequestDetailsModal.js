import React from "react";

import './RequestDetailsModal.css';
import Modal from "../Modal/Modal";
import {closeRequestDetailsModal} from "../../store/actions";
import {connect} from "react-redux"

const RequestDetailsModal = ({isModalOpen, closeModal, code}) => {

  if(!isModalOpen) return null;

  return (
    <Modal modalIsOpen={isModalOpen} closeModal={closeModal}>
      <div className='modal__header'>
        View Code Matches
        <button className='modal__close' onClick={closeModal}>X</button>
      </div>
      <div className="modal__body">
          <div>
            <h3 className='code-matches__header'>
              Matched national terminology descriptions
            </h3>
            <ul className='code-matches__list'>
              {code.data.matchDescription.map(item => (
                <li
                  key={item.description}
                  className={`code-matches__list-item ${code.data.nationalCodeId === item.id ? 'selected' : ''}`}
                >
                  <span><b>{item.id}</b> {item.description} - {item.match} match</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isRequestDetailsModalOpen
  }
};

const mapDispatchToProps = {
  closeModal: closeRequestDetailsModal
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetailsModal);