import React from "react";

import './Status.css';

const Status = ({value}) => {
  return (
    <div className='status'>
      <span className={`status__text status__text--${value.code}`}>{value.message}</span>
    </div>
  )
};

export default Status;