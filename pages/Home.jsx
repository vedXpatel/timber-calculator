import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
    Image,
} from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Purchase")}
       style={{marginTop: 10,}}>
          <Image source={require('../assets/Purchase.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("JobWork")}
       style={{marginTop: 10,}}>
        <Image source={require('../assets/JobWork.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 10,}}>
        <Image source={require('../assets/CutSize.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  button: {
    width: width / 1.4,
    height: 52,
    textAlign: "center",
    marginBottom: height / 30,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
  },
  buttonView:{

  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
  },
});
