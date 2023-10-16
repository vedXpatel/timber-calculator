import React from "react";
import { DataTable } from "react-native-paper";
import { Text, Dimensions, StyleSheet, View } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const GrandCalculations = (props) => {
  const { grandCFT, grandPrice } = props;
  return (
    <View>
      <View
        style={[styles.totalRow]}
      >
        <Text style={[styles.totalCell, { flex: 3 }]}>Grand CFT</Text>
        <Text style={[styles.totalCell, { flex: 1 }]}>{grandCFT.toFixed(4)}</Text>
      </View>
      <View
        style={[styles.totalRow, { borderBottomWidth: 1, borderColor: "#000" }]}
      >
        <Text style={[styles.totalCell, { flex: 3 }]}>
          Grand Price
        </Text>
        <Text style={[styles.totalCell, { flex: 1 }]}>{grandPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 10,
    width: "100%", // Width spans the screen
  },
  headerRow: {
    flexDirection: "row",
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
  },
  cell: {
    flex: 1,
  },
  totalRow: {
    flexDirection: "row",
    paddingLeft:20,
    padding: 2,
  },
  totalCell: {
    flex: 1,
    fontWeight: "bold",
  },
});
