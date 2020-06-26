import React from "react";
import {NavLink} from "react-router-dom";

import './DashboardTile.css';

const DashboardTile = (props) => {
 return (
   <div className='tile'>
    <NavLink to={props.tile.link} className='tile__link'>
     <span className={`tile__icon icon-${props.tile.icon}`} />
     <h3 className='tile__title'>
       {props.tile.title}
       {props.tile.notification &&
        <span className='tile__notification'>{props.tile.notification}</span>
       }
     </h3>
    </NavLink>
   </div>
 )
};

export default DashboardTile;