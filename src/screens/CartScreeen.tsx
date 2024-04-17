import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { COLORS, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListView from "../components/EmptyListView";
import PaymentFooter from "../components/PaymentFooter";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import CartItem from "../components/CartItem";

export default function CartScreen({navigation}:any) {
  const tabBarHeight = useBottomTabBarHeight();
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };
  return (
    <View style={styles.ScreenContainer}>
    <StatusBar backgroundColor={COLORS.primaryBlackHex} />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
      <View
        style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
        <View style={styles.ItemContainer}>
          <HeaderBar title="Cart" />

          {CartList.length == 0 ? (
            <EmptyListView title={'Cart is Empty'} />
          ) : (
            <View style={styles.ListItemContainer}>
              {CartList.map((item: any) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    })
                  }}
                  key={item.id}>
                  <CartItem
                    id={item.id}
                    name={item.name}
                    imagelink_square={item.imagelink_square}
                    special_ingredient={item.special_ingredient}
                    roasted={item.roasted}
                    prices={item.prices}
                    type={item.type}
                    incrementCartItemQuantityHandler={
                      incrementCartItemQuantityHandler
                    }
                    decrementCartItemQuantityHandler={
                      decrementCartItemQuantityHandler
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {CartList.length != 0 ? (
          <PaymentFooter 
            buttonHandler={buttonPressHandler}
            buttonTitle="Pay"
            price={CartPrice}
          />
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  </View>
);
};

const styles = StyleSheet.create({
ScreenContainer: {
  flex: 1,
  backgroundColor: COLORS.primaryBlackHex,
},
ScrollViewFlex: {
  flexGrow: 1,
},
ScrollViewInnerView: {
  flex: 1,
  justifyContent: 'space-between',
},
ItemContainer: {
  flex: 1,
},
ListItemContainer: {
  paddingHorizontal: SPACING.space_20,
  gap: SPACING.space_20,
},
});
