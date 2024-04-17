import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { COLORS } from '../theme/theme'

interface EmptyLIstViewProps{
    title?:string
}
const EmptyListView:React.FC<EmptyLIstViewProps> = ({title}) => {
  return (
    <View style={styles.emptylistcontainer}>
      <AnimatedLottieView style={styles.animation} autoPlay loop source={require('../lottie/coffeecup.json')} />
        <Text style={styles.emptytxt}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    emptylistcontainer:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    animation:{
        height:200,
        width:200
    },
    emptytxt:{
        fontFamily:'semiBold',
        color:COLORS.primaryOrangeHex
    }
})

export default EmptyListView