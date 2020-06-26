import React from "react";
import {NavLink} from "react-router-dom";

import './NavbarItem.css'

function NavbarItem(props) {
  return (
    <li className='navbar-item'>
      <NavLink to={props.item.link} className='navbar-item__link'>
        <span className={`navbar-item__icon icon-${props.item.icon}`} />
        <h3 className='navbar-item__title'>{props.item.title}</h3>
      </NavLink>
    </li>
  )
}

export default NavbarItem;