import React from "react";

import './Header.css'
import logo from "../../assets/images/logo.png"

import Account from "../Account/Account";

function Header() {
  return(
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="National Health Information Center"/>
      </div>
      <button className="header__btn header__logout">
        <span className="icon icon-logout" />
      </button>
      <button className="header__btn header__notification">
        <span className="icon icon-bell" />
      </button>
      <Account name={'عبدالرحمن عبدالله'}/>
    </header>
  )
}

export default Header