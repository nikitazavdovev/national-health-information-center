import React, {useState} from "react";

import './MappingTable.css';
import Table from "../Table/Table";
import {openViewMatchesModal} from "../../store/actions";
import {connect} from "react-redux";
import ViewMatchesModal from "../ViewMatchesModal/ViewMatchesModal";
import Button from "../Button/Button";
import SearchField from "../SearchField/SearchField";
import {useLocation, useParams} from "react-router-dom";
import Status from "../Status/Status";
import ActivationStatus from "../ActivationStatus/ActivationStatus";
import {Redirect} from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MappingTable = ({openModal, terminologyMapData}) => {
  const [tableFilter, setTableFilter] = useState(null);
  let query = useQuery();
  let { terminologyId } = useParams();

  const mappingData = terminologyMapData.find(item => item.terminologyId === terminologyId);

  const mappingColumns = React.useMemo(
    () =>  [
      {
        Header: 'Local Code ID',
        accessor: 'localCodeId',
      },
      {
        Header: 'Local Code Description',
        accessor: 'localCodeDescription',
      },
      {
        Header: 'National Code ID',
        accessor: 'nationalCodeId',
      },
      {
        Header: 'National Code Description',
        accessor: 'nationalCodeDescription',
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 140,
        Cell: ({cell}) => (
          <Status value={cell.value}/>
        )
      },
      {
        Header: 'Activation Status',
        accessor: 'activationStatus',
        width: 80,
        Cell: ({cell}) => (
          <ActivationStatus value={cell.value}/>
        )
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({cell: {row: {original}}}) => {
          if(original.status.code === 2) {
            return (
              <div className='actions'>
                <button className='actions__btn' onClick={() => openModal({codeData: original, terminologyData: {terminologyId: mappingData.terminologyId}})}>View matches</button>
              </div>
            )
          } else {
            return null
          }
        }
      }
    ],
    []
  );

  if(!mappingData) return <Redirect to={'/terminology-managements'}/>;

  const tableData = () => {
    const searchParams = query.get('search');
    mappingData.data.filter(item => item.localCodeDescription.includes(searchParams));
    if(tableFilter === null) {
      return mappingData.data;
    } else {
      return mappingData.data.filter(item => {
        return item.status.code === tableFilter
      });
    }
  };

  return (
    <>
      <div className='table__controls'>
        <div className='filter-buttons'>
          <Button light={tableFilter !== 1} onClick={() => setTableFilter(1)}>Show fully mapped</Button>
          <Button light={tableFilter !== 2} onClick={() => setTableFilter(2)}>Show partially mapped</Button>
          <Button light={tableFilter !== 0} onClick={() => setTableFilter(0)}>Show unmapped</Button>
          <Button light={tableFilter !== null} onClick={() => setTableFilter(null)}>Show all</Button>
        </div>
        <div className='search-field'>
          <SearchField placeholder={'Search for code...'}/>
        </div>
      </div>
      <Table
        columns={mappingColumns}
        data={tableData()}
        paginate={25}
      />
      <ViewMatchesModal />
    </>
  )
};

const mapDispatchToProps = {
  openModal: openViewMatchesModal,
};

const mapStateToProps = state => {
  return {
    terminologyMapData: state.terminology.terminologyMapData
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(MappingTable);