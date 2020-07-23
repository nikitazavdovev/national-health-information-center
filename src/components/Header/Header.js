import React from "react";
import {connect} from "react-redux";

import './Header.css'
import logo from "../../assets/images/logo.svg"
import logoMobile from "../../assets/images/logo_mobile.svg"

import Account from "../Account/Account";
import {toggleMainMenu, userLogout} from "../../store/actions";
import Notification from "../Notification/Notification";

function Header({toggleMainMenu, userLogout, userName}) {
  return(
    <header className="header">
      <button className="header__menu" onClick={toggleMainMenu}>
        <span className="icon-menu1" />
      </button>
      <div className="header__logo">
        <img src={logo} alt="National Health Information Center" className="header__logo-img header__logo-img--desktop"/>
        <img src={logoMobile} alt="National Health Information Center" className="header__logo-img header__logo-img--mobile"/>
      </div>
      <div className="header__buttons">
        <button className="header__btn header__logout" onClick={userLogout}>
          <span className="icon icon-logout" />
        </button>
        <Notification className={'header__btn'}/>
      </div>
      <Account name={userName}/>
    </header>
  )
}

const mapDispatchToProps = {
  toggleMainMenu,
  userLogout
};

const mapStateToProps = state => {
  return {
    userName: state.user.name
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)