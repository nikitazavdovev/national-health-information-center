import React from "react";

import './PendingRequestsPage.css';
import Table from "../../components/Table/Table";
import {connect} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom";
import {Route, Switch} from "react-router";
import RequestDetails from "../../components/RequestDetails/RequestDetails";

const PendingRequestsPage = ({codesForApproval}) => {
  let { url, path } = useRouteMatch();

  const pendingRequestsTableColumns = React.useMemo(
    () =>  [
      {
        Header: 'User',
        accessor: 'user',
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
        Header: 'Action',
        accessor: 'action',
        width: 110,
        Cell: ({row}) => (
          <div className='actions'>
            <Link to={`${url}/request/${row.original.requestId}`} className='actions__btn'>View Details</Link>
          </div>
        )
      }
    ],
    []
  );

  const data = codesForApproval.map(code => {
    return {
      ...code,
      ...code.data
    }
  });

  return (
    <div className='page page--terminology-managements'>
      <h1 className='page__title'>Pending Requests</h1>
      <Switch>
        <Route path={path} exact>
          {codesForApproval.length ?
            <div className='page__table-wrap'>
              <Table
                columns={pendingRequestsTableColumns}
                data={data}
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

const mapStateToProps = state => {
  return {
    codesForApproval: state.terminology.codesForApproval
  }
};

export default connect(mapStateToProps, null)(PendingRequestsPage);