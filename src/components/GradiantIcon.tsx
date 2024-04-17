import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, SPACING} from '../theme/theme'
import { MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react'

interface GradiantIconProps{
    name:any,
    color:string,
    size:number,
}
const GradiantIcon:React.FC<GradiantIconProps> = ({name,color,size}) => {
  return (
    <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={[COLORS.primaryGreyHex,COLORS.primaryDarkGreyHex]} style={styles.gradiant}>
      
    <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={name} size={size} color={color} />
    </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    iconContainer:{
        borderWidth:2,
        borderColor:COLORS.primaryDarkGreyHex,
        borderRadius:SPACING.space_12,
        alignItems:'center',
        justifyContent:'center',
        padding:2
    },
    gradiant:{
      borderRadius:SPACING.space_12
    }
})

export default GradiantIcon