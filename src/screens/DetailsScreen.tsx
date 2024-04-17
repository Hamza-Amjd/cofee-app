import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { useStore } from "../store/store";
import ImageDisplay from "../components/ImageDisplay";
import PaymentFooter from "../components/PaymentFooter";

const DetailsScreen = ({ navigation, route }: any) => {
  const Item = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  const [fulldesc, setfulldesc] = useState(false);
  const [prices, setprices] = useState(Item.prices[0]);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );
  const toggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    navigation.navigate("Cart");
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ImageDisplay
          EnableBackHandler={true}
          imagelink_portrait={Item.imagelink_portrait}
          type={Item.type}
          id={Item.id}
          favourite={Item.favourite}
          name={Item.name}
          ratings_count={Item.ratings_count}
          average_rating={Item.average_rating}
          special_ingredient={Item.special_ingredient}
          roasted={Item.roasted}
          backhandler={() => {
            navigation.pop();
          }}
          toggleFavourite={toggleFavourite}
          ingredients={Item.ingredients}
        />
        <View style={styles.footerInfo}>
          <Text style={styles.labeltxt}>Description</Text>
          {fulldesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setfulldesc((prev) => !prev);
              }}
            >
              <Text style={styles.descriptiontxt}>{Item.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setfulldesc((prev) => !prev);
              }}
            >
              <Text numberOfLines={3} style={styles.descriptiontxt}>
                {Item.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.labeltxt}>Size</Text>
          <View style={styles.sizetypes}>
            {Item.prices.map((data: any) => (
              <TouchableOpacity
                onPress={() => setprices(data)}
                key={data.size}
                style={[
                  styles.sizeContainer,
                  {
                    borderColor:
                      prices == data
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryLightGreyHex,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sizetxt,
                    {
                      color:
                        prices == data
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={prices.price}
          buttonHandler={() => {
            addToCarthandler({
              id: Item.id,
              index: Item.index,
              name: Item.name,
              roasted: Item.roasted,
              imagelink_square: Item.imagelink_square,
              special_ingredient: Item.special_ingredient,
              type: Item.type,
              price: prices,
            });
          }}
          buttonTitle="Add to Cart"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  footerInfo: {
    padding: SPACING.space_15,
  },
  labeltxt: {
    color: COLORS.primaryWhiteHex,
    fontFamily: "semiBold",
    fontSize: FONTSIZE.size_16,
    paddingVertical: SPACING.space_15,
  },
  descriptiontxt: {
    fontFamily: "regular",
    color: COLORS.primaryWhiteHex,
  },
  sizetypes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sizeContainer: {
    width: "30%",
    height: 50,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },
  sizetxt: {
    fontFamily: "semiBold",
    fontSize: FONTSIZE.size_16,
    paddingVertical: SPACING.space_10,
  },
});

export default DetailsScreen;
