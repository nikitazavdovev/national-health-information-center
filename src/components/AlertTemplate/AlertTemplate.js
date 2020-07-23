import React from "react";

import './AlertTemplate.css';

const AlertTemplate = ({ style, options, message, close }) => {
  return (
    <div style={style} className={`alert alert--${options.type}`}>
      {message}
      <button onClick={close}>X</button>
    </div>
  )
};

export default AlertTemplate;