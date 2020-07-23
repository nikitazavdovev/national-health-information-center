import React from "react";

import './Notification.css';
import {connect} from "react-redux";

const Notification = ({notifications}) => {
  return (
    <div className='notification'>
      <button className='notification__btn'>
        <span className="icon icon-bell" />
        {notifications > 0 &&
          <span className="notification__indicator" />
        }
      </button>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications.notifications
  }
}

export default connect(mapStateToProps, null)(Notification);