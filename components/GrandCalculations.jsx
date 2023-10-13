import React from "react";
import { DataTable } from "react-native-paper";
import { Text, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const GrandCalculations = (props) => {
  const { grandCFT, grandPrice } = props;
  return (
    <DataTable
      style={{
        position: "relative",
        left: -width / 5,
        width: width + width / 5,
      }}
    >
      <DataTable.Row
        style={{
          overflow: "hidden",
          marginTop: -height / 75,
          marginBottom: -height/70,
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
          <Text>Grand CFT </Text>
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
          <Text>{grandCFT.toFixed(4)}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "black",
          borderColor: "black",
          overflow: "hidden",
          marginTop: -height / 75,
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
          <Text>Grand Price</Text>
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
          <Text>{grandPrice.toFixed(2)}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
