import React, {useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import './App.css';

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import TerminologyManagementsPage from "../../pages/TerminologyManagementsPage/TerminologyManagementsPage";
import PendingRequestsPage from "../../pages/PendingRequestsPage/PendingRequestsPage";
import ReportsPage from "../../pages/ReportsPage/ReportsPage";
import UserManagementPage from "../../pages/UserManagementPage/UserManagementPage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import NationalTerminologiesPage from "../../pages/NationalTerminologiesPage/NationalTerminologiesPage";
import {connect} from "react-redux";

const App = ({isUserLoggedIn, userRole}) => {
  let [isMenuOpen, setMenuIsOpen] = useState(false);

  const menuToggle = () => {
    setMenuIsOpen(isMenuOpen = !isMenuOpen);
  };

  return (
    <div className="App">
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        {!isUserLoggedIn && <Redirect to={'/login'} />}
        <Route path='/'>
          <Header menuToggle={menuToggle}/>
          <main className='main'>
            <Navbar isMenuOpen={isMenuOpen}/>
              <div className={`page-content ${isMenuOpen ? 'menu-opened' : ''}`}>
                <Switch>
                  <Route path='/dashboard'>
                    <DashboardPage />
                  </Route>
                  {userRole !== 'admin' &&
                    <Route path='/national-terminologies'>
                      <NationalTerminologiesPage />
                    </Route>
                  }
                  <Route path='/terminology-managements'>
                    <TerminologyManagementsPage />
                  </Route>
                  <Route path='/pending-requests'>
                    <PendingRequestsPage />
                  </Route>
                  <Route path='/reports'>
                    <ReportsPage />
                  </Route>
                  <Route path='/user-management'>
                    <UserManagementPage />
                  </Route>
                  <Route path='/search'>
                    <SearchPage />
                  </Route>
                  <Route path='/'>
                    <Redirect to='/dashboard'/>
                  </Route>
                </Switch>
              </div>
          </main>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.user.isLoggedIn,
    userRole: state.user.role
  }
};

export default connect(mapStateToProps, null)(App);
