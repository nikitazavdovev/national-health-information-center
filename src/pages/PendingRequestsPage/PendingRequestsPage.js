import React from "react";

import './PendingRequestsPage.css';
import Table from "../../components/Table/Table";
import {connect} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom";
import {Route, Switch} from "react-router";
import RequestDetails from "../../components/RequestDetails/RequestDetails";
import Status from "../../components/Status/Status";
import {removeNotification} from '../../store/actions'

const PendingRequestsPage = ({pendingRequests, removeNotification, user, allTerminologies}) => {
  let { url, path } = useRouteMatch();

  //Clear notifications
  removeNotification();

  const pendingRequestsTableColumns = React.useMemo(
    () =>  [
      {
        Header: 'User',
        accessor: 'senderName',
        width: 100,
      },
      {
        Header: 'Terminology',
        accessor: 'terminologyName',
        width: 100
      },
      {
        Header: 'Local Code ID',
        accessor: 'localCodeId',
        width: 120
      },
      {
        Header: 'Local Code Description',
        accessor: 'localCodeDescription',
      },
      {
        Header: 'Request Type',
        accessor: 'requestType',
        Cell: ({cell}) => (
          <Status value={cell.value}/>
        )
      },
      {
        Header: 'Action',
        accessor: 'action',
        width: 110,
        Cell: ({row}) => {
          return (
            <div className='actions'>
              <Link to={`${url}/request/${row.original.requestId}`} className='actions__btn'>View Details</Link>
            </div>
          )
        }
      }
    ],
    []
  );

  const data = pendingRequests.filter(request => {
    if(request.organizationId === user.organizationId && request.approverRole === user.role) {
      return request.approverName ? request.approverName === user.name : true;
    }
    return false;
  });
  const dataToDisplay = data.map(item => {
    return {
      requestId: item.requestId,
      senderName: item.senderName,
      terminologyName: allTerminologies.find(terminology => terminology.id === item.payload.terminologyId).localTerminologyName,
      localCodeId: item.payload.data.localCodeId,
      localCodeDescription: item.payload.data.localCodeDescription,
      requestType: item.requestType,

    }
  });

  return (
    <div className='page page--terminology-managements'>
      <Switch>
        <Route path={path} exact>
          <h1 className='page__title'>Pending Requests</h1>
          {data.length ?
            <div className='page__table-wrap'>
              <Table
                columns={pendingRequestsTableColumns}
                data={dataToDisplay}
              />
            </div> :
            <h2 className='page__message'>There is no requests yet.</h2>
          }
        </Route>
        <Route path={`${path}/request/:requestId`}>
          <RequestDetails/>
        </Route>
      </Switch>
    </div>
  )
};

const mapDispatchToProps = {
  removeNotification: removeNotification
};

const mapStateToProps = state => {
  return {
    pendingRequests: state.pendingRequest.allRequests,
    user: state.user,
    allTerminologies: state.terminology.userTerminologies
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequestsPage);