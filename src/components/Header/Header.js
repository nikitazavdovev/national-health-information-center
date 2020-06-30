import React from "react";

import './Header.css'
import logo from "../../assets/images/logo.svg"
import logoMobile from "../../assets/images/logo_mobile.svg"

import Account from "../Account/Account";

function Header(props) {
  return(
    <header className="header">
      <button className="header__menu" onClick={props.menuToggle}>
        <span className="icon-menu1" />
      </button>
      <div className="header__logo">
        <img src={logo} alt="National Health Information Center" className="header__logo-img header__logo-img--desktop"/>
        <img src={logoMobile} alt="National Health Information Center" className="header__logo-img header__logo-img--mobile"/>
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