import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { calculateCft, categorize } from "../../pages/utils/Purchase";

export const Measurement = (props) => {
  const { girthRef, length, setLength, lengthRef, setGirth, girth, setList } =
    props;
  return (
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
                categorize(
                  list,
                  setOneToEleven,
                  setTwelveToSeventeen,
                  setEighteenToTwentyThree,
                  setTwentyFourToTwentyNine,
                  setThirtyToThirtyFive,
                  setThirtySixToFortySeven,
                  setFortyEightAbove
                );
                setIsPriceScreen(true);
              },
            },
          ]);
        }}
      >
        <Text style={styles.addPriceText}>Add Prices</Text>
      </TouchableOpacity>
    </>
  );
};
