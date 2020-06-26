import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import './App.css';

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import CodeManagementsPage from "../../pages/CodeManagementsPage/CodeManagementsPage";
import PendingRequestsPage from "../../pages/PendingRequestsPage/PendingRequestsPage";
import ReportsPage from "../../pages/ReportsPage/ReportsPage";
import UserManagementPage from "../../pages/UserManagementPage/UserManagementPage";
import SearchPage from "../../pages/SearchPage/SearchPage";

function App() {
  return (
    <div className="App">
      <Header />
      <main className='main'>
        <Navbar />
        <Switch>
          <Route path='/dashboard'>
            <DashboardPage />
          </Route>
          <Route path='/code-managements'>
            <CodeManagementsPage />
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
      </main>
    </div>
  );
}

export default App;
