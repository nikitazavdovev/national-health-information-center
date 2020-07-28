import React, {useState} from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {closeDeclineRequestModal, updatePendingRequest} from "../../store/actions";
import {connect} from "react-redux";
import {useAlert} from "react-alert";

import './DeclineRequestModal.css';
import Input from "../Input/Input";
import {useHistory} from "react-router-dom";

const DeclineRequestModal = ({isModalOpen, closeModal, code, updateRequest, user}) => {
  const [message, changeMessageValue] = useState('');
  let history = useHistory();

  const alert = useAlert();

  const onInputChange = (event) => {
    changeMessageValue(event.target.value)
  };

  const onDecline = () => {
    if(!message) {
      alert.show('Please, provide a message', {
        type: 'error',
        timeout: 3000,
      });
    } else {
      updateRequest({
        ...code,
        requestType: {code: 0, message: 'Mapping Declined'},
        user,
        message
      });
      closeModal();
      history.push('/pending-requests')
    }
  };

  return (
    <Modal modalIsOpen={isModalOpen} closeModal={closeModal}>
      <div className='modal__header'>
        Decline code mapping
        <button className='modal__close' onClick={closeModal}>X</button>
      </div>
      <div className="modal__body">
        <Input
          type='textarea'
          wrapClassName={'form__block'}
          titleClassName={'form__block-title'}
          inputClassName={'form__block-input form__block-input--textarea'}
          title={'Please leave a message with the reason for rejection'}
          required
          id={'message'}
          onChange={onInputChange}
          name={'message'}
          value={message}
          rows={6}
        />
      </div>
      <div className="modal__footer">
        <div className='modal__footer__buttons'>
          <Button light onClick={closeModal}>Cancel</Button>
          <Button onClick={onDecline}>Confirm declining</Button>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isDeclineRequestModalOpen,
    user: state.user
  }
};

const mapDispatchToProps = {
  closeModal: closeDeclineRequestModal,
  updateRequest: updatePendingRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(DeclineRequestModal);