import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AddUser from './components/Home';
import { Provider } from 'react-redux';
import store from "./redux/store"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Calculation from './components/Calculation';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


interface InputData {
  user?: String,
  amount?: string
}

export default function App() {

  const Stack = createStackNavigator();


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen
              name="Calculation"
              component={Calculation}
              options={{
                headerShown: false,
              }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}





const styles = StyleSheet.create({

  buttonNameText: {
    color: "white"
  },
  flex1: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  buttonName: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#C70039',
    padding: 6,
    margin: 20,
    height: 40,
    width: 150,
    borderRadius: 40,
  },

});
