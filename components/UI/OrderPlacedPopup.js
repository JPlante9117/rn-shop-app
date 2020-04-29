import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import DefaultText from './DefaultText'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OrderPlacedPopup = props => {
    return(
            <View style={styles.animContainer}>
                <Animated.View style={{...styles.addToCartView, opacity: props.opacity}}>
                    <DefaultText style={styles.animText}>Your Order Has Been Placed!</DefaultText>
                    <View style={{flexDirection: 'row'}}>
                        <DefaultText style={{flexDirection: 'row'}}>You can view it in</DefaultText>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Orders')}>
                            <DefaultText style={styles.link}>Your Orders</DefaultText>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
    )
}

const styles = StyleSheet.create({
    addToCartView: {
        marginTop: 15,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accent
    },
    animContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animText: {
        fontSize: 15,
        fontFamily: 'open-sans-bold'
    },
    link: {
        color: 'blue',
        fontFamily: 'open-sans-bold'
    }
})

export default OrderPlacedPopup