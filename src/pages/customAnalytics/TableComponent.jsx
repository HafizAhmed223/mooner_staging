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
  data
}) => {
  console.log("typeof data", typeof data);
  const Data = data?.hasOwnProperty('results') ? data?.results : data
  useEffect(() => {
    getApprovedDocuments(1);
  }, []);
  const history = useHistory()
  const navigate = (value, id) => {
    console.log(value, "asd")
    if (value == "total_no_booking") {
      history.push({
        pathname: `/mooner/obj_booking/${id}`
      });
    }
    if (value == "cancelled_booking") {
      history.push({
        pathname: `/mooner/cancel_booking_object/${id}`,
      })
    }
    if (value == "ongoing_booking") {
      history.push({
        pathname: `/mooner/ongoing_booking_object/${id}`
      })
    }
    if (value === "total_earning") {
      history.push({
        pathname: `/mooner/amout_paid_object/${id}`,
      });
    }
    if (value == "total_sp_earning_mln") {
      history.push({
        pathname: `/mooner/sp_earning_mln_object/${id}`,
      });
    }
    if (value == "total_spent") {
      history.push({
        pathname: `/mooner/ss_object/${id}`
      })
    }
    if (value == "total_sp") {
      history.push({
        pathname: `/mooner/tservice_object/${id}`
      });
    }
    if (value == "stripe_fee_total") {
      history.push({
        pathname: `/mooner/stripe_object/${id}`
      });
      console.log(value, "stripe clicked ")
    }
    if (value == "total_no_users") {
      history.push({
        pathname: `/mooner/details/user_management/${id}`
      })
    }
    if (value == "gas_fee_paid") {
      history.push({
        pathname: `/mooner/gas_object/${id}`
      })
    }
    if (value == "retention_rate") {
      history.push({
        pathname: `/mooner/retention_object/${id}`
      })
    }
    if (value === "service_provided") {
      history.push({
        pathname: `/mooner/single_service/${id}`,
      });
      console.log("Navigate", id);
    }
    if (value == "total_active_users") {
      history.push({
        pathname: `/mooner/active_users_object/${id}`,
      })
    }
    if (value == "total_non_users") {
      history.push({
        pathname: `/mooner/non_active_users_object/${id}`,
      })
    }
    // console.log(id,"id of object")
  };
  return (<>
    <div style={{ overflowX: 'auto' }}>


      <table className="reportTable" id="my-table" >
        <thead>
          <tr>
            {columns?.map((col) => (
              <th key={col.accessor}>
                {col.Header}
                {/* {column.render("Header")} */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tableBody">
          {Data.map((row, index) => (

            <tr key={index}>
              {/* {console.log(row,"row")} */}
              {/* {console.log(columns,"columns")} */}
              {columns.map((col, ind) =>
                typeof row[col.accessor] !== 'undefined' ? (
                  <td key={ind} onClick={() => navigate(col.accessor, row.category_id)} style={{ cursor: 'pointer' }}>
                    {row[col.accessor]}
                  </td>
                ) : (
                  <td key={ind}></td>
                )
              )}
            </tr>
          ))

          }
        </tbody>
      </table>
    </div>

  </>
  )
}

export default TableComponent
