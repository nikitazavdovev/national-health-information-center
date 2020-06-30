import React from "react";

import './Navbar.css';

import NavbarItem from "../NavbarItem/NavbarItem";

import poweredByLogo from '../../assets/images/poweredBy_logo.png';

function Navbar(props) {
  const listItems = [
    {
      title: 'Dashboard',
      icon: 'menu',
      link: '/dashboard'
    },
    {
      title: 'Code Managements',
      icon: 'settings',
      link: '/code-managements'
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

  return (
    <aside className={`navbar ${props.isMenuOpen ? 'open' : ''}`}>
      <h2 className="navbar__header">Terminology System</h2>
      <ul className='navbar__list'>
        {listItems.map(item =>
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

export default Navbar;