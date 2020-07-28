import React, {useState} from "react";
import {Link, Route, Switch, useLocation, useParams, useRouteMatch} from "react-router-dom";

import './Terminology.css';
import Dropdown from "../Dropdown/Dropdown";
import Table from "../Table/Table";
import {db} from "../../utils/fakeApi";
import {connect} from "react-redux";
import {openViewCodeModal} from "../../store/actions";
import TableVersion from "../TableVersion/TableVersion";
import Button from "../Button/Button";
import SearchField from "../SearchField/SearchField";
import Status from "../Status/Status";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Terminology = (props) => {
  const {versionsList, onExportToExcel, userType, terminologiesList} = props;
  const [terminologyVersion, setTerminologyVersion] = useState(versionsList[0]);
  const [tableFilter, setTableFilter] = useState('active');
  let { terminologyId } = useParams();
  let query = useQuery();

  const terminologyData = db.getAll(terminologyId, terminologiesList);

  const terminologyCodesColumns = React.useMemo(
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
        Header: 'Code ID',
        accessor: 'codeId',
        // ...editableColumnProps
      },
      {
        Header: 'Description',
        accessor: 'description',
        // ...editableColumnProps
      },
      {
        Header: 'Status',
        accessor: 'status',
        filter: 'status',
        Cell: ({cell}) => (
          <Status value={cell.value}/>
        )
      },
      {
        Header: 'Last Update',
        accessor: 'lastUpdate'
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableSortBy: true,
        Cell: ({row}) => (
          <div className='actions'>
            <button onClick={() => props.openViewCodeModal(row.original)} className='actions__btn' >View Details</button>
          </div>
        )
      }
    ],
    []
  );
  if (userType === 'admin') {
    terminologyCodesColumns.splice(6, 0,
      {
        Header: 'OrgMapped',
        accessor: 'orgMapped'
      },
      {
        Header: 'Version',
        accessor: 'version',
        Cell: (props) => (<TableVersion version={props.value} isLatest={props.row.original.isLatest}/>)
      },
      )
  }

  // const generatedTerminologyData = React.useMemo(() => makeData(terminologyName,10000));

  const tableData = () => {
    const searchParams = query.get('search');
    terminologyData.filter(item => item.description.includes(searchParams));
    if(tableFilter === 'all') {
      return terminologyData;
    } else {
      return terminologyData.filter(item => {
        return item.status.message.toLowerCase() === tableFilter
      });
    }
  };

  return (
    <>
      <div className='table__controls'>
        {userType === 'admin' &&
        <>
        <Dropdown
          list={versionsList}
          placeholder={'select version'}
          onSelect={({value}) => setTerminologyVersion(value)}
          wrapClassName={'version-dropdown'}
          dropDownClassName={'version-dropdown__body'}
          selected={terminologyVersion}
        />
        <div className='filter-buttons'>
          <Button light={tableFilter !== 'active'} onClick={() => setTableFilter('active')}>Show active</Button>
          <Button light={tableFilter !== 'inactive'} onClick={() => setTableFilter('inactive')}>Show inactive</Button>
          <Button light={tableFilter !== 'all'} onClick={() => setTableFilter('all')}>Show all</Button>
        </div>
        </>
          }
        <div className='search-field'>
          <SearchField placeholder={'Search for code...'}/>
        </div>
      </div>
      <Table
        onExportToExcel={onExportToExcel}
        columns={terminologyCodesColumns}
        data={tableData()}
        paginate={5}
      />
      </>
  )
};

const mapDispatchToProps = {
  openViewCodeModal
};

const mapStateToProps = state => {
  return {
    userType: state.user.type,
    terminologiesList: state.terminology.adminTerminologies
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminology);