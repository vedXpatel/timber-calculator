import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { TableHeader } from "./TableHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EditTable = (props) => {
  const { data, billNo, date, time } = props;
  const [dateTime, setDateTime] = useState("");
  const [editable, setEditable] = useState(true);
  const [totalCFT, setTotalCFT] = useState(0);
  const [grandCFT, setGrandCFT] = useState(0);

  const editCell = (rowIndex, cellName, value) => {};

  return (
    <View style={styles.table}>
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Text style={styles.label}>Bill No.: </Text>
                <Text style={styles.value}>{billNo}</Text>
            </View>
            <View style={styles.dateTimeColumn}>
            <View style={styles.rightColumn}>
                <Text style={styles.label}>Date: </Text>
                <Text style={styles.value}>{date}</Text>
            </View>
            <View style={styles.rightColumn}>
                <Text style={styles.label}>Time: </Text>
                <Text style={styles.value}>{time}</Text>
            </View>
            </View>
        </View>
        <TableHeader />
      {console.log(`data: ${data}`)}
      {data.map((item) => (
        <View>
          {console.log(`item inside data: ${item}`)}
          {item.map((i) => {
            return <View>{console.log(i.length)}</View>;
          })}
        </View>
      ))}
      {data.map((item, index) => (
        <View>
          {console.log(`item inside purchase history: ${item}`)}
          {item.map((i, j) => (
            <View style={styles.dataRow} key={j}>
              <Text style={styles.cell}>1</Text>
              <Text style={styles.cell}>{i.length}</Text>
              <Text style={styles.cell}>{i.girth}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{i.CFT.toFixed(4)}</Text>
            </View>
          ))}
          <View
            style={[
              styles.totalRow,
              { borderTopWidth: 1, borderColor: "#000" },
            ]}
          >
            <Text style={[styles.totalCell, { flex: 3 }]}>Total CFT</Text>
            <Text style={[styles.totalCell, { flex: 1 }]}>{totalCFT.toFixed(4)}</Text>
          </View>
          <View
            style={[
              styles.totalRow,
              { borderBottomWidth: 1, borderColor: "#000" },
            ]}
          >
            <Text style={[styles.totalCell, { flex: 3 }]}>Total Price</Text>
            {/* <Text style={[styles.totalCell, { flex: 1 }]}>{(cft * price).toFixed(2)}</Text> */}
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
    width: "+100%", // Width spans the screen
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
    // backgroundColor: "#e0e0e0",
    padding: 2,
    paddingTop: 0,
    paddingLeft: 20,
  },
  totalCell: {
    flex: 1,
    fontWeight: "bold",
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
},
leftColumn: {
    flexDirection: 'row',
},
rightColumn: {
    flexDirection: 'row',
},
label: {
    fontSize: 16,
    fontWeight: 'bold',
},
value: {
    fontSize: 16,
},
dateTimeColumn: {
    flexDirection: 'column',
}
});
