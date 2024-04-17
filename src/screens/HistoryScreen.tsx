import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../store/store";
import EmptyListView from "../components/EmptyListView";
import OrderHistoryCard from "../components/OrderHistoryCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const HistoryScreen = ({navigation}:any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ flexGrow: 1 }, {marginBottom: tabBarHeight}]}
      >
        <HeaderBar title="Order History" />
        {OrderHistoryList.length == 0 ? (
          <EmptyListView title="No Order History" />
        ) : (
          <View style={styles.ListItemContainer}>
            {OrderHistoryList.map((item: any,index: any) => (
                  <OrderHistoryCard 
                    key={index.toString()}
                    CartList={item.CartList}
                    OrderDate={item.OrderDate}
                    navigationHandler={navigationHandler}
                    CartListPrice={item.CartListPrice}
                  />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingBottom:90
  },
  ListItemContainer:{
    flex:1,
    paddingHorizontal:SPACING.space_24
  }
});
