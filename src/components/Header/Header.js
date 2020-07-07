import React from "react";
import {connect} from "react-redux";

import './Header.css'
import logo from "../../assets/images/logo.svg"
import logoMobile from "../../assets/images/logo_mobile.svg"

import Account from "../Account/Account";
import {toggleMainMenu} from "../../store/actions";

function Header({toggleMainMenu}) {
  return(
    <header className="header">
      <button className="header__menu" onClick={toggleMainMenu}>
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

const mapDispatchToProps = {
  toggleMainMenu
};

export default connect(null, mapDispatchToProps)(Header)