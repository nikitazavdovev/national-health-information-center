import React from "react";

import './NewTerminology.css';
import Table from "../Table/Table";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import {useAlert} from "react-alert";
import {removeNewTerminologyFormData, addNewTerminologyAdmin, addNewTerminologyUser} from "../../store/actions";

const NewTerminology = ({newTerminology, basicPath, clearTerminology, addNewTerminologyAdmin, addNewTerminologyUser, userType}) => {
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
      if(userType === 'admin') {
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
    return <Redirect to='/'/>

  }

  return (
    <div className='new-terminology'>
      <div className="info">
        <div className="info__block">
          <h3>Category</h3>
          <p>{newTerminology.standardCategory.value}</p>
        </div>
        {userType !== 'admin' &&
          <div className="info__block">
            <h3>Terminology</h3>
            <p>{newTerminology.standardTerminology.value}</p>
          </div>
        }
        <div className="info__block">
          <h3>{userType === 'admin' ? 'Standard name' : 'Local terminology name'}</h3>
          <p>{newTerminology.standardName}</p>
        </div>
        <div className="info__block">
          <h3>{userType === 'admin' ? 'Description' : 'Local terminology description'}</h3>
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
    userType: state.user.type
  }
};

const mapDispatchToProps = {
  clearTerminology: removeNewTerminologyFormData,
  addNewTerminologyAdmin,
  addNewTerminologyUser
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTerminology);