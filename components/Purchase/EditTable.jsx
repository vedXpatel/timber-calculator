import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EditTable = (props) => {
  const { data, billNumber,  } = props;
  // const [data, setData] = useState([]);
  const [tableIndex, setTableIndex] = useState(1);
  const [dateTime, setDateTime] = useState("");
  const [editable, setEditable] = useState(true);

  const editCell = (rowIndex, cellName, value) => {

  };

  return (
    <View style={styles.table}>
      <Text style={styles.billNumber}>Bill No: {billNumber}</Text>
      <Text style={styles.dateTime}>{dateTime}</Text>
      {data.map((item, index) => (
          <View>
          {
            item.map((i, j) => (
                <View style={styles.dataRow} key={j}>
                  <Text style={styles.cell}>
                    {tableIndex - data.length + j + 1}
                  </Text>
                  <Text style={styles.cell}>
                    <TextInput
                        value={i.length.toString()}
                        onChangeText={(value) => editCell(j, "length", value)}
                        editable={editable}
                    />
                  </Text>
                  <Text style={styles.cell}>
                    <TextInput
                        value={i.girth.toString()}
                        onChangeText={(value) => editCell(j, "girth", value)}
                        editable={editable}
                    />
                  </Text>
                  <Text style={[styles.cell, {flex: 1}]}>{i.CFT.toFixed(4)}</Text>
                </View>
            ))
          }
            <View style={[styles.totalRow, { borderTopWidth: 1, borderColor: "#000" }]}>
              <Text style={[styles.totalCell, { flex: 3 }]}>Total CFT</Text>
              <Text style={[styles.totalCell, { flex: 1 }]}>{cft.toFixed(4)}</Text>
            </View>
            <View
                style={[styles.totalRow, { borderBottomWidth: 1, borderColor: "#000" }]}
            >
              <Text style={[styles.totalCell, { flex: 3 }]}>
                Total Price (@{price})
              </Text>
              <Text style={[styles.totalCell, { flex: 1 }]}>{(cft * price).toFixed(2)}</Text>
            </View>
          </View>
      ))}
      <Button
        title={editable ? "Add Row" : "Not Editable"}
        disabled={!editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: "100%",
    paddingHorizontal: 10,
  },
  billNumber: {
    textAlign: "left",
    paddingVertical: 5,
    fontWeight: "bold",
  },
  dateTime: {
    textAlign: "right",
    paddingVertical: 5,
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
    paddingTop: 0,
    paddingLeft: 20,
  },
  totalCell: {
    flex: 1,
    fontWeight: "bold",
  },
});
