import React, {useState} from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {closeDeclineRequestModal} from "../../store/actions";
import {connect} from "react-redux";

import './DeclineRequestModal.css';
import Input from "../Input/Input";

const DeclineRequestModal = ({isModalOpen, closeModal}) => {
  const [message, changeMessageValue] = useState('');

  const onInputChange = (event) => {
    changeMessageValue(event.target.value)
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
          <Button onClick={closeModal}>Confirm declining</Button>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isDeclineRequestModalOpen
  }
};

const mapDispatchToProps = {
  closeModal: closeDeclineRequestModal
};

export default connect(mapStateToProps, mapDispatchToProps)(DeclineRequestModal);