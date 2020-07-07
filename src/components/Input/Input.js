import React from "react";

import './Input.css';

const Input = (
  {
    placeholder,
    title,
    value = '',
    error,
    id,
    required = false,
    wrapClassName,
    titleClassName,
    inputClassName,
    onChange,
    name,
    type = 'text',
    rows,
    ...restProps
  }) => {

  const fieldProps = {
    className: inputClassName,
    placeholder,
    value,
    id,
    onChange,
    name,
    type,
    ...restProps
  };

  if (type === "textarea") {
    delete fieldProps.type;
    delete fieldProps.value;

    fieldProps.defaultValue = value;
    fieldProps.rows = rows || 2;
  }


  return (
    <div className={wrapClassName}>
      <label htmlFor={id} className={titleClassName}>
        {title}
        {required && <span>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea {...fieldProps} />
      ) : (
        <input {...fieldProps} />
      )}
      {error && <p className='error'>{error.message}</p>}
    </div>
  )
};

export default Input;