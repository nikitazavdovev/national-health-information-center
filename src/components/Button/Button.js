import React from "react";

import './Button.css';

const Button = ({light, onClick, disabled = false, children}) => {
  return (
    <button
      className={`button ${light ? 'button--light' : ''}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  )
};

export default Button;