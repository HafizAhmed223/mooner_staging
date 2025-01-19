import React, { useMemo } from "react";
import { useTable } from "react-table";

import { Grid, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
  },
}));

const TableBase = (props) => {
  const classes = useStyles();
  //("props.DATA", props.DATA);
  // const columns = useMemo(() => props.COLUMNS, []);
  // const data = useMemo(() => props.DATA, []);
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable({
      columns: props.COLUMNS,
      data: props.DATA,
    });

  return (
    <Container maxWidth="xl">
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <table className="reportTable" {...getTableProps()}>
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
              {rows.map((row) => {
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
          </table>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TableBase;
