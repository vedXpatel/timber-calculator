import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/Home';
import { Purchase } from "./pages/Purchase";
import { JobWork } from "./pages/JobWork";
import { Alert, Button, TouchableOpacity, Text, Dimensions, View } from 'react-native';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function App() {
  const [isPrintScreen, setIsPrintScreen] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Purchase" component={Purchase} options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: width / 5, borderWidth: 1, backgroundColor: 'lightblue', paddingLeft: 10, paddingRight: 10, borderRadius: 10, paddingTop: 5, paddingBottom: 5, borderColor: 'white', }}
              title="Back"
              onPress={() => Alert.alert(
                "Discard changes?",
                "You have unsaved changes. Are you sure to discard them and leave the screen?",
                [
                  { text: "Don't leave", style: "cancel", onPress: () => { } },
                  {
                    text: "Discard",
                    style: "destructive",
                    onPress: () => {
                      setIsPrintScreen(false);// Set the isPrintScreen state to false
                      navigation.navigate('Home');
                    },
                  },
                ]
              )}>
              <Text style={{ fontSize: 15, }}>
                Back
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            isPrintScreen ? (
              <TouchableOpacity
                style={{ marginRight: width / 5, borderWidth: 1, backgroundColor: 'lightblue', paddingLeft: 10, paddingRight: 10, borderRadius: 10, paddingTop: 5, paddingBottom: 5, borderColor: 'white', }}
                title="Back"
                onPress={() => Alert.alert(
                  "Discard changes?",
                  "You have unsaved changes. Are you sure to discard them and leave the screen?",
                  [
                    { text: "Don't leave", style: "cancel", onPress: () => { } },
                    {
                      text: "Discard",
                      style: "destructive",
                      onPress: () => {
                        setIsPrintScreen(false); // Set the isPrintScreen state to false
                        navigation.navigate('Home');
                      },
                    },
                  ]
                )}>
                <Text style={{ fontSize: 15, }}>
                  Back
                </Text>
              </TouchableOpacity>
            ) : (
              <View></View>
            )
          )
        })} />
        <Stack.Screen name="JobWork" component={JobWork} options={({ navigation }) => ({
          headerLeft: () => (
            <Button title="Back" onPress={() => Alert.alert(
              "Discard changes?",
              "You have unsaved changes. Are you sure to discard them and leave the screen?",
              [
                { text: "Don't leave", style: "cancel", onPress: () => { } },
                {
                  text: "Discard",
                  style: "destructive",
                  onPress: () => {
                    navigation.navigate('Home');
                  },
                },
              ]
            )} />
          ),
          // Pass the navigation prop to the JobWork component
          navigation: navigation,
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
