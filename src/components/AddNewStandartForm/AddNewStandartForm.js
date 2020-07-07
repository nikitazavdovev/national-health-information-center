import React, {useState} from "react";

import './AddNewStandartForm.css';
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import DropZone from "../DropZone/DropZone";

const AddNewStandartForm = ({submitForm}) => {

  const [fields, changeFieldValue] = useState({
    standartName: '',
    standartCategory: '',
    standartDescription: '',
    files: ''
  });
  const dropdownList = [
    {
      id: 1,
      value: 'medicine'
    },
    {
      id: 2,
      value: 'drugs'
    },
    {
      id: 3,
      value: 'treatment'
    }
  ];

  const onInputChange = (event) => {
    changeFieldValue({...fields, [event.target.name]: event.target.value})
  };
  const onDropdownSelect = (name, value) => {
    changeFieldValue({...fields, [name]: value});
  };
  const onDrop = (name, files) => {
    changeFieldValue({...fields, [name]: files});
  };

  return (
    <form action="" className='form'>
      <Dropdown
        list={dropdownList}
        placeholder={'Select category'}
        wrapClassName={'form__block form__block--half'}
        titleClassName={'form__block-title'}
        dropDownClassName={'form__block-dropdown'}
        title={'Category'}
        name={'standartCategory'}
        value={fields.standartCategory}
        onSelect={onDropdownSelect}
        required
      />
      <Input
        type='text'
        wrapClassName={'form__block form__block--half'}
        titleClassName={'form__block-title'}
        inputClassName={'form__block-input'}
        title={'Standard name'}
        required
        id={'standart-name'}
        placeholder={'standart name'}
        onChange={onInputChange}
        name={'standartName'}
        value={fields.standartName}
      />
      <Input
        type='textarea'
        wrapClassName={'form__block'}
        titleClassName={'form__block-title'}
        inputClassName={'form__block-input form__block-input--textarea'}
        title={'Description'}
        required
        id={'standartDescription'}
        onChange={onInputChange}
        name={'standartDescription'}
        value={fields.standartDescription}
        rows={6}
      />
      <DropZone
        onFileDrop={onDrop}
        name={'files'}
        wrapClassName={'form__block form__block--dropzone'}
      />
    </form>
  )
};

export default AddNewStandartForm;