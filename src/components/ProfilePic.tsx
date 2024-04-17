import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'

const ProfilePic = () => {
  return (
    <View style={styles.imgContainer}>
      <Image source={require('../assets/app_images/avatar.png')} style={styles.img}/>
    </View>
  )
}

const styles = StyleSheet.create({
    imgContainer:{
        height:SPACING.space_36+3,
        width:SPACING.space_36+3,
        borderRadius:SPACING.space_12,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        borderWidth:2,
        borderColor:COLORS.secondaryDarkGreyHex
    },
    img:{
        height:SPACING.space_36+3,
        width:SPACING.space_36+3,
    }
})

export default ProfilePic