import React from "react";
import {useTable, useSortBy, usePagination, useFilters} from 'react-table';

import './Table.css';

const Table = ({onExportToExcel, columns, data, filter, paginate = false}) => {

  const tableSize = paginate ? paginate : data.length;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    pageCount,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      data,
      columns,
      initialState: { pageIndex: 0, pageSize: tableSize },
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  return (
    <>
      {onExportToExcel &&
        <button className='table-export' onClick={() => onExportToExcel()}>
          <span className='icon icon-microsoftexcel' />
          <span className='text'>Export to Excel</span>
        </button>
      }

  <div className='table-wrap'>
      <table {...getTableProps()} className='table'>
        <thead className='table__head'>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th width={column.width} {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div className='table__head-text'>
                  <h3>
                    {column.render('Header')}
                    <span className={`icon icon-move-${column.isSorted ? (column.isSortedDesc ? 'up' : 'down') : ''}`}/>
                  </h3>
                </div>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()} className='table__body'>
        {page.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          )
        })}
        </tbody>
      </table>
  </div>
      {paginate && data.length > paginate &&
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
            Page{' '}
          <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        <span>
      | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
      </div>
      }
      </>
  )
};

export default Table;