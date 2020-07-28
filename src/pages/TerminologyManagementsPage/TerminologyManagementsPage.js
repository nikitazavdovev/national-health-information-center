import React from "react";
import {
  Link,
  useRouteMatch, Switch, Route
} from "react-router-dom";
import {connect} from 'react-redux';

import './TerminologyManagementsPage.css';

import Button from "../../components/Button/Button";
import AddNewStandardModal from "../../components/AddNewStandardModal/AddNewStandardModal";
import Table from "../../components/Table/Table";

import {openNewStandardModal} from "../../store/actions";
import TableDownloadBtn from "../../components/TableDownloadBtn/TableDownloadBtn";
import Terminology from "../../components/Terminology/Terminology";
import ViewCodeModal from "../../components/ViewCodeModal/ViewCodeModal";
import Status from "../../components/Status/Status";
import NewTerminology from "../../components/NewTerminology/NewTerminology";
import MappingTable from "../../components/MappingTable/MappingTable";

const TerminologyManagementsPage = ({adminTerminologies, userTerminologies, openNewStandardModal, userType}) => {
  const versionsList = [{value: '1.0.0', id: 1}, {value: '1.0.1', id: 2}, {value: '2.0.0', id: 3}];

  let { url, path } = useRouteMatch();

  const onExportToExcel = () => {
    console.log('Export to Excel')
  };

  const terminologiesListColumnsAdmin = React.useMemo(
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
          <Status value={cell.value}/>
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
            <TableDownloadBtn terminology={id} versionsList={versionsList}/>
          </div>
        )
      }
    ],
    []
  );
  const terminologiesListColumnsUser = React.useMemo(
    () =>  [
      {
        Header: 'Local Terminology Name',
        accessor: 'localTerminologyName',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({cell}) => (
          <Status value={cell.value}/>
        )
      },
      {
        Header: 'Last Update',
        accessor: 'lastUpdate'
      },
      {
        Header: 'Codes Mapped',
        accessor: 'codesMapped'
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

  return (
    <div className='page page--terminology-managements'>
      <Switch>
        <Route exact path={path}>
          <h1 className='page__title'>Terminology Managements</h1>
          <div className="page__right-btn">
            <Button onClick={() => openNewStandardModal({basicPath: path})}>
              <span className='icon icon-plus' />
              {userType === 'admin' ? 'Add new Standard' : 'Upload local Terminology'}
            </Button>
          </div>
          <div className='page__table-wrap'>
          <Table
            onExportToExcel={onExportToExcel}
            columns={userType === 'admin' ? terminologiesListColumnsAdmin : terminologiesListColumnsUser}
            data={userType === 'admin' ? adminTerminologies : userTerminologies}
          />
          </div>
        </Route>
        <Route path={`${path}/terminology/:terminologyId`}>
          <h1 className='page__title'>View Terminology</h1>
          <div className='page__table-wrap'>
          {userType === 'admin' ?
            <Terminology versionsList={versionsList} onExportToExcel={onExportToExcel}/> :
            <MappingTable />
          }
          </div>
        </Route>
        <Route path={`${path}/newTerminology`}>
          <h1 className='page__title'>Add New Terminology</h1>
          <div className='page__table-wrap'>
            <NewTerminology />
          </div>
        </Route>
      </Switch>
      <AddNewStandardModal />
      <ViewCodeModal />
    </div>
  )
};

const mapDispatchToProps = {
  openNewStandardModal
};

const mapStateToProps = state => {
  return {
    adminTerminologies: state.terminology.adminTerminologies,
    userTerminologies: state.terminology.userTerminologies,
    userType: state.user.type
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TerminologyManagementsPage);