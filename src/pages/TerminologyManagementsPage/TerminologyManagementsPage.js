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

const TerminologyManagementsPage = ({adminTerminologies, userTerminologies, openNewStandardModal, userRole}) => {
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
        Cell: ({cell: {row: {original: {terminologyName}}}}) => (
          <div className='actions'>
            <Link to={`${url}/terminology/${terminologyName}`} className='actions__btn' >View</Link>
            <TableDownloadBtn terminology={terminologyName} versionsList={versionsList}/>
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
        Cell: ({cell: {row: {original: {localTerminologyName}}}}) => (
          <div className='actions'>
            <Link to={`${url}/terminology/${localTerminologyName}`} className='actions__btn' >View</Link>
            <TableDownloadBtn terminology={localTerminologyName} versionsList={[]}/>
          </div>
        )
      }
    ],
    []
  );

  return (
    <div className='page page--terminology-managements'>
      <h1 className='page__title'>Terminology Managements</h1>
      <div className="page__right-btn">
        <Button onClick={() => openNewStandardModal({basicPath: path})}>
          <span className='icon icon-plus' />
          {userRole === 'admin' ? 'Add new Standard' : 'Upload local Terminology'}
        </Button>
      </div>
      <div className='page__table-wrap'>
      <Switch>
        <Route exact path={path}>
          <Table
            onExportToExcel={onExportToExcel}
            columns={userRole === 'admin' ? terminologiesListColumnsAdmin : terminologiesListColumnsUser}
            data={userRole === 'admin' ? adminTerminologies : userTerminologies}
          />
        </Route>
        <Route path={`${path}/terminology/:terminologyName`}>
          {userRole === 'admin' ?
            <Terminology versionsList={versionsList} onExportToExcel={onExportToExcel}/> :
            <MappingTable />
          }

        </Route>
        <Route path={`${path}/newTerminology`}>
          <NewTerminology />
        </Route>
      </Switch>
      </div>
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
    userRole: state.user.role
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TerminologyManagementsPage);