import React, {useState} from "react";
import {connect} from "react-redux";

import './AddNewStandardModal.css';

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import {closeNewStandardModal, addNewTerminologyFormData} from "../../store/actions";
import AddNewStandardForm from "../AddNewStandardForm/AddNewStandardForm";
import { useHistory } from "react-router-dom";
import {useAlert} from "react-alert";
import {isObjectEmpty} from "../../utils/helpers";

const AddNewStandardModal = ({isModalOpen, closeModal, basicPath, addNewTerminologyFormData, userRole}) => {

  const [isFormSubmitted, submitForm] = useState(false);
  let history = useHistory();
  const alert = useAlert()

  const checkFormValues = (formData) => {
    return new Promise((resolve, reject) => {
      if(formData.fileData.length <= 0) reject();
      if(isObjectEmpty(formData.standardCategory)) reject();
      if(!formData.standardName) reject();
      if(!formData.standardDescription) reject();
      if(userRole !== 'admin' && isObjectEmpty(formData.standardTerminology)) reject();
      resolve(formData)
    })
  };
  const onFormSubmit = (data) => {
    checkFormValues(data).then(() => {
      addNewTerminologyFormData(data);
      history.push(`${basicPath}/newTerminology`);
      submitForm(false);
      closeModal();
    }).catch(() => {
      submitForm(false);
      alert.show('Please, provide all required form fields', {
        type: 'error'
      })
    })
  };

  return (
    <Modal modalIsOpen={isModalOpen} closeModal={closeModal}>
      <div className='modal__header'>
        {userRole === 'admin' ? 'Add new standart' : 'Upload Local Terminology'}
      </div>
      <div className="modal__body">
        <AddNewStandardForm onFormSubmit={onFormSubmit} submitFromOutside={isFormSubmitted} userRole={userRole}/>
      </div>
      <div className="modal__footer">
        <div className='modal__footer__buttons'>
          <Button light onClick={closeModal}>Cancel</Button>
          <Button onClick={() => submitForm(true)}>Confirm</Button>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isNewStandardModalOpen,
    basicPath: state.modal.basicPath,
    userRole: state.user.role
  }
};

const mapDispatchToProps = {
  closeModal: closeNewStandardModal,
  addNewTerminologyFormData
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewStandardModal);