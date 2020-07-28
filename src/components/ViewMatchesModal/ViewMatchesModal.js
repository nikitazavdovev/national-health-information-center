import React, {useEffect, useState} from "react";

import './ViewMatchesModal.css';
import Modal from "../Modal/Modal";
import {
  closeViewMatchesModal,
  sendTerminologyCodeForApproval,
  addPendingRequest,
  updatePendingRequest
} from "../../store/actions";
import {connect} from "react-redux"
import Button from "../Button/Button";
import {useHistory} from "react-router-dom";

const ViewMatchesModal = ({isModalOpen, closeModal, codeData, terminologyData, sendForApproval, user, addPendingRequest, requestType, updateRequest, code}) => {
  const [selectedDescription, setSelectedDescription] = useState('');
  let history = useHistory();

  useEffect(() => {
    if(codeData) {
      setSelectedDescription(codeData.matchDescription.find(descr => descr.id === codeData.nationalCodeId))
    }
  }, [codeData]);


  if(!isModalOpen) return null;

  const isCodeEditable = user.role !== 'reviewer' && codeData.activationStatus !== 2;

  const activateCode = () => {
    const codeForApproval = {
      ...code,
      user: user,
      requestType: {code: 1, message: 'Mapping Approval'},
      payload: {
        terminologyName: terminologyData.terminologyName,
        terminologyId: terminologyData.terminologyId,
        data: {
          ...codeData,
          nationalCodeId: selectedDescription.id,
          nationalCodeDescription: selectedDescription.description
        },
        previousData: codeData.activationStatus === 1 ? codeData : null
      }
    };
    if (requestType === 'repeat') {
      updateRequest({
        ...codeForApproval,
        message: null
      });
      closeModal();
      history.push('/pending-requests')
    } else {
      sendForApproval(codeForApproval);
      addPendingRequest(codeForApproval);
      closeModal()
    }
  };

  const infoBlockMessage = user.role === 'reviewer' ? 'You do not have access rights to select code matches' : 'You cannot change your selection until the code is under review';

  return (
    <Modal modalIsOpen={isModalOpen} closeModal={closeModal}>
      <div className='modal__header'>
        View Code Matches
        <button className='modal__close' onClick={closeModal}>X</button>
      </div>
      <div className="modal__body">
        {!isCodeEditable && <div className="modal__info-block">{infoBlockMessage}</div>}
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
                  <button onClick={() => setSelectedDescription(item)} disabled={!isCodeEditable}>
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
          <Button onClick={activateCode} disabled={!isCodeEditable}>Send for Approval</Button>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isViewMatchesModalOpen,
    codeData: state.modal.viewMatchesModalData.codeData,
    terminologyData: state.modal.viewMatchesModalData.terminologyData,
    user: state.user,
    requestType: state.modal.viewMatchesModalData.requestType,
    code: state.modal.viewMatchesModalData.code
  }
};

const mapDispatchToProps = {
  closeModal: closeViewMatchesModal,
  sendForApproval: sendTerminologyCodeForApproval,
  addPendingRequest: addPendingRequest,
  updateRequest: updatePendingRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMatchesModal);