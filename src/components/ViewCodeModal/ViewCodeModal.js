import React, {useEffect, useState} from "react";

import './ViewCodeModal.css';

import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {closeViewCodeModal} from "../../store/actions";
import {connect} from "react-redux";
import Dropdown from "../Dropdown/Dropdown";
import Status from "../Status/Status";

const ViewCodeModal = ({isModalOpen, closeModal, currentCode, userRole}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setIsActive] = useState(isModalOpen && currentCode.status.code === 1);
  const [selectedVersion, setSelectedVersion] = useState({});

  useEffect(() => {
    if (isModalOpen) {
      setIsEdit(false);
      setIsActive(currentCode.status.code === 1);
      setSelectedVersion(prepareVersions()[currentCode.isLatest ? 0 : 1])
    }
  }, [isModalOpen, currentCode]);

  if(!isModalOpen) return null;

  function prepareVersions() {
    return currentCode.versions.map( (version, index) => {
      return {
        value: `${version.code} - ${version.status}`,
        id: index,
        status: version.status
      }
    })
  }

  const canEdit = currentCode.isLatest;

  return (
    <Modal modalIsOpen={isModalOpen} closeModal={closeModal}>
      <div className='modal__header'>
        View Code Details
        <button className='modal__close' onClick={closeModal}>X</button>
      </div>
      <div className="modal__body">
        <div className="code">
          <div className='code__wrap'>
            {userRole === 'admin' &&
            <div className="code__block code__version half">
              <h3>Version</h3>
              {isEdit ?
                <p>{selectedVersion.value}</p> :
                <Dropdown
                  wrapClassName='code__version-wrap'
                  titleClassName='code__version-title'
                  dropDownClassName='code__version-dropdown'
                  list={prepareVersions()}
                  selected={selectedVersion}
                  onSelect={({value}) => setSelectedVersion(value)}
                />
              }
            </div>
            }
            <div className={`code__block code__status ${userRole === 'admin' ? 'half' : 'full'}`}>
              <h3>Status</h3>
              <Status value={isActive ? {code: 1, message: 'active'} : {code: 0, message: 'inactive'}} />
              {isEdit && <button onClick={()=> setIsActive(!isActive)} className='code__status-toggle'>{isActive ? 'deactivate' : 'activate'}</button>}
            </div>
            <div className="code__block code__id half">
              <h3>ID</h3>
              {isEdit ? <input type='text' value={currentCode.codeId} /> : <p>{currentCode.codeId}</p>}
            </div>
            <div className="code__block code__description half">
              <h3>Description</h3>
              {isEdit ? <input type='text' value={currentCode.description} /> : <p>{currentCode.description}</p>}
            </div>
            <div className="code__block code__terminology half">
              <h3>Terminology</h3>
              <p>{currentCode.terminologyName}</p>
            </div>
            <div className="code__block code__category half">
              <h3>Category</h3>
              <p>{currentCode.category}</p>
            </div>
          </div>
          {userRole === 'admin' &&
            <div className='code__buttons'>
              {isEdit ?
                <>
                  <Button onClick={() => setIsEdit(false)}>Save</Button>
                  <Button onClick={() => setIsEdit(false)}>Cancel</Button>
                </> :
                <>
                  <Button onClick={() => setIsEdit(true)} disabled={!canEdit || selectedVersion.status === 'inactive'}>Edit</Button>
                </>
              }
            </div>
          }
          <hr/>
          <div className="code__footer">
            <span className='icon icon-plus' />
            <span className='icon icon-bars' />
            <span className='icon icon-user' />
            <span className='icon icon-notification' />
            <span className='icon icon-menu' />
            <span className='icon icon-logout' />
            <span className='icon icon-bell' />
            <span className='icon icon-settings' />
            <span className='icon icon-search' />
            <span className='icon icon-arrow' />
          </div>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.isViewCodeModalOpen,
    currentCode: state.modal.currentCode,
    userRole: state.user.role
  }
};

const mapDispatchToProps = {
  closeModal: closeViewCodeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCodeModal);