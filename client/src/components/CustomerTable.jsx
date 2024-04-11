import React from "react";
import { FaCaretDown, FaCaretUp, FaSort } from "react-icons/fa";
import { useTable, useSortBy, usePagination } from "react-table";
import AdminPagination from "./AdminPagination";
const CustomerTable = ({ columns, data, handleChange }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageOptions,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
  } = useTable({ columns, data }, useSortBy, usePagination);
  const startPage = Math.max(1, pageIndex - 3);
  const endPage = Math.min(pageOptions.length, startPage + 4);

  return (
    <div className="reactTableMain">
      <div style={{ overflow: "auto" }}>
        <table className="reactTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr
                className="reactTableTr"
                key={index}
                style={{ backgroundColor: "#f3f4f6" }}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    className="reactTableTh"
                    key={columnIndex}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span className="reactTableSorted">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaCaretDown size={12} />
                        ) : (
                          <FaCaretUp size={12} />
                        )
                      ) : (
                        <FaSort size={12} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  onClick={() => {
                    handleChange(row.original);
                  }}
                  className="reactTableTr"
                  key={index}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        width: "100%",
                        textAlign: "center",
                      }}
                      className="reactTableTd"
                      key={cellIndex}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length === 0 ? (
        <div className="no-data-message">
          Unfortunately, we couldn't find any data that matches your criteria.
        </div>
      ) : (
        <AdminPagination
          startPage={startPage}
          endPage={endPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          pageIndex={pageIndex}
          totalPageCount={pageOptions.length}
          key={pageIndex}
        />
      )}
    </div>
  );
};

export default CustomerTable;
