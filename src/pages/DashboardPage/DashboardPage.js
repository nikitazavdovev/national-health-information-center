import React from "react";

import './DashboardPage.css';

import DashboardTile from "../../components/DashboardTile/DashboardTile";
import DashboardCharts from "../../components/DashboardCharts/DashboardCharts";
import {connect} from "react-redux";

const DashboardPage = ({codesForApproval, user}) => {
  const userCodesForApproval = codesForApproval.filter(code => code.organizationId === user.organizationId && code.approverRole === user.role);


  const pageTiles = [

    {
      title: 'Terminology Managements',
      icon: 'settings',
      link: '/terminology-managements'
    },
    {
      title: 'Pending Request',
      icon: 'notification',
      link: '/pending-requests',
      notification: userCodesForApproval.length
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
  ];

  return (
    <div className='page page--dashboard'>
      <h1 className='page__title'>Welcome to Terminology System</h1>
      <p className='page__subtitle'>
        Uploading the clinical codes standards and mapping the organization codes with the standard’s codes also allowing the admin to manage the codes standards.
      </p>
      <div className='dashboard-content'>
        <div className='dashboard-tiles'>
          {pageTiles.map(tile =>
            <DashboardTile tile={tile} key={tile.title}/>
          )}
        </div>
        <div className='dashboard-charts'>
          <DashboardCharts/>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    codesForApproval: state.pendingRequest.allRequests,
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(DashboardPage);