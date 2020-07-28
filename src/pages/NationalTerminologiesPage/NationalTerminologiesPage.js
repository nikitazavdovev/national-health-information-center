import React from "react";

import './NationalTerminologiesPage.css';
import Status from "../../components/Status/Status";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import TableDownloadBtn from "../../components/TableDownloadBtn/TableDownloadBtn";
import Table from "../../components/Table/Table";
import Terminology from "../../components/Terminology/Terminology";
import AddNewStandardModal from "../../components/AddNewStandardModal/AddNewStandardModal";
import ViewCodeModal from "../../components/ViewCodeModal/ViewCodeModal";
import {connect} from "react-redux";

const NationalTerminologiesPage = ({allTerminologies}) => {
  let { url, path } = useRouteMatch();

  const terminologiesListColumns = React.useMemo(
    () =>  [
      {
        Header: 'Terminology Name',
        accessor: 'terminologyName',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({cell}) => (
          <Status value={{code: 1, message: 'Active'}}/>
        )
      },
      {
        Header: 'Last Update',
        accessor: 'lastUpdate'
      },
      {
        Header: 'OrgMapped',
        accessor: 'orgMapped'
      },
      {
        Header: 'Version',
        accessor: 'version'
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableSortBy: true,
        Cell: ({cell: {row: {original: {id}}}}) => (
          <div className='actions'>
            <Link to={`${url}/terminology/${id}`} className='actions__btn' >View</Link>
            <TableDownloadBtn terminology={id} versionsList={[]}/>
          </div>
        )
      }
    ],
    []
  );
  const onExportToExcel = () => {
    console.log('Export to Excel')
  };

  return (
    <div className='page page--terminology-managements'>
      <h1 className='page__title'>National Terminologies</h1>
      <div className='page__table-wrap'>
        <Switch>
          <Route exact path={path}>
            <Table
              onExportToExcel={onExportToExcel}
              columns={terminologiesListColumns}
              data={allTerminologies}
            />
          </Route>
          <Route path={`${path}/terminology/:terminologyId`}>
            <Terminology versionsList={[]} onExportToExcel={onExportToExcel}/>
          </Route>
        </Switch>
      </div>
      <AddNewStandardModal />
      <ViewCodeModal />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    allTerminologies: state.terminology.adminTerminologies,
    userType: state.user.type
  }
};

export default connect(mapStateToProps, null)(NationalTerminologiesPage);