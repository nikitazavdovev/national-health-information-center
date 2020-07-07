import React, {useState} from "react";
import {connect} from "react-redux";

import './AddNewStandartModal.css';

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import {closeNewStandartModal} from "../../store/actions";
import AddNewStandartForm from "../AddNewStandartForm/AddNewStandartForm";

const AddNewStandartModal = ({isModalOpen, closeModal}) => {

  const [isFormSubmitted, submitForm] = useState(false);

  const onFormSubmit = () => {
    submitForm(true)
  };

  return (
    <Modal modalIsOpen={isModalOpen} closeModal={closeModal}>
      <div className='modal__header'>Add new Standart</div>
      <div className="modal__body">
        <AddNewStandartForm submitForm={isFormSubmitted}/>
      </div>
      <div className="modal__footer">
        <div className='modal__footer__buttons'>
          <Button light onClick={closeModal}>Cancel</Button>
          <Button onClick={onFormSubmit}>Confirm</Button>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isNewStandartModalOpen
  }
};

const mapDispatchToProps = {
  closeModal: closeNewStandartModal
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewStandartModal);