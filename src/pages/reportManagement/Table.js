import React from "react";

import ItemsTable from "./ItemsTable";
import Vector1 from "../../assets/images/Vector1.png";
import moonerfooter from "../../assets/images/moonerfooter.png";
import { Box, Typography } from "@material-ui/core";
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  subject: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
    marginTop: 50,
  },
  imageFooter: {
    height: 50,
    marginTop: 50,
  },
});

const Table = ({ data }) => (
  <Box>
    <img src={Vector1} />
    <Box style={styles.subject}>
      <Typography>Report Management</Typography>
    </Box>
    <Box style={styles.subject}>
      <ItemsTable data={data} />
    </Box>
    <Box style={styles.subject}>
      <img style={styles.imageFooter} src={moonerfooter} />
    </Box>
  </Box>
);

export default Table;
