import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import {
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import ItemList from "../components/ItemList";
import SamplePrint from "../components/SamplePrint";

export const Print = ({ navigation }) => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [boundAddress, setBoundAddress] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bluetoothStatusContainer}>
        <Text style={styles.bluetoothStatus(bleOpend ? "#47BF34" : "#A8A9AA")}>
          Bluetooth {bleOpend ? "Active" : "Not Active"}
        </Text>
      </View>
      {!bleOpend && (
        <Text style={styles.bluetoothInfo}>Please activate your bluetooth</Text>
      )}
      <Text style={styles.sectionTitle}>
        Printer connected to the application:
      </Text>
      {boundAddress.length > 0 && (
        <ItemList
          label={name}
          value={boundAddress}
          onPress={() => unPair(boundAddress)}
          actionText="Disconnect"
          color="#E9493F"
        />
      )}
      {boundAddress.length < 1 && (
        <Text style={styles.printerInfo}>
          There is no printer connected yet
        </Text>
      )}
      <Text style={styles.sectionTitle}>
        Bluetooth connected to this cellphone:
      </Text>
      {loading ? <ActivityIndicator animating={true} /> : null}
      <View style={styles.containerList}>
        {pairedDevices.map((item, index) => {
          return (
            <ItemList
              key={index}
              onPress={() => connect(item)}
              label={item.name}
              value={item.address}
              connected={item.address === boundAddress}
              actionText="Connect"
              color="#00BCD4"
            />
          );
        })}
      </View>
      <SamplePrint />
      <Button onPress={() => scanBluetoothDevice()} title="Scan Bluetooth" />
      <Button onPress={() => navigation.goBack()} title="Back" />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  containerList: { flex: 1, flexDirection: "column" },
  bluetoothStatusContainer: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  bluetoothStatus: (color) => ({
    backgroundColor: color,
    padding: 8,
    borderRadius: 2,
    color: "white",
    paddingHorizontal: 14,
    marginBottom: 20,
  }),
  bluetoothInfo: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFC806",
    marginBottom: 20,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 12 },
  printerInfo: {
    textAlign: "center",
    fontSize: 16,
    color: "#E9493F",
    marginBottom: 20,
  },
});
