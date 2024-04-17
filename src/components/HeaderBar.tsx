import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,  FONTSIZE } from '../theme/theme'
import GradiantIcon from './GradiantIcon'
import ProfilePic from './ProfilePic'

interface HeaderBarProps{
    title?:string,
}
const HeaderBar:React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <GradiantIcon name='view-grid' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_28} />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic/>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer:{
        padding:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    HeaderText:{
        fontFamily:'semiBold',
        fontSize:FONTSIZE.size_20,
        color:COLORS.primaryWhiteHex
    }
})

export default HeaderBar