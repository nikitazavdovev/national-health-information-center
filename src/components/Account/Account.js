import React from "react";

import './Account.css'

function Account(props) {
  return(
    <div className="account">
      <h3 className="account__name">{props.name}</h3>
      <span className="account__img">
        <span className="icon icon-user" />
      </span>
    </div>
  )
}

export default Account