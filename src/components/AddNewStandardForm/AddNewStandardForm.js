import React, {useEffect, useState} from "react";

import './AddNewStandardForm.css';
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import DropZone from "../DropZone/DropZone";

const AddNewStandardForm = ({onFormSubmit, submitFromOutside, userType}) => {

  const [fields, changeFieldValue] = useState({
    standardName: '',
    standardCategory: {},
    standardTerminology: {},
    standardDescription: '',
  });
  const [fileData, setFileData] = useState({
    // file: '',
    parsed: ''
  });

  useEffect(() => {
    if(submitFromOutside) handleOnSubmit()
  }, [submitFromOutside]);

  const categoriesList = [
    {
      id: 1,
      value: 'Diagnosis'
    },
    {
      id: 2,
      value: 'Medicine'
    },
    {
      id: 3,
      value: 'Treatment'
    }
  ];
  const terminologiesList = [
    {
      id: 1,
      value: 'ICD8'
    },
    {
      id: 2,
      value: 'ICD9'
    },
    {
      id: 3,
      value: 'ICD10'
    }
  ];

  //TODO: finish form submit

  const onInputChange = (event) => {
    changeFieldValue({...fields, [event.target.name]: event.target.value})
  };
  const onDropdownSelect = (data) => {
    changeFieldValue({...fields, [data.name]: data.value});
  };
  const onFileDrop =  files => {
    console.log('file uploaded')
    // setFileData({...fields, file: files});
  };
  const onDataParse = (data) => {
    setFileData({...fileData, parsed: data});
  };

  const handleOnSubmit = () => {
    onFormSubmit({
      ...fields,
      fileData: fileData.parsed
    })
  };

  return (
    <form className='form'>
      {userType !== 'admin' &&
        <div className='form__divider'>
          <div className="form__divider-text">
            Select national terminology to be mapped to
          </div>
        </div>
      }
      <Dropdown
        list={categoriesList}
        placeholder={'Select category'}
        wrapClassName={'form__block form__block--half'}
        titleClassName={'form__block-title'}
        dropDownClassName={'form__block-dropdown'}
        title={'Category'}
        name={'standardCategory'}
        selected={fields.standardCategory}
        onSelect={onDropdownSelect}
        required
      />
      {userType !== 'admin' &&
      <Dropdown
        list={terminologiesList}
        placeholder={'Select terminology'}
        wrapClassName={'form__block form__block--half'}
        titleClassName={'form__block-title'}
        dropDownClassName={'form__block-dropdown'}
        title={'Terminology'}
        name={'standardTerminology'}
        selected={fields.standardTerminology}
        onSelect={onDropdownSelect}
        required
      />
      }
      {userType !== 'admin' &&
        <div className='form__divider'>
          <div className="form__divider-text">
            Enter local terminology data
          </div>
        </div>
      }
      <Input
        type='text'
        wrapClassName={'form__block'}
        titleClassName={'form__block-title'}
        inputClassName={'form__block-input'}
        title={userType === 'admin' ? 'Standard name' : 'Local terminology name'}
        required
        id={'standard-name'}
        placeholder={'standard name'}
        onChange={onInputChange}
        name={'standardName'}
        value={fields.standardName}
      />
      <Input
        type='textarea'
        wrapClassName={'form__block'}
        titleClassName={'form__block-title'}
        inputClassName={'form__block-input form__block-input--textarea'}
        title={userType === 'admin' ? 'Description' : 'Local terminology description'}
        required
        id={'standardDescription'}
        onChange={onInputChange}
        name={'standardDescription'}
        value={fields.standardDescription}
        rows={6}
      />
      <DropZone
        onFileDrop={onFileDrop}
        onDataParse={onDataParse}
        name={'terminologyFile'}
        wrapClassName={'form__block form__block--dropzone'}
      />
    </form>
  )
};

export default AddNewStandardForm;