import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'
import { COLORS, SPACING } from '../theme/theme'
import { useStore } from '../store/store'
import EmptyListView from '../components/EmptyListView'
import ImageDisplay from '../components/ImageDisplay'
import FavoritesItemCard from '../components/FavoritesItemCard'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const FavoratiesScreen = ({navigation}:any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  return (
    <View style={styles.mainContainer}>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
      <View style={[styles.ScrollViewInnerView,{marginBottom:tabBarHeight}]}> 
        <HeaderBar title="Favorities" />
        
        {FavoritesList.length==0?<EmptyListView title='Nothing in Favorities'/>:<View style={styles.ListItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoritesItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favourite={data.favourite}
                      ToggleFavouriteItem={ToggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            }
          </View> 
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,

  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemcontainer:{
    flex:1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default FavoratiesScreen