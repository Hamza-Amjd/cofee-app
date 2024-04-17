import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
import GradiantIcon from "../components/GradiantIcon";
import PaymentMethod from "../components/PaymentMethod";
import PaymentFooter from "../components/PaymentFooter";
import { useStore } from "../store/store";
import PopUpAnimation from "../components/PopUpAnimation";

const PaymentScreen = ({ navigation, route }: any) => {
  const PaymentList = [
    {
      name: "Wallet",
      icon: "icon",
      isIcon: true,
    },
    {
      name: "Google Pay",
      icon: require("../assets/app_images/gpay.png"),
      isIcon: false,
    },
    {
      name: "Apple Pay",
      icon: require("../assets/app_images/applepay.png"),
      isIcon: false,
    },
    {
      name: "Amazon Pay",
      icon: require("../assets/app_images/amazonpay.png"),
      isIcon: false,
    },
  ];
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart
  );

  const [paymentMode, setPaymentMode] = useState("Wallet");
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate("History");
    }, 2000);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/successful.json")}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <GradiantIcon
              name="keyboard-backspace"
              size={FONTSIZE.size_30}
              color={COLORS.primaryLightGreyHex}
            ></GradiantIcon>
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payment</Text>
          <View style={styles.EmptyHeaderView} />
        </View>

        <View style={styles.PaymentOptionsContainer}>
          {PaymentList.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setPaymentMode(item.name);
              }}
            >
              <PaymentMethod
                icon={item.icon}
                isIcon={item.isIcon}
                name={item.name}
                paymentMode={paymentMode}
              />
            </TouchableOpacity>
          ))}
        </View>
        <PaymentFooter
          buttonTitle={`Pay with ${paymentMode}`}
          price={route.params.amount}
          buttonHandler={buttonPressHandler}
        />
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
    justifyContent: "space-between",
  },
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    fontFamily: "semiBold",
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyHeaderView: {
    height: 30,
    width: 30,
  },
  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  LottieAnimation: {
    flex: 1,
  },
});

export default PaymentScreen;
