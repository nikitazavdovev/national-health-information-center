import React from "react";

import './ButtonBack.css';
import {useHistory} from "react-router";

const ButtonBack = ({className, path}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(path)
  };

  return (
    <button className={`button-back ${className}`} onClick={handleClick}>
      <span className='button-back__icon icon-arrow-left2'/>
      Back
    </button>
  )
};

export default ButtonBack;