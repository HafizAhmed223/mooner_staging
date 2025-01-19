import React, { FC, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom'
import TablePagination from "../../common/pagination/Pagination";
import moment from 'moment'
import {
  Typography,
  Container,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Menu,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import {
  getApprovedDocuments,
  deleteApprovedAction,
} from "../../redux/actions/document/document.action";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { useHistory } from "react-router-dom";

const TableComponent = ({
  columns,
  data,
  date,
  endDate,
  currentPage,
  setCurrentPage,
  totalPages
}) => {

  const history = useHistory();

  const navigate = (value,category_id) => {
    if (value == "total_no_refund") {
      history.push({
        pathname: "/mooner/details/refund_details",
        state: { date: date, endDate: endDate, category_id: category_id },
      });
    }
    else if (value == "total_no_cancelled_booking") {
      history.push({
        pathname: "/mooner/bookings_listing",
        state: {
          date: date,
          endDate: endDate,
          category_id: category_id
        },
      });
    }
  };

  useEffect(() => {
    getApprovedDocuments(1);
  }, []);
  useEffect(() => {
    // setTotalPages(Math.ceil(data?.length / 10));
  }, [data]);

  // const [totalPages, setTotalPages] = useState(totalPages);
  // const [currentPage, setCurrentPage] = useState(1);

  // console.log(currentPage)
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,

    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data: data,
    },
    useGlobalFilter,
    usePagination
  );

  return (<>
    <div style={{ overflowX: 'auto' }}>

      <table className="reportTable" id="my-table" >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr >
              {headerGroup.headers.map((column) => (
                <th >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="tableBody">
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col, ind) =>
                typeof row[col.accessor] !== 'undefined' ? (
                  <td key={ind} onClick={() => navigate(col.accessor,row.category_id)} style={{cursor : (col.link==true?'pointer':'')}}>
                    {row[col.accessor]}
                  </td>
                ) : (
                  <></>
                )
              )}
            </tr>
          ))

          }
        </tbody>
      </table>
      {/* <table className="reportTable"{...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="tableBody" {...getTableBodyProps()}>

          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                className="roundBorder"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
    {/* {data && data.length > 0 && columns.length>0 &&(
      <TablePagination
        totalPages={totalPages}
        count={data?.length}
        currentPage={currentPage}
        getPageDataAction={getApprovedDocuments}
        setCurrentPage={setCurrentPage}
      />
    )} */}
  </>
  )
}

export default TableComponent
