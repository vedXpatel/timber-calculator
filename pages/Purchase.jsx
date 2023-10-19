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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table } from "../components/Table";
import { GrandCalculations } from "../components/GrandCalculations";
import { TableHeader } from "../components/TableHeader";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import DateTime from '../components/Purchase/DateTime';
import {
  calculateCft,
  categorize,
  categoryTotalCFT,
  getTotalPrice,
  onLayout,
  onSaveImageAsync,
  saveData,
    initializeBillNo,
} from "./utils/Purchase";
import moment from "moment/moment";

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


  useEffect(() => {
    getTotalPrice(one, two, three, four, five, six, seven, setGrandPrice, setGrandCFT, oneToElevenPrice, TwelveToSeventeenPrice, EighteenToTwentyThreePrice, TwentyFourToTwentyNinePrice, ThirtyToThirtyFivePrice, ThirtySixToFortySevenPrice, FortyEightAbovePrice);
  }, [one]);

  useEffect(() => {
    initializeBillNo();
  },[]);

  // get height of table view
  const [tableHeight, setTableHeight] = useState(0);

  // Bill No. Initial
  const [billNo, setBillNo] = useState('');

  const retrieveBillNo = async() => {
    try{
      const temp = await AsyncStorage.getItem('billNo');
      setBillNo(temp);
    } catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    retrieveBillNo();
  },[]);

  // Function to Save Data to the Local Storage
  const [dataToBeSaved, setDataToBeSaved] = useState([]);
  const saveDataToLocal = () => {
    let temp = [];
    oneToEleven.length > 0 ? temp.push(oneToEleven) : null;
    TwelveToSeventeen.length > 0 ? temp.push(TwelveToSeventeen) : null;
    EighteenToTwentyThree.length > 0 ? temp.push(EighteenToTwentyThree) : null;
    TwentyFourToTwentyNine.length > 0 ? temp.push(TwentyFourToTwentyNine) : null;
    ThirtyToThirtyFive.length > 0 ? temp.push(ThirtyToThirtyFive) : null;
    ThirtySixToFortySeven.length > 0 ? temp.push(ThirtySixToFortySeven) : null;
    FortyEightAbove.length > 0 ? temp.push(FortyEightAbove) : null;
    setDataToBeSaved(temp);
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
                await calculateCft(length, girth, setList);
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
          <TouchableOpacity
            style={styles.addPrice}
            onPress={() => {
              Alert.alert("Add Prices?", "Do you want to proceed?", [
                { text: "Cancel", style: "cancel", onPress: () => {} },
                {
                  text: "Ok",
                  style: "OK",
                  onPress: () => {
                    categorize(list, setOneToEleven, setTwelveToSeventeen, setEighteenToTwentyThree, setTwentyFourToTwentyNine, setThirtyToThirtyFive, setThirtySixToFortySeven, setFortyEightAbove);
                    setIsPriceScreen(true);
                  },
                },
              ]);
            }}
          >
            <Text style={styles.addPriceText}>Add Prices</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PurchaseHistory')}>
            <Text>
              Purchase History
            </Text>
          </TouchableOpacity>
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
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.addPrice,{width:150,marginRight:20,}]} onPress={() => setIsPriceScreen(false)} >
            <Text style={styles.addPriceText}>
              Edit Purchase
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.addPrice}
            onPress={() => {
              categoryTotalCFT(oneToEleven, TwelveToSeventeen, EighteenToTwentyThree, TwentyFourToTwentyNine, ThirtyToThirtyFive, ThirtySixToFortySeven, FortyEightAbove, setOne, setTwo, setThree, setFour, setFive, setSix, setSeven);
              // getCategoryPrice();
              getTotalPrice(one, two, three, four, five, six, seven, setGrandPrice, setGrandCFT, oneToElevenPrice, TwelveToSeventeenPrice, EighteenToTwentyThreePrice, TwentyFourToTwentyNinePrice, ThirtyToThirtyFivePrice, ThirtySixToFortySevenPrice, FortyEightAbovePrice);
              setIsInvoiceScreen(true);
              setIsPriceScreen(false);
            }}
          >
            <Text style={styles.addPriceText}>Calculate</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
      {isInvoiceScreen && (
          <View>
            <View style={styles.printRow}>
          <TouchableOpacity
              style={styles.printButton}
              onPress={() => onSaveImageAsync(tableHeight, imageRef)}
          >
            <Text style={styles.addPriceText}>
              Print
            </Text>
          </TouchableOpacity>
              <TouchableOpacity
                  style={styles.printButton}
                  onPress={() => {
                    saveDataToLocal();
                    saveData(dataToBeSaved, moment().format('DD/MM/YY'), moment().format('hh:mm:ss'))
                  }
              }
              >
                <Text style={styles.addPriceText}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
        <View ref={imageRef} onLayout={(event) => onLayout(event, setTableHeight)} style={{ overflow: "hidden" }}>
          <DateTime billNo={billNo}/>
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
        </View>
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
    position: 'relative',
    borderWidth: 1,
    borderColor: "white",
    width: width / 3,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
  },
  addPriceText: {
    fontSize: 20,
    alignSelf: "center",
    color: "black",
  },
  parentView: {
    height: height,
  },
  text: {
    fontSize: 20,
  },
  printButton: {
    position: 'relative',
    borderWidth: 1,
    borderColor: "white",
    width: width / 3,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer:{
    flex: 1,
    backgroundColor: 'white', // Background color of the screen
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', //
    padding: 20,
  },
  printRow: {
    flexDirection: 'row',
  }
});
