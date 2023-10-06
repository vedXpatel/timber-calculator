import React from "react";
import { DataTable } from "react-native-paper";
import { Text, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const Table = (props) => {
  const { data, cft, price } = props;
  return (
    <DataTable
      style={{
        position: "relative",
        left: -width / 5,
        width: width + width / 5,
      }}
    >
      {data.map((item, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell numeric textStyle={{ fontSize: 17 }}>
            {index + 1}
          </DataTable.Cell>
          <DataTable.Cell numeric textStyle={{ fontSize: 17 }}>
            {item.length}
          </DataTable.Cell>
          <DataTable.Cell numeric textStyle={{ fontSize: 17 }}>
            {item.girth}
          </DataTable.Cell>
          <DataTable.Cell numeric textStyle={{ fontSize: 17 }}>
            {item.CFT.toFixed(4)}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
      <DataTable.Row
        style={{
          borderTopWidth: 1,
          borderColor: "black",
          borderBottomWidth: 0,
        }}
      >
        <DataTable.Cell
          textStyle={{ fontSize: 17, fontWeight: "bold" }}
          numeric
        >
          <Text>Total CFT</Text>
        </DataTable.Cell>
        <DataTable.Cell
          textStyle={{ fontSize: 17, fontWeight: "bold" }}
          numeric
        >
          <Text>:</Text>
        </DataTable.Cell>
        <DataTable.Cell
          textStyle={{ fontSize: 17, fontWeight: "bold" }}
          numeric
        >
          <Text>{cft.toFixed(4)}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "black",
          borderColor: "black",
          overflow: "hidden",
        }}
      >
        <DataTable.Cell
          textStyle={{
            fontSize: 17,
            fontWeight: "bold",
            left: width / 3.3,
            width: width / 2,
          }}
          numeric
        >
          <Text>Total Price (@ {price})</Text>
        </DataTable.Cell>
        <DataTable.Cell
          textStyle={{ fontSize: 17, fontWeight: "bold" }}
          numeric
        >
          <Text>:</Text>
        </DataTable.Cell>
        <DataTable.Cell
          textStyle={{ fontSize: 17, fontWeight: "bold" }}
          numeric
        >
          <Text>{(cft * price).toFixed(2)}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
