import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import { AntDesign, Entypo } from "@expo/vector-icons";

const cardWidth = Dimensions.get("window").width * 0.32;

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: any;
  imagelink_portrait: any;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}
const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  imagelink_portrait,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardContainer}
    >
      <View style={styles.CardImgBG}>
        <Image source={imagelink_square} style={styles.CardImgBG} />

        <View style={styles.ratingContainer}>
          <AntDesign
            name="star"
            size={SPACING.space_18}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={styles.cardRatingText}>{average_rating}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubTitle}>{special_ingredient}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.cardPriceCurrency}>
          $<Text style={styles.cardPrice}> {price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{ ...price, quantity: 1 }],
            });
          }}
          style={styles.addbtn}
        >
          <Entypo name="plus" size={20} color={COLORS.primaryWhiteHex} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 205,
    width: cardWidth,
    borderRadius: BORDERRADIUS.radius_25,
    elevation: 5,
    padding: 5,
  },
  CardImgBG: {
    height: cardWidth - 10,
    width: cardWidth - 10,
    borderRadius: BORDERRADIUS.radius_20,
  },
  cardRatingText: {
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
  },
  cardText: {
    color: COLORS.primaryWhiteHex,
    paddingHorizontal: SPACING.space_10,
    fontFamily: "medium",
  },
  cardTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: "medium",
  },
  cardSubTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: "light",
    fontSize: FONTSIZE.size_10,
  },
  ratingContainer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.space_10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryBlackRGBA,
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
  },
  cardPriceCurrency: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: "semiBold",
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addbtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 5,
    padding: 2,
  },
});

export default CoffeeCard;
