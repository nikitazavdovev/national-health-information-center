import React, {useEffect, useState} from 'react';
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
import {addNotification, removeNotification} from '../../store/actions'

const App = ({isUserLoggedIn, user, addNotification, removeNotification, pendingRequests}) => {
  let [isMenuOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    removeNotification();
    if(pendingRequests.find(request => request.organizationId === user.organizationId && request.approverRole === user.role)) {
      addNotification()
    }
  },[user]);

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
                  {user.type !== 'admin' &&
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
};

const mapDispatchToProps = {
  addNotification: addNotification,
  removeNotification: removeNotification
};

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.user.isLoggedIn,
    user: state.user,
    pendingRequests: state.pendingRequest.allRequests
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
