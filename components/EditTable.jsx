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

  const [oneToEleven, setOneToEleven] = useState([]);
  const [TwelveToSeventeen, setTwelveToSeventeen] = useState([]);
  const [EighteenToTwentyThree, setEighteenToTwentyThree] = useState([]);
  const [TwentyFourToTwentyNine, setTwentyFourToTwentyNine] = useState([]);
  const [ThirtyToThirtyFive, setThirtyToThirtyFive] = useState([]);
  const [ThirtySixToFortySeven, setThirtySixToFortySeven] = useState([]);
  const [FortyEightAbove, setFortyEightAbove] = useState([]);
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [six, setSix] = useState(0);
  const [seven, setSeven] = useState(0);


  const categorizeCft = () => {
    let newOne = one;
    let newTwo = two;
    let newThree = three;
    let newFour = four;
    let newFive = five;
    let newSix = six;
    let newSeven = seven;

    for (let index = 0; index < data.length; index++) {
      if (data[index][0].girth > 0 && data[index][0].girth < 12) {
        for (let i = 0; i < data[index].length; i++) {
          newOne += +data[index][i].CFT;
        }
      }
      else if (data[index][0].girth < 18) {
        for (let i = 0; i < data[index].length; i++) {
          newTwo += +data[index][i].CFT;
        }
      }
      else if (data[index][0].girth < 24) {
        for (let i = 0; i < data[index].length; i++) {
          newThree += +data[index][i].CFT;
        }
      }
      else if (data[index][0].girth < 30) {
        for (let i = 0; i < data[index].length; i++) {
          newFour += +data[index][i].CFT;
        }
      }
      else if (data[index][0].girth < 36) {
        for (let i = 0; i < data[index].length; i++) {
          newFive += +data[index][i].CFT;
        }
      }
      else if (data[index][0].girth < 48) {
        for (let i = 0; i < data[index].length; i++) {
          newSix += +data[index][i].CFT;
        }
      }
      else if (data[index][0].girth >= 48) {
        for (let i = 0; i < data[index].length; i++) {
          newSeven += +data[index][i].CFT;
        }
      }

    }

    setOne(newOne);
    setTwo(newTwo);
    setThree(newThree);
    setFour(newFour);
    setFive(newFive);
    setSix(newSix);
    setSeven(newSeven);

    let tempCFT =
      (one ? one : 0) +
      (two ? two : 0) +
      (three ? three : 0) +
      (four ? four : 0) +
      (five ? five : 0) +
      (six ? six : 0) +
      (seven ? seven : 0);
    setGrandCFT(tempCFT);
  }

  useEffect(() => categorizeCft(), [])

  const editCell = (rowIndex, cellName, value) => { };

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
            {
              item[0].girth > 0 && item[0].girth < 11 &&
              <Text style={[styles.totalCell, { flex: 1 }]}>{one.toFixed(4)}</Text>
            }
            {
              item[0].girth < 18 && item[0].girth >= 11 &&
              <Text style={[styles.totalCell, { flex: 1 }]}>{two.toFixed(4)}</Text>
            }
            {
              item[0].girth < 24 && item[0].girth >= 18 &&
              <Text style={[styles.totalCell, { flex: 1 }]}>{three.toFixed(4)}</Text>
            }
            {
              item[0].girth < 30 && item[0].girth >= 24 &&
              <Text style={[styles.totalCell, { flex: 1 }]}>{four.toFixed(4)}</Text>
            }
            {
              item[0].girth < 36 && item[0].girth >= 30 &&
              <Text style={[styles.totalCell, { flex: 1 }]}>{five.toFixed(4)}</Text>
            }
            {
              item[0].girth < 48 && item[0].girth >= 36 &&
              <Text style={[styles.totalCell, { flex: 1 }]}>{six.toFixed(4)}</Text>
            }
            {
              item[0].girth > 48 &&
              <Text style={[styles.totalCell, { flex: 1 }]}>{seven.toFixed(4)}</Text>
            }
            {/* <Text style={[styles.totalCell, { flex: 1 }]}>{totalCFT.toFixed(4)}</Text> */}
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
      <View
        style={[
          styles.totalRow
        ]}
      >
        <Text style={[styles.totalCell, { flex: 3 }]}>Grand CFT</Text>
        <Text style={[styles.totalCell, { flex: 1 }]}>{((one ? one : 0) +
          (two ? two : 0) +
          (three ? three : 0) +
          (four ? four : 0) +
          (five ? five : 0) +
          (six ? six : 0) +
          (seven ? seven : 0)).toFixed(4)}</Text>
      </View>
      <View
        style={[
          styles.totalRow,
          { borderBottomWidth: 1, borderColor: 'black' },
        ]}
      >
        <Text style={[styles.totalCell, { flex: 3 }]}>Grand Price</Text>
        <Text style={[styles.totalCell, { flex: 1 }]}>{0}</Text>
      </View>
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
