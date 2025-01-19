import React from "react";
// import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";
// const styles = StyleSheet.create({
//   tableContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 24,
//     borderWidth: 1,
//     borderColor: "#000000",
//     width: "60%",
//     borderRadius: 5,
//   },
// });

const ItemsTable = ({ data }) => (
  <Box style={styles.tableContainer}>
    <TableRow items={data} />
  </Box>
);

export default ItemsTable;
