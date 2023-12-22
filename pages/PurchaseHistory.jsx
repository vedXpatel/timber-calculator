import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EditTable } from "../components/EditTable";
import Swipeout from "react-native-swipeout";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const PurchaseHistory = ({ navigation }) => {
  const [billNo, setBillNo] = useState("");
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [localData, setLocalData] = useState([]);
  const [tableView, setTableView] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [tempBill, setTempBill] = useState();
  const [tempDate, setTempDate] = useState();
  const [tempTime, setTempTime] = useState();

  const retrieveData = async () => {
    setLocalData([]);
    const temp = await AsyncStorage.getItem("billNo");
    // console.log(`bill no set inside purchase history ${temp}`);
    setBillNo(temp);
    try {
      const bill = +billNo;
      for (let i = 1; i <= bill + 1; i++) {
        try {
          if ((await AsyncStorage.getItem(i.toString())) !== null) {
            const savedData = await AsyncStorage.getItem(i.toString());
            // console.log(savedData);
            setLocalData((prev) => {
              return [...prev, savedData];
            });
          }
        } catch (error) {
          alert(`Error Fetching Local Data`);
        }
      }
      // console.log(localData);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <ScrollView>
      {!tableView ? (
        <View>
          <Button
            mode="contained"
            icon='refresh'
            style={{
              flex: 1,
              width: width / 3,
              alignSelf: "center",
              margin: 10,
            }}
            onPress={retrieveData}
          >
            Refresh
          </Button>
          {localData.length > 0 && localData.map((item, index) => {
            return (
              <Swipeout
                right={[
                  {
                    text: "Delete",
                    onPress: async () =>
                      await AsyncStorage.removeItem(
                        JSON.stringify(JSON.parse(item).tempBill)
                      ),
                    backgroundColor: "red",
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.listContainer}
                  onPress={async () => {
                    await setTempData(JSON.parse(item).data);
                    setTempBill(JSON.parse(item).tempBill);
                    setTempDate(JSON.parse(item).date);
                    setTempTime(JSON.parse(item).time);
                    setTableView(true);
                  }}
                >
                  <View>
                    <View style={styles.container}>
                      <View style={styles.leftColumn}>
                        <Text style={styles.label}>Bill No.: </Text>
                        <Text style={styles.value}>
                          {JSON.parse(JSON.parse(item).tempBill)}
                        </Text>
                      </View>
                      <View style={styles.dateTimeColumn}>
                        <View style={styles.rightColumn}>
                          <Text style={styles.label}>Date: </Text>
                          <Text style={styles.value}>
                            {JSON.parse(item).date}
                          </Text>
                        </View>
                        <View style={styles.rightColumn}>
                          <Text style={styles.label}>Time: </Text>
                          <Text style={styles.value}>
                            {JSON.parse(item).time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeout>
            );
          })}
        </View>
      ) : (
        <EditTable
          data={tempData}
          billNo={tempBill}
          date={tempDate}
          time={tempTime}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  leftColumn: {
    flexDirection: "row",
  },
  rightColumn: {
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  dateTimeColumn: {
    flexDirection: "column",
  },
  listContainer: {
    borderWidth: 1,
    backgroundColor: "#cbcbcb",
    borderColor: "#cbcbcb",
    margin: 10,
    borderRadius: 10,
  },
});
