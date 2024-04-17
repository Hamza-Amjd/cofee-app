import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TabNavigator from './src/navigators/TabNavigator'
import HomeScreen from './src/screens/HomeScreen'
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';

export default function App() {
  const Stack = createNativeStackNavigator()
    
  const [fontsloaded]=useFonts({
    bold:require('./src/assets/fonts/Poppins-Bold.ttf'),
    extraBold:require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
    light:require('./src/assets/fonts/Poppins-Light.ttf'),
    medium:require('./src/assets/fonts/Poppins-Medium.ttf'),
    regular:require('./src/assets/fonts/Poppins-Regular.ttf'),
    semiBold:require('./src/assets/fonts/Poppins-SemiBold.ttf'),

  })
    const onLayoutRootView=useCallback(async()=>{
    if (fontsloaded) {
      await SplashScreen.hideAsync();
    }
  },[fontsloaded])
  if (!fontsloaded) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" />
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
                name='Tab'
                component={TabNavigator}    
            />
            <Stack.Screen
                name='Home'
                component={HomeScreen}    
            />
            <Stack.Screen
                name='Details'
                component={DetailsScreen}    
            />
            <Stack.Screen
                name='Payment'
                component={PaymentScreen}    
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})