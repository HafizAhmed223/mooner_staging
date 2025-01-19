import React, { Fragment } from "react";
// import { Text, View, StyleSheet } from "@react-pdf/renderer";
const borderColor = "#000000";
const height = 50;
const paddingTop = 23;
const paddingRight = 20;
const paddingLeft = 8;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: "center",
    height: height,
    fontSize: 9,
  },
  column1: {
    width: "70%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: paddingLeft,
    height: height,
    paddingTop: paddingTop,
  },
  column2: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 0,
    textAlign: "right",
    paddingRight: paddingRight,
    height: height,
    paddingTop: paddingTop,
  },
});

const TableRow = ({ items }) => {
  return (
    <>
      <View style={styles.row} key="key1">
        <Text style={styles.column1}>Total Number of Users:</Text>
        <Text style={{ ...styles.column2, fontWeight: "bold" }}>
          {items.service_seeker}
        </Text>
      </View>
      <View style={styles.row} key="key2">
        <Text style={styles.column1}>Total number of service providers:</Text>
        <Text style={styles.column2}>{items.service_provider}</Text>
      </View>
      <View style={styles.row} key="key3">
        <Text style={styles.column1}>Total number of Bookings:</Text>
        <Text style={styles.column2}>{items.bookings}</Text>
      </View>
      <View style={styles.row} key="key4">
        <Text style={styles.column1}>
          Total amount paid out (From completed jobs):
        </Text>
        <Text style={styles.column2}>{items.total_jobs_earned}</Text>
      </View>
      <View style={styles.row} key="key5">
        <View style={{ ...styles.column1, paddingTop: paddingTop - 4 }}>
          <Text style={{ marginBottom: 1 }}>Total amount earned on app.</Text>
          <Text>Total MNR top up + Total completed jobs amount):</Text>
        </View>
        <Text style={styles.column2}>{items.total_app_earned}</Text>
      </View>
      <View style={styles.row} key="key6">
        <Text style={styles.column1}>Total amount of paid out MNR's</Text>
        <Text style={styles.column2}>{items.total_mnr_payouts}</Text>
      </View>
      <View
        style={{ ...styles.row, height: height + height, paddingLeft: 0 }}
        key="key7"
      >
        <View
          style={{ ...styles.column1, height: height + height, paddingLeft: 0 }}
          key="key8"
        >
          <Text style={{ paddingLeft: paddingLeft }}>
            Total numbers of complaints:
          </Text>
          <View
            style={{
              ...styles.row,
              marginTop: 16,
              borderBottomWidth: 0,
              borderTopWidth: 1,
              borderTopColor: borderColor,
            }}
            key="key9"
          >
            <Text
              style={{
                ...styles.column1,
                width: "50%",
                paddingLeft: 0,
                textAlign: "center",
              }}
            >
              Pending:&nbsp;{items.service_seeker}
            </Text>
            <Text
              style={{
                ...styles.column2,
                width: "50%",
                paddingRight: 0,
                textAlign: "center",
              }}
            >
              completed:&nbsp;{items.completed_complains}
            </Text>
          </View>
        </View>
        <Text
          style={{ ...styles.column2, height: height + height, paddingTop: 30 }}
        >
          {items.complains}
        </Text>
      </View>
      {/* <View style={{ ...styles.row, borderBottomWidth: 0 }} key="key10">
        <Text style={styles.column1}>Total Number of shares on Social Media</Text>
        <Text style={styles.column2}>{items.service_seeker}</Text>
      </View> */}
    </>
  );
};

export default TableRow;
