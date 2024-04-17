import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { COLORS } from '../theme/theme';
import { BlurView } from 'expo-blur';
import { Ionicons,Foundation,MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import CartScreen from '../screens/CartScreeen';
import FavoratiesScreen from '../screens/FavoratiesScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarShowLabel: false, tabBarHideOnKeyboard: true, tabBarStyle: styles.tabBarStyle,tabBarBackground:()=>{
        return <BlurView intensity={30} style={styles.BlurViewStyles} />
      }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => {
          return <Foundation name="home" size={35} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />;
        }
      }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarIcon: ({ focused }) => {
          return <MaterialIcons name="shopping-bag" size={35} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
        }
      }}/>
      <Tab.Screen name="Favorate" component={FavoratiesScreen} options={{
        tabBarIcon: ({ focused }) => {
          return <Ionicons name="heart" size={35} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
        }
      }}/>
      <Tab.Screen name="History" component={HistoryScreen} options={{
        tabBarIcon: ({ focused }) => {
          return <MaterialCommunityIcons name="bell" size={35} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
        }
      }}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: COLORS.primaryBlackRGBA,
    position: 'absolute',
    elevation: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 0
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
})