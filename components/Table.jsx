import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export const Table = (props) => {
  const { data, cft, price, tableIndex, setTableIndex } = props;

  return (
    <View style={styles.table}>
      {data.map((item, index) => {
        return (
          <View style={styles.dataRow} key={index}>
            <Text style={styles.cell}>{tableIndex + index + 1}</Text>
            <Text style={styles.cell}>{item.length}</Text>
            <Text style={styles.cell}>{item.girth}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.CFT.toFixed(4)}</Text>
          </View>
        );
      })}
      <View style={[styles.totalRow, { borderTopWidth: 1, borderColor: "#000" }]}>
        <Text style={[styles.totalCell, { flex: 3 }]}>Total CFT</Text>
        <Text style={[styles.totalCell, { flex: 1 }]}>{cft.toFixed(4)}</Text>
      </View>
      <View style={[styles.totalRow, { borderBottomWidth: 1, borderColor: "#000" }]}>
        <Text style={[styles.totalCell, { flex: 3 }]}>Total Price (@{price})</Text>
        <Text style={[styles.totalCell, { flex: 1 }]}>{(cft * price).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: "100%", // Width spans the screen
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  dataRow: {
    flexDirection: "row",
    padding: 5,
    paddingTop: 0,
    paddingLeft: 20,
  },
  cell: {
    flex: 1,
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    padding: 5,
    paddingTop: 0,
    paddingLeft: 20,
  },
  totalCell: {
    flex: 1,
    fontWeight: "bold",
  },
});
