import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { useStore } from "../store/store";
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { FontAwesome5, AntDesign } from "react-native-vector-icons";
import CoffeeCard from "../components/CoffeeCard";

const HomeScreen = ({ navigation }: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [searchText, setSearchText] = useState("");
  const [sortedList, setSortedList] = useState(CoffeeList);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const ListRef: any = useRef<FlatList>();

  const getCategories = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
      if (temp[data[i].name] == undefined) {
        temp[data[i].name] = 1;
      } else {
        temp[data[i].name]++;
      }
    }
    let categoriess = Object.keys(temp);
    categoriess.unshift("All");
    return categoriess;
  };
  const [categories, setCategories] = useState(getCategories(CoffeeList));

  const getCategoriesData = (category: string, data: any) => {
    if (category == "All") {
      return data;
    } else {
      return data.filter((item: any) => item.name == category);
    }
  };

  const coffeeSearch = (search: string) => {
    if (search != "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setSelectedCategory("All");
      setSortedList([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        ),
      ]);
    }
  };

  const resetCoffeeSearch = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setSelectedCategory("All");
    setSortedList([...CoffeeList]);
    setSearchText("");
  };
  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar />

        <Text style={styles.headingText}>
          Find The Best {"\n"}Coffee For You{" "}
        </Text>

        <View style={styles.searchContainer}>
          <FontAwesome5
            name="search"
            size={24}
            style={{ padding: 3 }}
            color={
              searchText.length > 0
                ? COLORS.primaryOrangeHex
                : COLORS.primaryLightGreyHex
            }
          />
          <TextInput
            placeholder="  Find your cofee..."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            autoCapitalize="none"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              coffeeSearch(text);
            }}
            style={styles.textInput}
          />
          {searchText != "" && (
            <TouchableOpacity onPress={() => resetCoffeeSearch()}>
              <AntDesign
                name="closecircle"
                size={24}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: SPACING.space_24 }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                ListRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0,
                });
                setSelectedCategory(item);
                setSortedList(getCategoriesData(item, CoffeeList));
              }}
              style={styles.categorytxtContainer}
            >
              <Text
                style={[
                  styles.categorytxt,
                  selectedCategory == item
                    ? { color: COLORS.primaryOrangeHex }
                    : { color: COLORS.primaryLightGreyHex },
                ]}
              >
                {item}
              </Text>
              {selectedCategory == item ? (
                <View style={styles.activeCategoryDot}></View>
              ) : (
                <></>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text
                style={[
                  styles.categorytxt,
                  { color: COLORS.primaryLightGreyHex, fontSize: 18 },
                ]}
              >
                No Match Found
              </Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedList}
          contentContainerStyle={styles.cardContainer}
          style={{ marginLeft: SPACING.space_18 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  })}
            >
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                imagelink_portrait={item.imagelink_portrait}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[0]}
                buttonPressHandler={CoffeCardAddToCart}
              />
            </TouchableOpacity>
          )}
        />
        <Text style={styles.beansTitleText}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.cardContainer, { marginBottom: 100 }]}
          style={{ marginLeft: SPACING.space_18 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>  navigation.push('Details', {
                index: item.index,
                id: item.id,
                type: item.type,
              })}
            >
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                imagelink_portrait={item.imagelink_portrait}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[0]}
                buttonPressHandler={CoffeCardAddToCart}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  headingText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_28,
    fontFamily: "bold",
    paddingLeft: SPACING.space_30,
  },
  searchContainer: {
    width: "86%",
    flexDirection: "row",
    alignItems: "center",
    margin: SPACING.space_30,
    backgroundColor: COLORS.primaryGreyHex,
    padding: SPACING.space_10,
    borderRadius: SPACING.space_12,
  },
  textInput: {
    flex: 1,
    color: COLORS.primaryLightGreyHex,
  },
  categorytxt: {
    marginHorizontal: SPACING.space_12,
    fontFamily: "medium",
    fontSize: FONTSIZE.size_16,
    marginBottom: 5,
  },
  emptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.space_36 * 3,
  },
  beansTitleText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: "bold",
    paddingLeft: SPACING.space_28,
  },
  activeCategoryDot: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
    marginBottom: 10,
  },
  categorytxtContainer: {
    alignItems: "center",
  },
  cardContainer: {
    columnGap: SPACING.space_15,
  },
});
