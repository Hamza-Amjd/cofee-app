import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface priceProps{
    price: string;
    buttonHandler:any;
    buttonTitle:string;
}
const PaymentFooter: React.FC<priceProps> = ({price,buttonHandler,buttonTitle}) => {
  return (
    <View style={styles.paymentfooter}>
      <View style={styles.pricecontainer}>
        <Text style={styles.pricelabel}>Price</Text>
        <Text style={styles.PriceCurrency}>$<Text style={styles.pricetxt}>  {price}</Text></Text>
      </View>
      <TouchableOpacity onPress={() => buttonHandler()} style={styles.btncontainer}>
        <Text style={styles.btnTitle}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    paymentfooter:{
        marginTop:SPACING.space_10,
        flexDirection:'row',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
    },
    pricecontainer:{
      justifyContent:'center',
        alignItems:'center',
        width:100
    },
    pricelabel:{
        color:COLORS.primaryWhiteHex,
        fontFamily:'light',
        fontSize:FONTSIZE.size_10
    },
    PriceCurrency:{
      color:COLORS.primaryOrangeHex,
      fontSize:FONTSIZE.size_20,
      fontFamily:'semiBold'
    },
    pricetxt:{
      color:COLORS.primaryWhiteHex,
      fontFamily:'semiBold',
      fontSize:FONTSIZE.size_20
    },
    btncontainer:{
      backgroundColor:COLORS.primaryOrangeHex,
      flex:1,
      borderRadius:BORDERRADIUS.radius_20,
      justifyContent:'center',
      alignItems:'center',
    },
    btnTitle:{
      color:COLORS.primaryWhiteHex,
      fontFamily:'semiBold',
      fontSize:FONTSIZE.size_20
    }
})

export default PaymentFooter