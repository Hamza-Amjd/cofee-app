import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import GradiantIcon from "./GradiantIcon";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import {MaterialCommunityIcons,FontAwesome, Entypo, MaterialIcons,AntDesign} from 'react-native-vector-icons'

interface ImageDisplayProps {
  EnableBackHandler: boolean;
  imagelink_portrait: any;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  ratings_count: string;
  average_rating: number;
  special_ingredient: string;
  ingredients: string;
  roasted: string;
  backhandler?: any;
  toggleFavourite: any;
}
const ImageDisplay: React.FC<ImageDisplayProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  ratings_count,
  average_rating,
  special_ingredient,
  ingredients,
  roasted,
  backhandler,
  toggleFavourite,
}) => {
  return (
    <ImageBackground source={imagelink_portrait} style={styles.imgContainer}>
      {EnableBackHandler ? (
        <View style={styles.headerbar}>
        <TouchableOpacity onPress={backhandler}>
          <GradiantIcon
            name="keyboard-backspace"
            size={FONTSIZE.size_30}
            color={COLORS.primaryLightGreyHex}
          ></GradiantIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>toggleFavourite(favourite,type,id)}>
          <GradiantIcon
            name="cards-heart"
            size={FONTSIZE.size_30}
            color={favourite?COLORS.primaryRedHex:COLORS.primaryLightGreyHex}
          ></GradiantIcon>
        </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={{position:'absolute',right:25,top:25}} onPress={()=>toggleFavourite(favourite,type,id)}>
          <GradiantIcon
            name="cards-heart"
            size={FONTSIZE.size_30}
            color={favourite?COLORS.primaryRedHex:COLORS.primaryLightGreyHex}    
          ></GradiantIcon>
        </TouchableOpacity>
      )}
      <View style={styles.detailscontainer}>
        <View style={styles.nameRow}>
          <View style={styles.namecontainer}>
            <Text style={styles.nametxt}>{name}</Text>
            <Text style={styles.subnametxt}>{special_ingredient}</Text>
          </View>
          <View style={styles.detailicons}>
            <View style={styles.coffeecontainer}>
              {type == 'Bean'?<MaterialCommunityIcons name="seed" size={33} color={COLORS.primaryOrangeHex} />:<FontAwesome name="coffee" size={33} color={COLORS.primaryOrangeHex}/>}
              <Text style={styles.subnametxt}>{type}</Text>
            </View>
            <View style={styles.coffeecontainer}>
              {type == 'Bean'?<MaterialIcons name="location-pin" size={33} color={COLORS.primaryOrangeHex} />:<Entypo name="drop"  size={33} color={COLORS.primaryOrangeHex}/>}
              <Text style={styles.subnametxt}>{ingredients}</Text>
            </View>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingcontainer}>
            <AntDesign name="star" size={SPACING.space_18} color={COLORS.primaryOrangeHex} />
            <Text style={styles.avgratingtxt}>{average_rating}</Text>
            <Text style={styles.ratingcounttxt}>({ratings_count})</Text>
          </View>
          <View style={styles.roastedcontainer}>     
              <Text style={styles.subnametxt}>{roasted}</Text>    
          </View>
        </View>
          
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
    aspectRatio:20/25,
  },
  headerbar:{
    top:SPACING.space_18,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:SPACING.space_32
  },
  detailscontainer:{
    width:'100%',
    position:"absolute",
    bottom:0,
    backgroundColor:COLORS.primaryBlackRGBA,
    borderTopLeftRadius:BORDERRADIUS.radius_20,
    borderTopRightRadius:BORDERRADIUS.radius_20,
    padding:SPACING.space_15
  },
  nameRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:SPACING.space_10
  },
  namecontainer:{

  },
  nametxt:{
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily:'semiBold',
  },
  subnametxt:{
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    fontFamily:'light',
  },
  detailicons:{
    gap:SPACING.space_10,
    flexDirection:'row',
    justifyContent:'space-between',
    
  },
  coffeecontainer:{
    height:60,
    width:60,
    backgroundColor:COLORS.primaryDarkGreyHex,
    borderRadius:BORDERRADIUS.radius_10,
    justifyContent:'center',
    alignItems:'center'
  },
  ratingRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom:SPACING.space_10
  },
  ratingcontainer:{
    flexDirection:"row",
    alignItems:'baseline',
    gap:2
  },
  avgratingtxt:{
    fontFamily:'bold',
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex
  },
  ratingcounttxt:{
    fontFamily:'light',
    fontSize:FONTSIZE.size_12,
    color:COLORS.primaryWhiteHex
  },
  roastedcontainer:{
    height:60,
    width:'36%',
    backgroundColor:COLORS.primaryDarkGreyHex,
    borderRadius:BORDERRADIUS.radius_10,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default ImageDisplay;
