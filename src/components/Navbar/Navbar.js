import React from "react";

import './Navbar.css';

import NavbarItem from "../NavbarItem/NavbarItem";

import poweredByLogo from '../../assets/images/poweredBy_logo.png';
import {connect} from "react-redux";

const Navbar = ({isMenuOpen, userRole}) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'menu',
      link: '/dashboard'
    },
    {
      title: 'Terminology Managements',
      icon: 'settings',
      link: '/terminology-managements'
    },
    {
      title: 'Pending Request',
      icon: 'notification',
      link: '/pending-requests'
    },
    {
      title: 'Reports',
      icon: 'bars',
      link: '/reports'
    },
    {
      title: 'User Management',
      icon: 'user',
      link: '/user-management'
    },
    {
      title: 'Search',
      icon: 'search',
      link: '/search'
    }
  ];

  if(userRole !== 'admin') menuItems.splice(1, 0,
    {
      title: 'National Terminologies',
      icon: 'sphere',
      link: '/national-terminologies'
    },);

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
};

const mapStateToProps = state => {
  return {
    isMenuOpen: state.menu.isMainMenuOpen,
    userRole: state.user.role
  }
};

export default connect(mapStateToProps, null)(Navbar);