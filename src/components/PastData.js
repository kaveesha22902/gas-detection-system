import React from "react";
import { useTable, usePagination } from "react-table";

const PastData = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "MQ2",
        accessor: "MQ2", // accessor is the key in data
      },
      {
        Header: "MQ6",
        accessor: "MQ6",
      },
      {
        Header: "Weight",
        accessor: "Weight",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of rows, use page
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Start on page 0 and show 10 rows per page
    },
    usePagination
  );

  return (
    <div>
      <table
        {...getTableProps()}
        style={{ width: "100%", border: "1px solid black" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    color: "black",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center items-center my-6">
        {/* <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="m-2 px-8 py-3 bg-teal-700 rounded text-black"
        >
          {"<<"}
        </button> */}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="m-2 px-8 py-3 bg-teal-700 rounded text-black"
        >
          {"<"}
        </button>

        <span className="m-2 text-black">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="m-2 px-8 py-3 bg-teal-700 rounded text-black"
        >
          {">"}
        </button>

        {/* <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
          className="m-2 px-8 py-3 bg-teal-700 rounded text-black"
        >
          {">>"}
        </button> */}
        {/* <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default PastData;
