import React from "react";

import './DashboardPage.css';

import DashboardTile from "../../components/DashboardTile/DashboardTile";
import DashboardCharts from "../../components/DashboardCharts/DashboardCharts";

const DashboardPage = (props) => {
  const pageTiles = [
    {
      title: 'Code Managements',
      icon: 'settings',
      link: '/code-managements'
    },
    {
      title: 'Pending Request',
      icon: 'notification',
      link: '/pending-requests',
      notification: 10
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
        Uploading the clinical codes standers and mapping the organization codes with the stander’s codes also allowing the admin to manage the codes standers.
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

export default DashboardPage;