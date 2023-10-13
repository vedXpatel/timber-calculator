import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TableHeader = (props) => {
  const { data, cft, price } = props;

  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Sr</Text>
        <Text style={styles.headerCell}>Length</Text>
        <Text style={styles.headerCell}>Girth</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>CFT</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    // margin: 10,
    width: "100%", // Width spans the screen
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderWidth:1,
    borderColor:'black',
    paddingLeft:20,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  dataRow: {
    flexDirection: "row",
    padding: 5,
  },
  cell: {
    flex: 1,
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    padding: 5,
  },
  totalCell: {
    flex: 1,
    fontWeight: "bold",
  },
});
