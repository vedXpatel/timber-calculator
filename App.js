import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/Home';
import { Purchase } from "./pages/Purchase";
import { JobWork } from "./pages/JobWork";
import { Alert, Button } from 'react-native';
import { Print } from './pages/Print';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Purchase" component={Purchase}  options={({ navigation }) => ({
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
                      navigation.navigate('Home')
                    },
                  },
                ]
              )} />
            ),
          // Pass the navigation prop to the JobWork component
          navigation: navigation
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
                      navigation.navigate('Home')
                    },
                  },
                ]
              )} />
            ),
          // Pass the navigation prop to the JobWork component
          navigation: navigation
        })} />
          <Stack.Screen name="Print" component={Print}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

