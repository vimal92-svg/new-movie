import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
import 'react-native-gesture-handler';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";



const Stack = createStackNavigator();


export default () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
       <Stack.Screen name="home" 
       component={HomeScreen}
        options={{ headerShown: false }}
        />
       <Stack.Screen 
       name="movie" component={MovieScreen}
       options= {{ headerShown: false }}
       />
       </Stack.Navigator>
       </NavigationContainer>
    
 
  );
};