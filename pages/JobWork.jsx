import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Text,
  Button,
} from "react-native";
import { DataTable } from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const JobWork = () => {
  const lengthRef = useRef();
  const girthRef = useRef();

  const [girth, setGirth] = useState();
  const [length, setLength] = useState();
  const [price, setPrice] = useState();
  const [list, setList] = useState([]);
  const [totalCFT, setTotalCFT] = useState(0);
  const [totalCMT, setTotalCMT] = useState(0);
  const [calculateScreen, setCalculateScreen] = useState(false);

  const calculateJobWork = () => {
    const jobWork = (length * girth * girth) / 16 / 10000;
    const cft = jobWork * 35.32;
    setList((prev) => {
      return [
        ...prev,
        {
          length: length,
          girth: girth,
          CMT: jobWork,
          CFT: cft,
        },
      ];
    });
  };

  const calculateTotalValues = () => {
    let tempCFT = 0,
      tempCMT = 0;
    for (let i = 0; i < list.length; ++i) {
      console.log(list[i].CMT);
      tempCFT += list[i].CFT;
      tempCMT += list[i].CMT;
    }
    setTotalCFT(tempCFT);
    setTotalCMT(tempCMT);
  };

  return (
    <ScrollView style={styles.parentView}>
      {calculateScreen === false && (
        <View>
          <View style={styles.container}>
            <TextInput
              placeholder="Length"
              keyboardType="decimal-pad"
              onSubmitEditing={() => {
                girthRef.current.focus();
              }}
              clearButtonMode="while-editing"
              returnKeyType={"done"}
              style={styles.input}
              value={length}
              onChangeText={setLength}
              ref={lengthRef}
            />
            <TextInput
              placeholder="Girth"
              keyboardType="decimal-pad"
              onSubmitEditing={async () => {
                await lengthRef.current.focus();
                calculateJobWork();
                setLength();
                setGirth();
              }}
              clearButtonMode="while-editing"
              returnKeyType={"done"}
              style={styles.input}
              value={girth}
              onChangeText={setGirth}
              ref={girthRef}
            />
          </View>
          <TextInput
            placeholder="Price"
            keyboardType="decimal-pad"
            clearButtonMode="while-editing"
            returnKeyType={"done"}
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
          <Button
            title="Calculate"
            onPress={() => {
              calculateTotalValues();
              setCalculateScreen(true);
            }}
          />
        </View>
      )}
      {calculateScreen && (
        <View>
          <DataTable
            style={{
              position: "relative",
              left: -width / 5,
              width: width + width / 5,
            }}
          >
            <DataTable.Header
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
                borderColor: "black",
                overflow: "hidden",
              }}
            >
              <DataTable.Title
                textStyle={{ fontSize: 17, fontWeight: "bold" }}
                numeric
              >
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
              <DataTable.Title
                textStyle={{ fontSize: 17, fontWeight: "bold" }}
                numeric
              >
                Cubic MTR
              </DataTable.Title>
            </DataTable.Header>
            {list.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell textStyle={{ fontSize: 17 }} numeric>
                  {index + 1}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: 17 }} numeric>
                  {item.length}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: 17 }} numeric>
                  {item.girth}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: 17 }} numeric>
                  {item.CMT.toFixed(4)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Row
              style={{
                borderTopWidth: 1,
                borderColor: "black",
                borderBottomWidth: 0,
                marginLeft: 20,
              }}
            >
              <DataTable.Cell
                textStyle={{ fontSize: 17, fontWeight: "bold" }}
                numeric
              >
                <Text>Total CMT</Text>
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
                <Text>{totalCMT.toFixed(4)}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={{ borderBottomWidth: 0 }}>
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
                <Text>{totalCFT.toFixed(4)}</Text>
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
                <Text>{(totalCFT * price).toFixed(2)}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    fontSize: 20,
    width: width / 3,
    padding: 10,
    alignSelf: "center",
    margin: 10,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    fontSize: 20,
    width: width / 3,
    padding: 10,
    alignSelf: "center",
    margin: 10,
  },
  parentView: {
    height: height,
  },
});
