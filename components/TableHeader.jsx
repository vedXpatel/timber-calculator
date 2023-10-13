import React from "react";
import { DataTable } from "react-native-paper";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const TableHeader = (props) => {
  return (
    <DataTable.Header
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "black",
        borderColor: "black",
        overflow: "hidden",
      }}
    >
      <DataTable.Title textStyle={{ fontSize: 17, fontWeight: "bold" }} numeric>
        Sr.
      </DataTable.Title>
      <DataTable.Title
        textStyle={{ fontSize: 17, fontWeight: "bold" }}
        style={{ position: "relative", left: 20 }}
        numeric
      >
        Length (ft)
      </DataTable.Title>
      <DataTable.Title
        textStyle={{ fontSize: 17, fontWeight: "bold" }}
        style={{ position: "relative", left: 20 }}
        numeric
      >
        Girth (in)
      </DataTable.Title>
      <DataTable.Title textStyle={{ fontSize: 17, fontWeight: "bold" }} numeric>
        CFT
      </DataTable.Title>
    </DataTable.Header>
  );
};
