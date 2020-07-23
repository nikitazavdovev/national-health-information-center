import React, {useEffect, useState} from "react";

import './ViewMatchesModal.css';
import Modal from "../Modal/Modal";
import {closeViewMatchesModal, sendTerminologyCodeForApproval, addNotification} from "../../store/actions";
import {connect} from "react-redux"
import Button from "../Button/Button";

const ViewMatchesModal = ({isModalOpen, closeModal, codeData, userRole, sendForApproval, addNotification}) => {
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    if(codeData) {
      setSelectedDescription(codeData.matchDescription.find(descr => descr.id === codeData.nationalCodeId))
    }
  }, [codeData]);

  const activateCode = () => {
    sendForApproval({
      ...codeData,
      nationalCodeId: selectedDescription.id,
      nationalCodeDescription: selectedDescription.description
    });
    addNotification();
    closeModal()
  };

  if(!isModalOpen) return null;

  return (
    <Modal modalIsOpen={isModalOpen} closeModal={closeModal}>
      <div className='modal__header'>
        View Code Matches
        <button className='modal__close' onClick={closeModal}>X</button>
      </div>
      <div className="modal__body">
        <div className='code-matches'>
          <div className='code-matches__local'>
            <h3 className='code-matches__header'>
              Local code description
            </h3>
            <p className='code-matches__local-description'>
              {codeData.localCodeDescription}
            </p>
          </div>
          <div className='code-matches__national'>
            <h3 className='code-matches__header'>
              Matched national terminology descriptions
            </h3>
            <ul className='code-matches__list'>
              {codeData.matchDescription.map(item => (
                <li
                  key={item.description}
                  className={`code-matches__list-item ${selectedDescription.description === item.description ? 'selected' : ''}`}
                >
                  <button onClick={() => setSelectedDescription(item)}>
                    {item.description} - {item.match} match
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="modal__footer">
        <div className='modal__footer__buttons'>
          <Button light onClick={closeModal}>Cancel</Button>
          <Button onClick={activateCode}>Activate</Button>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isViewMatchesModalOpen,
    codeData: state.modal.viewMatchesModalData,
  }
};

const mapDispatchToProps = {
  closeModal: closeViewMatchesModal,
  sendForApproval: sendTerminologyCodeForApproval,
  addNotification: addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMatchesModal);