import React from "react";

import './RequestDetails.css';
import {useParams} from "react-router";
import {connect} from "react-redux";
import Button from "../Button/Button";
import {useHistory} from "react-router-dom";
import {openDeclineRequestModal} from '../../store/actions'
import DeclineRequestModal from "../DeclineRequestModal/DeclineRequestModal";

const RequestDetails = ({codesForApproval, declineRequest}) => {
  const {requestId} = useParams();
  const request = codesForApproval.find(code => code.requestId === requestId);
  let history = useHistory();

  if(!request) return null;

  const acceptRequest = () => {
    history.push('/pending-requests')
  };

  return (
    <div className='request-details'>
      <div className="info request-details__info">
        <div className="info__block">
          <h3>Request ID</h3>
          <p>{request.requestId}</p>
        </div>
        <div className="info__block">
          <h3>User</h3>
          <p>{request.user}</p>
        </div>
        <div className="info__block">
          <h3>Terminology</h3>
          <p>{request.terminologyName}</p>
        </div>
      </div>
      <div className="request-table">
        {request.previousData &&
        <>
          <div className="change-info change-info--inactive">
            <div className="info change-info__block">
              <div className="info__block">
                <h3>Local Code ID</h3>
                <p>{request.previousData.localCodeId}</p>
              </div>
              <div className="info__block">
                <h3>Local Code Description</h3>
                <p>{request.previousData.localCodeDescription}</p>
              </div>
            </div>
            <span className='change-info__icon icon-link'/>
            <div className="info change-info__block">
              <div className="info__block">
                <h3>National Code ID</h3>
                <p>{request.previousData.nationalCodeId}</p>
              </div>
              <div className="info__block">
                <h3> National Code Description</h3>
                <p>{request.previousData.nationalCodeDescription}</p>
              </div>
            </div>
          </div>
          <span className='request-table__process-icon icon-double_arrow' />
        </>
        }
        <div className="change-info">
          <div className="info change-info__block">
            <div className="info__block">
              <h3>Local Code ID</h3>
              <p>{request.data.localCodeId}</p>
            </div>
            <div className="info__block">
              <h3>Local Code Description</h3>
              <p>{request.data.localCodeDescription}</p>
            </div>
          </div>
          <span className='change-info__icon icon-link'/>
          <div className="info change-info__block">
            <div className="info__block">
              <h3>National Code ID</h3>
              <p>{request.data.nationalCodeId}</p>
            </div>
            <div className="info__block">
              <h3> National Code Description</h3>
              <p>{request.data.nationalCodeDescription}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="request-details__buttons">
        <Button light onClick={declineRequest}>Decline</Button>
        <Button onClick={acceptRequest}>Accept</Button>
      </div>
      <DeclineRequestModal/>
    </div>
  )
};

const mapDispatchToProps = {
  declineRequest: openDeclineRequestModal
};

const mapStateToProps = state => {
  return {
    codesForApproval: state.terminology.codesForApproval
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails);