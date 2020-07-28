import React, {useState} from "react";

import './RequestDetails.css';
import {useParams} from "react-router";
import {connect} from "react-redux";
import Button from "../Button/Button";
import {useHistory} from "react-router-dom";
import {
  openDeclineRequestModal,
  openRequestDetailsModal,
  openViewMatchesModal,
  removePendingRequest,
  declineCode,
  approveCode
} from '../../store/actions'
import DeclineRequestModal from "../DeclineRequestModal/DeclineRequestModal";
import Status from "../Status/Status";
import RequestDetailsModal from "../RequestDetailsModal/RequestDetailsModal";
import ButtonBack from "../ButtonBack/ButtonBack";
import ViewMatchesModal from "../ViewMatchesModal/ViewMatchesModal";
import Input from "../Input/Input";

const RequestDetails = ({codesForApproval, declineRequest, declineCode, approveCode, removePendingRequest, user, openViewMatchesModal, openRequestDetailsModal}) => {
  const {requestId} = useParams();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const request = codesForApproval.find(code => code.requestId === requestId);
  let history = useHistory();

  if(!request) {
    history.push('/pending-requests');
    return null;
  }

  const acceptRequest = () => {
    approveCode(request.payload);
    removePendingRequest(request.requestId);
    history.push('/pending-requests')
  };

  const cancelRequest = () => {
    declineCode(request.payload);
    removePendingRequest(request.requestId);
    history.push('/pending-requests')
  };

  const codeStatus = () => {
    return {
      code: request.payload.data.activationStatus,
      message: request.payload.data.activationStatus === 0 ? 'Inactive' : 'Active'
    }
  };

  return (
    <>
      <h1 className='page__title'>{request.requestType.message}</h1>
      <ButtonBack className={'page__back-button'} path={'/pending-request'}/>
      <div className='request-details'>
        <div className="info request-details__info">
          <div className="info__block">
            <h3>Request ID</h3>
            <p>{request.requestId}</p>
          </div>
          <div className="info__block">
            <h3>User</h3>
            <p>{request.senderName}</p>
          </div>
          <div className="info__block">
            <h3>Terminology ID</h3>
            <p>{request.payload.terminologyId}</p>
          </div>
          <div className="info__block">
            <h3>Current code status</h3>
            <Status value={codeStatus()} />
          </div>
        </div>
        <div className="info">
          {request.requestMessage &&
          <Input
            type={'textarea'}
            value={request.requestMessage}
            readOnly
            title={'Message'}
            wrapClassName={'info__block message'}
            rows={4}
          />
          }
        </div>
        <div className="request-table">
          <div className="change-info change-info--inactive">
            <div className="info change-info__block">
              <div className="info__block">
                <h3>Local Code ID</h3>
                <p>{request.payload.previousData ? request.payload.previousData.localCodeId : request.payload.data.localCodeId}</p>
              </div>
              <div className="info__block">
                <h3>Local Code Description</h3>
                <p>{request.payload.previousData ? request.payload.previousData.localCodeDescription : request.payload.data.localCodeDescription}</p>
              </div>
            </div>
            <span className='change-info__icon icon-link'/>
            <div className="info change-info__block">
              <div className="info__block">
                <h3>National Code ID</h3>
                <p>{request.payload.previousData ? request.payload.previousData.nationalCodeId : ''}</p>
              </div>
              <div className="info__block">
                <h3> National Code Description</h3>
                <p>{request.payload.previousData ? request.payload.previousData.nationalCodeDescription : ''}</p>
              </div>
            </div>
          </div>
          <span className='request-table__process-icon icon-double_arrow' />
          <div className="change-info">
            <div className="info change-info__block">
              <div className="info__block">
                <h3>Local Code ID</h3>
                <p>{request.payload.data.localCodeId}</p>
              </div>
              <div className="info__block">
                <h3>Local Code Description</h3>
                <p>{request.payload.data.localCodeDescription}</p>
              </div>
            </div>
            <span className='change-info__icon icon-link'/>
            <div className="info change-info__block">
              <div className="info__block">
                <h3>National Code ID</h3>
                <p>{request.payload.data.nationalCodeId}</p>
              </div>
              <div className="info__block">
                <h3> National Code Description</h3>
                <p>
                  {request.payload.data.nationalCodeDescription}
                </p>
                <button onClick={openRequestDetailsModal}>
                  View other options
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="request-details__buttons">
          {user.role === 'reviewer' ?
            <>
              <Button light onClick={declineRequest}>Decline</Button>
              <Button onClick={acceptRequest}>Accept</Button>
            </> :
            <>
              <Button light onClick={cancelRequest}>Cancel Request</Button>
              <Button onClick={() => openViewMatchesModal({code: request, codeData: request.payload.data, terminologyData: {terminologyId: request.payload.terminologyId}, requestType: 'repeat'})}>Change Selection</Button>
            </>
          }
        </div>
        <DeclineRequestModal code={request}/>
        <RequestDetailsModal code={request.payload}/>
        <ViewMatchesModal />
      </div>
    </>
  )
};

const mapDispatchToProps = {
  declineRequest: openDeclineRequestModal,
  openRequestDetailsModal: openRequestDetailsModal,
  openViewMatchesModal: openViewMatchesModal,
  removePendingRequest: removePendingRequest,
  declineCode: declineCode,
  approveCode: approveCode
};

const mapStateToProps = state => {
  return {
    codesForApproval: state.pendingRequest.allRequests,
    user: state.user
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails);