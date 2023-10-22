import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  // TextInput,
  ScrollView,
  Text,
  // Button,
  TouchableOpacity,
} from "react-native";
import { DataTable, TextInput, Button } from "react-native-paper";
import DateTime from "../components/Purchase/DateTime";

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
  const [printScreen, setPrintScreen] = useState(false);

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

  // get height of table view
  const [tableHeight, setTableHeight] = useState(0);
  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setTableHeight(height);
  };

  // save view as local media in the device
  const onSaveImageAsync = async () => {
    console.log(`tableHeight: ${tableHeight}`);
    try {
      const localUri = await captureRef(imageRef, {
        height: tableHeight,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      console.log(localUri);
      await saveFile(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // adding to auto print album
  async function saveFile(filePath) {
    const albumName = "auto print";
    const permission = await MediaLibrary.requestPermissionsAsync();

    let asset = null;
    if (permission.granted) {
      try {
        asset = await MediaLibrary.createAssetAsync(filePath);
      } catch (e) {
        console.error("MediaLibrary.createAssetAsync failed", e);
      }

      if (asset) {
        try {
          let album = await MediaLibrary.getAlbumAsync(albumName);
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          } else {
            album = await MediaLibrary.createAlbumAsync(
              albumName,
              asset,
              false
            );
          }
          const assetResult = await MediaLibrary.getAssetsAsync({
            first: 1,
            album,
            sortBy: MediaLibrary.SortBy.creationTime,
          });
          asset = await assetResult.assets[0];
        } catch (e) {
          console.error(" failed", e);
        }
      } else {
        console.error("unable to use MediaLibrary, can not create assets");
      }
    }
  }

  return (
    <ScrollView style={styles.parentView}>
      {calculateScreen === false && printScreen === false && (
        <View>
          <View style={styles.container}>
            <TextInput
              label="Length"
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
              label="Girth"
              keyboardType="decimal-pad"
              onSubmitEditing={async () => {
                await lengthRef.current.focus();
                calculateJobWork();
                setLength(null);
                setGirth(null);
              }}
              clearButtonMode="while-editing"
              returnKeyType={"done"}
              style={styles.input}
              value={girth}
              onChangeText={setGirth}
              ref={girthRef}
            />
          </View>
          <Button
            icon="currency-rupee"
            mode="contained"
            style={{
              width: width / 2.2,
              margin: 10,
              alignSelf: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setPrintScreen(true);
            }}
          >
            Add Price
          </Button>
        </View>
      )}
      {printScreen && !calculateScreen && (
        <>
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
            icon="plus"
            mode="contained"
            style={{
              width: width / 2.2,
              margin: 10,
              alignSelf: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              calculateTotalValues();
              setCalculateScreen(true);
            }}
          >
            Calculate
          </Button>
        </>
      )}
      {calculateScreen && (
        <View>
          <DateTime />
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Sr</Text>
              <Text style={styles.headerCell}>Length (ft) </Text>
              <Text style={styles.headerCell}>Girth (in)</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Cubic MTR</Text>
            </View>
          </View>
          {list.map((item, index) => (
            <View style={styles.dataRow} key={index}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item.length}</Text>
              <Text style={styles.cell}>{item.girth}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>
                {item.CMT.toFixed(4)}
              </Text>
            </View>
          ))}
          <View
            style={[
              styles.totalRow,
              { borderTopWidth: 1, borderColor: "#000" },
            ]}
          >
            <Text style={[styles.totalCell, { flex: 3 }]}>Total CMT</Text>
            <Text style={[styles.totalCell, { flex: 1 }]}>
              {totalCMT.toFixed(4)}
            </Text>
          </View>
          <View style={[styles.totalRow]}>
            <Text style={[styles.totalCell, { flex: 3 }]}>Total CFT</Text>
            <Text style={[styles.totalCell, { flex: 1 }]}>
              {totalCFT.toFixed(4)}
            </Text>
          </View>
          <View
            style={[
              styles.totalRow,
              { borderBottomWidth: 1, borderColor: "#000" },
            ]}
          >
            <Text style={[styles.totalCell, { flex: 3 }]}>
              Total Price (@{price})
            </Text>
            <Text style={[styles.totalCell, { flex: 1 }]}>
              {(totalCFT * price).toFixed(2)}
            </Text>
          </View>
          <Button
            icon="printer"
            mode="contained"
            style={{
              width: width / 3,
              alignSelf: "center",
              flex: 1,
              marginTop: 10,
            }}
            onPress={onSaveImageAsync}
          >
            Print
          </Button>
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
    // fontSize: 20,
    width: width / 3,
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
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 20,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  dataRow: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "white",
  },
  cell: {
    flex: 1,
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 5,
  },
  totalCell: {
    flex: 1,
    fontWeight: "bold",
  },
});
