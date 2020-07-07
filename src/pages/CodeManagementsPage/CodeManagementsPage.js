import React from "react";
import {connect} from 'react-redux';

import './CodeManagementsPage.css';

import Button from "../../components/Button/Button";
import AddNewStandartModal from "../../components/AddNewStandartModal/AddNewStandartModal";
import {openNewStandartModal} from "../../store/actions";
import Dropdown from "../../components/Dropdown/Dropdown";

const CodeManagementsPage = (props) => {

  return (
    <div className='page page--code-managements'>
      <h1 className='page__title'>Code Managements</h1>
      <div className="page__right-btn">
        <Button onClick={() => props.openNewStandartModal()}>
          <span className='icon icon-plus' />
          Add new Standart
        </Button>
      </div>
      <AddNewStandartModal />
    </div>
  )
};

const mapDispatchToProps = {
  openNewStandartModal
};

export default connect(null, mapDispatchToProps)(CodeManagementsPage);