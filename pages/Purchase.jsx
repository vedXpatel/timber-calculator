import {
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table } from "../components/Table";
import { GrandCalculations } from "../components/GrandCalculations";
import { TableHeader } from "../components/TableHeader";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Purchase = ({ navigation }) => {
  const [length, setLength] = useState();
  const [girth, setGirth] = useState();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) {
    requestPermission();
  }
  const imageRef = useRef();
  const [oneToEleven, setOneToEleven] = useState([]);
  const [TwelveToSeventeen, setTwelveToSeventeen] = useState([]);
  const [EighteenToTwentyThree, setEighteenToTwentyThree] = useState([]);
  const [TwentyFourToTwentyNine, setTwentyFourToTwentyNine] = useState([]);
  const [ThirtyToThirtyFive, setThirtyToThirtyFive] = useState([]);
  const [ThirtySixToFortySeven, setThirtySixToFortySeven] = useState([]);
  const [FortyEightAbove, setFortyEightAbove] = useState([]);

  const [oneToElevenPrice, setOneToElevenPrice] = useState();
  const [TwelveToSeventeenPrice, setTwelveToSeventeenPrice] = useState();
  const [EighteenToTwentyThreePrice, setEighteenToTwentyThreePrice] =
    useState();
  const [TwentyFourToTwentyNinePrice, setTwentyFourToTwentyNinePrice] =
    useState();
  const [ThirtyToThirtyFivePrice, setThirtyToThirtyFivePrice] = useState();
  const [ThirtySixToFortySevenPrice, setThirtySixToFortySevenPrice] =
    useState();
  const [FortyEightAbovePrice, setFortyEightAbovePrice] = useState();

  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [six, setSix] = useState(0);
  const [seven, setSeven] = useState(0);
  const [isPriceScreen, setIsPriceScreen] = useState(false);
  const [isInvoiceScreen, setIsInvoiceScreen] = useState(false);

  const [tableIndex, setTableIndex] = useState(1);

  const girthRef = useRef();
  const lengthRef = useRef();
  const price1Ref = useRef();
  const price2Ref = useRef();
  const price3Ref = useRef();
  const price4Ref = useRef();
  const price5Ref = useRef();
  const price6Ref = useRef();
  const price7Ref = useRef();

  const [list, setList] = useState([]);

  const [grandCFT, setGrandCFT] = useState(0);
  const [grandPrice, setGrandPrice] = useState(0);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const calculateCft = () => {
    const CFT = (length * girth * girth) / 2304;
    setList((prev) => {
      return [
        ...prev,
        {
          length: length,
          girth: girth,
          CFT: CFT,
        },
      ];
    });
  };

  const storeListInAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getListFromAsyncStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseAsyncStorageSize = async () => {
    try {
      await AsyncStorage.setItem("dummyKey", "dummyValue");
      await AsyncStorage.removeItem("dummyKey");
      await AsyncStorage.setMaxSize(100 * 1024 * 1024); // 100 MB
    } catch (error) {
      console.log(error);
    }
  };

  const categorize = () => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].girth < 12 && list[i].girth > 0) {
        setOneToEleven((prev) => {
          return [...prev, list[i]];
        });
      } else if (list[i].girth < 18) {
        setTwelveToSeventeen((prev) => {
          return [...prev, list[i]];
        });
      } else if (list[i].girth < 24) {
        setEighteenToTwentyThree((prev) => {
          return [...prev, list[i]];
        });
      } else if (list[i].girth < 30) {
        setTwentyFourToTwentyNine((prev) => {
          return [...prev, list[i]];
        });
      } else if (list[i].girth < 36) {
        setThirtyToThirtyFive((prev) => {
          return [...prev, list[i]];
        });
      } else if (list[i].girth < 48) {
        setThirtySixToFortySeven((prev) => {
          return [...prev, list[i]];
        });
      } else if (list[i].girth >= 48) {
        setFortyEightAbove((prev) => {
          return [...prev, list[i]];
        });
      }
    }
  };

  const categoryTotalCFT = () => {
    let temp = 0;
    let temp2 = 0;
    let temp3 = 0;
    let temp4 = 0;
    let temp5 = 0;
    let temp6 = 0;
    let temp7 = 0;
    for (let i = 0; i < oneToEleven.length; i++) {
      temp += +oneToEleven[i].CFT;
    }
    for (let i = 0; i < TwelveToSeventeen.length; i++) {
      temp2 += +TwelveToSeventeen[i].CFT;
    }
    for (let i = 0; i < EighteenToTwentyThree.length; i++) {
      temp3 += +EighteenToTwentyThree[i].CFT;
    }
    for (let i = 0; i < TwentyFourToTwentyNine.length; i++) {
      temp4 += +TwentyFourToTwentyNine[i].CFT;
    }
    for (let i = 0; i < ThirtyToThirtyFive.length; i++) {
      temp5 += +ThirtyToThirtyFive[i].CFT;
    }
    for (let i = 0; i < ThirtySixToFortySeven.length; i++) {
      temp6 += +ThirtySixToFortySeven[i].CFT;
    }
    for (let i = 0; i < FortyEightAbove.length; i++) {
      temp7 += +FortyEightAbove[i].CFT;
    }
    setOne(temp);
    console.log(temp);
    console.log(one);
    setTwo(temp2);
    setThree(temp3);
    setFour(temp4);
    setFive(temp5);
    setSix(temp6);
    setSeven(temp7);
  };

  useEffect(() => {
    getTotalPrice();
  }, [one]);

  const getTotalPrice = () => {
    const onePrice = parseInt(one) * parseInt(oneToElevenPrice);
    console.log(`total cft: ${one}`);
    const twoPrice = parseInt(two) * parseInt(TwelveToSeventeenPrice);
    const threePrice = parseInt(three) * parseInt(EighteenToTwentyThreePrice);
    const fourPrice = parseInt(four) * parseInt(TwentyFourToTwentyNinePrice);
    const fivePrice = parseInt(five) * parseInt(ThirtyToThirtyFivePrice);
    const sixPrice = parseInt(six) * parseInt(ThirtySixToFortySevenPrice);
    const sevenPrice = parseInt(seven) * parseInt(FortyEightAbovePrice);
    const isValidNumber = (value) => typeof value === "number" && !isNaN(value);

    // Calculate the total price, considering undefined variables as 0
    const totalPrice =
      (onePrice ? onePrice : 0) +
      (twoPrice ? twoPrice : 0) +
      (threePrice ? threePrice : 0) +
      (fourPrice ? fourPrice : 0) +
      (fivePrice ? fivePrice : 0) +
      (sixPrice ? sixPrice : 0) +
      (sevenPrice ? sevenPrice : 0);
    setGrandPrice(totalPrice);

    // Calculate the total CFT, considering undefined variables as 0
    const totalCFT =
      (one ? one : 0) +
      (two ? two : 0) +
      (three ? three : 0) +
      (four ? four : 0) +
      (five ? five : 0) +
      (six ? six : 0) +
      (seven ? seven : 0);
    setGrandCFT(totalCFT);
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
      {!isPriceScreen && !isInvoiceScreen && (
        <>
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
                await calculateCft();
                await lengthRef.current.focus();
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
          <Button
            title="Add Prices"
            onPress={() => {
              Alert.alert("Add Prices?", "Do you want to proceed?", [
                { text: "Cancel", style: "cancel", onPress: () => {} },
                {
                  text: "Ok",
                  style: "OK",
                  onPress: () => {
                    categorize();
                    setIsPriceScreen(true);
                  },
                },
              ]);
            }}
            style={styles.addPrice}
          />
        </>
      )}
      {isPriceScreen && (
        <View>
          {oneToEleven.length > 0 && (
            <View style={styles.container}>
              <Text style={styles.text}>0 - 11</Text>
              <TextInput
                style={styles.input}
                clearButtonMode="while-editing"
                returnKeyType={"done"}
                keyboardType="decimal-pad"
                onSubmitEditing={() => {
                  price2Ref.current
                    ? price2Ref.current.focus()
                    : price3Ref.current
                    ? price3Ref.current.focus()
                    : price4Ref.current
                    ? price4Ref.current.focus()
                    : price5Ref.current
                    ? price5Ref.current.focus()
                    : price6Ref.current
                    ? price6Ref.current.focus()
                    : price7Ref.current
                    ? price7Ref.current.focus()
                    : null;
                }}
                ref={price1Ref}
                value={oneToElevenPrice}
                onChangeText={setOneToElevenPrice}
              />
            </View>
          )}
          {TwelveToSeventeen.length > 0 && (
            <View style={styles.container}>
              <Text style={styles.text}>12 - 17</Text>
              <TextInput
                style={styles.input}
                clearButtonMode="while-editing"
                returnKeyType={"done"}
                keyboardType="decimal-pad"
                onSubmitEditing={() => {
                  price3Ref.current
                    ? price3Ref.current.focus()
                    : price4Ref.current
                    ? price4Ref.current.focus()
                    : price5Ref.current
                    ? price5Ref.current.focus()
                    : price6Ref.current
                    ? price6Ref.current.focus()
                    : price7Ref.current
                    ? price7Ref.current.focus()
                    : null;
                }}
                ref={price2Ref}
                value={TwelveToSeventeenPrice}
                onChangeText={setTwelveToSeventeenPrice}
              />
            </View>
          )}
          {EighteenToTwentyThree.length > 0 && (
            <View style={styles.container}>
              <Text style={styles.text}>18 - 23</Text>
              <TextInput
                style={styles.input}
                clearButtonMode="while-editing"
                returnKeyType={"done"}
                keyboardType="decimal-pad"
                onSubmitEditing={() => {
                  price4Ref.current
                    ? price4Ref.current.focus()
                    : price5Ref.current
                    ? price5Ref.current.focus()
                    : price6Ref.current
                    ? price6Ref.current.focus()
                    : price7Ref.current
                    ? price7Ref.current.focus()
                    : null;
                }}
                ref={price3Ref}
                value={EighteenToTwentyThreePrice}
                onChangeText={setEighteenToTwentyThreePrice}
              />
            </View>
          )}
          {TwentyFourToTwentyNine.length > 0 && (
            <View style={styles.container}>
              <Text style={styles.text}>24 - 29</Text>
              <TextInput
                style={styles.input}
                clearButtonMode="while-editing"
                returnKeyType={"done"}
                keyboardType="decimal-pad"
                onSubmitEditing={() => {
                  price5Ref.current
                    ? price5Ref.current.focus()
                    : price6Ref.current
                    ? price6Ref.current.focus()
                    : price7Ref.current
                    ? price7Ref.current.focus()
                    : null;
                }}
                ref={price4Ref}
                value={TwentyFourToTwentyNinePrice}
                onChangeText={setTwentyFourToTwentyNinePrice}
              />
            </View>
          )}
          {ThirtyToThirtyFive.length > 0 && (
            <View style={styles.container}>
              <Text style={styles.text}>30 - 35</Text>
              <TextInput
                style={styles.input}
                clearButtonMode="while-editing"
                returnKeyType={"done"}
                keyboardType="decimal-pad"
                onSubmitEditing={() => {
                  price6Ref.current
                    ? price6Ref.current.focus()
                    : price7Ref.current
                    ? price7Ref.current.focus()
                    : null;
                }}
                ref={price5Ref}
                value={ThirtyToThirtyFivePrice}
                onChangeText={setThirtyToThirtyFivePrice}
              />
            </View>
          )}
          {ThirtySixToFortySeven.length > 0 && (
            <View style={styles.container}>
              <Text style={styles.text}>36 - 47</Text>
              <TextInput
                style={styles.input}
                clearButtonMode="while-editing"
                returnKeyType={"done"}
                keyboardType="decimal-pad"
                onSubmitEditing={() => {
                  price7Ref.current ? price7Ref.current.focus() : null;
                }}
                ref={price6Ref}
                value={ThirtySixToFortySevenPrice}
                onChangeText={setThirtySixToFortySevenPrice}
              />
            </View>
          )}
          {FortyEightAbove.length > 0 && (
            <View style={styles.container}>
              <Text style={styles.text}>48 - Up</Text>
              <TextInput
                style={styles.input}
                clearButtonMode="while-editing"
                returnKeyType={"done"}
                keyboardType="decimal-pad"
                onSubmitEditing={() => {}}
                ref={price7Ref}
                value={FortyEightAbovePrice}
                onChangeText={setFortyEightAbovePrice}
              />
            </View>
          )}
          <Button title="Back" onPress={() => setIsPriceScreen(false)} />
          <Button
            title="Calculate"
            onPress={() => {
              categoryTotalCFT();
              // getCategoryPrice();
              getTotalPrice();
              setIsInvoiceScreen(true);
              setIsPriceScreen(false);
            }}
          />
        </View>
      )}
      {isInvoiceScreen && (
        <View ref={imageRef} onLayout={onLayout} style={{ overflow: "hidden" }}>
          <Text> Date: Time:</Text>
          <TableHeader />
          {oneToEleven.length > 0 && (
            <Table data={oneToEleven} cft={one} price={oneToElevenPrice} 
            tableIndex={0} setTableIndex={setTableIndex}/>
          )}
          {TwelveToSeventeen.length > 0 && (
            <Table
              data={TwelveToSeventeen}
              cft={two}
              price={TwelveToSeventeenPrice}
              tableIndex={tableIndex + TwelveToSeventeen.length} setTableIndex={setTableIndex}
            />
          )}
          {EighteenToTwentyThree.length > 0 && (
            <Table
              data={EighteenToTwentyThree}
              cft={three}
              price={EighteenToTwentyThreePrice}
              tableIndex={tableIndex + TwelveToSeventeen.length + EighteenToTwentyThree.length} setTableIndex={setTableIndex}
            />
          )}
          {TwentyFourToTwentyNine.length > 0 && (
            <Table
              data={TwentyFourToTwentyNine}
              cft={four}
              price={TwentyFourToTwentyNinePrice}
              tableIndex={tableIndex + TwelveToSeventeen.length + EighteenToTwentyThree.length + TwentyFourToTwentyNine.length} setTableIndex={setTableIndex}
            />
          )}
          {ThirtyToThirtyFive.length > 0 && (
            <Table
              data={ThirtyToThirtyFive}
              cft={five}
              price={ThirtyToThirtyFivePrice}
              tableIndex={tableIndex + TwelveToSeventeen.length + EighteenToTwentyThree.length + TwentyFourToTwentyNine.length + ThirtyToThirtyFive.length} setTableIndex={setTableIndex}
            />
          )}
          {ThirtySixToFortySeven.length > 0 && (
            <Table
              data={ThirtySixToFortySeven}
              cft={six}
              price={ThirtySixToFortySevenPrice}
              tableIndex={tableIndex + TwelveToSeventeen.length + EighteenToTwentyThree.length + TwentyFourToTwentyNine.length + ThirtyToThirtyFive.length + ThirtySixToFortySeven.length} setTableIndex={setTableIndex}
            />
          )}
          {FortyEightAbove.length > 0 && (
            <Table
              data={FortyEightAbove}
              cft={seven}
              price={FortyEightAbovePrice}
              tableIndex={tableIndex + TwelveToSeventeen.length + EighteenToTwentyThree.length + TwentyFourToTwentyNine.length + ThirtyToThirtyFive.length + ThirtySixToFortySeven.length + FortyEightAbove.length} setTableIndex={setTableIndex}
            />
          )}
          <GrandCalculations grandCFT={grandCFT} grandPrice={grandPrice}
          tableIndex={tableIndex} setTableIndex={setTableIndex} />
          <TouchableOpacity
            style={styles.printButton}
            onPress={onSaveImageAsync}
          >
            <Text style={{ color: "white", fontSize: 20, alignSelf: "center" }}>
              Print
            </Text>
          </TouchableOpacity>
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
  addPrice: {
    position: "absolute",
    top: "95%",
    left: "90%",
  },
  parentView: {
    height: height,
  },
  text: {
    fontSize: 20,
  },
  printButton: {
    backgroundColor: "#00d1fd",
    color: "white",
    width: width / 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    position: "relative",
  },
});
