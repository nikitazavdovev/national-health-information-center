import React from "react";

import './Navbar.css';

import NavbarItem from "../NavbarItem/NavbarItem";

import poweredByLogo from '../../assets/images/poweredBy_logo.png';
import {connect} from "react-redux";

function Navbar({isMenuOpen, menuItems}) {
  return (
    <aside className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <h2 className="navbar__header">Terminology System</h2>
      <ul className='navbar__list'>
        {menuItems.map(item =>
          <NavbarItem item={item} key={item.title}/>
        )}
      </ul>
      <div className='navbar__powered'>
        <h4>Powered by</h4>
        <img src={poweredByLogo} alt="Lean"/>
      </div>
    </aside>
  )
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.menu.isMainMenuOpen,
    menuItems: state.menu.menuItems
  }
};

export default connect(mapStateToProps, null)(Navbar);