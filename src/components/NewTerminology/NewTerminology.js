import React from "react";

import './NewTerminology.css';
import Table from "../Table/Table";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import {useAlert} from "react-alert";
import {removeNewTerminologyFormData, addNewTerminologyAdmin, addNewTerminologyUser} from "../../store/actions";

const NewTerminology = ({newTerminology, basicPath, clearTerminology, addNewTerminologyAdmin, addNewTerminologyUser, userRole}) => {
  let history = useHistory();
  const alert = useAlert();

  const terminologyCodesColumns = React.useMemo(
    () =>  [
      {
        Header: 'Code ID',
        accessor: 'code',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );
  const onConfirm = () => {
    let alertMsg;
      if(userRole === 'admin') {
        addNewTerminologyAdmin(newTerminology);
        alertMsg = 'Upload successful.'
      } else {
        addNewTerminologyUser(newTerminology);
        alertMsg = 'Upload successful. Mapping process has started. The process will take approximately 30 minutes.'
      }
      alert.show(alertMsg, {
        type: 'success',
        timeout: 0,
      });
      clearTerminology();
      history.push(`${basicPath}`);
    };

  const onCancel = () => {
    clearTerminology();
    history.push(`${basicPath}`);
  };

  if(!newTerminology) {
    // return <Redirect to='/'/>
    newTerminology = {
      standardCategory: {
        value: 'category'
      },
      standardTerminology: {
        value: 'terminology'
      },
      standardName: 'name',
      standardDescription: 'description',
      fileData: []
    }
  }

  return (
    <div className='new-terminology'>
      <div className="info">
        <div className="info__block">
          <h3>Category</h3>
          <p>{newTerminology.standardCategory.value}</p>
        </div>
        {userRole !== 'admin' &&
          <div className="info__block">
            <h3>Terminology</h3>
            <p>{newTerminology.standardTerminology.value}</p>
          </div>
        }
        <div className="info__block">
          <h3>{userRole === 'admin' ? 'Standard name' : 'Local terminology name'}</h3>
          <p>{newTerminology.standardName}</p>
        </div>
        <div className="info__block">
          <h3>{userRole === 'admin' ? 'Description' : 'Local terminology description'}</h3>
          <p>{newTerminology.standardDescription}</p>
        </div>
      </div>
      <div className='new-terminology__header'>
        <Button onClick={() => onConfirm()}>Confirm</Button>
        <Button onClick={() => onCancel()}>Cancel</Button>
      </div>
      <Table
        columns={terminologyCodesColumns}
        data={newTerminology.fileData}
        paginate={25}
      />
    </div>
  )
};

const mapStateToProps = state => {
  return {
    newTerminology: state.terminology.newTerminologyData,
    basicPath: state.modal.basicPath,
    userRole: state.user.role
  }
};

const mapDispatchToProps = {
  clearTerminology: removeNewTerminologyFormData,
  addNewTerminologyAdmin,
  addNewTerminologyUser
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTerminology);