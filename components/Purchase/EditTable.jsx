import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Table = (props) => {
  const { cft, price, billNumber } = props;
  const [data, setData] = useState([]);
  const [tableIndex, setTableIndex] = useState(1);
  const [dateTime, setDateTime] = useState("");
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    saveData();
  }, [data, tableIndex, dateTime]);

  const saveData = async () => {
    try {
      const dataToSave = {
        tableIndex,
        data,
        dateTime,
      };
      await AsyncStorage.setItem("tableData", JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const retrieveData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("tableData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setTableIndex(parsedData.tableIndex);
        setData(parsedData.data);
        setDateTime(parsedData.dateTime);
      }
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  const addRow = () => {
    if (editable) {
      setData([...data, { length: 0, girth: 0, CFT: 0 }]);
      setTableIndex(tableIndex + 1);
    }
  };

  const editCell = (rowIndex, cellName, value) => {
    if (editable) {
      const newData = [...data];
      newData[rowIndex][cellName] = value;
      setData(newData);
    }
  };

  return (
    <View style={styles.table}>
      <Text style={styles.billNumber}>Bill No: {billNumber}</Text>
      <Text style={styles.dateTime}>{dateTime}</Text>
      {data.map((item, index) => (
        <View style={styles.dataRow} key={index}>
          <Text style={styles.cell}>
            {tableIndex - data.length + index + 1}
          </Text>
          <Text style={styles.cell}>
            <TextInput
              value={item.length.toString()}
              onChangeText={(value) => editCell(index, "length", value)}
              editable={editable}
            />
          </Text>
          <Text style={styles.cell}>
            <TextInput
              value={item.girth.toString()}
              onChangeText={(value) => editCell(index, "girth", value)}
              editable={editable}
            />
          </Text>
          <Text style={[styles.cell, { flex: 1 }]}>{item.CFT.toFixed(4)}</Text>
        </View>
      ))}
      <Button
        title={editable ? "Add Row" : "Not Editable"}
        onPress={addRow}
        disabled={!editable}
      />
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
