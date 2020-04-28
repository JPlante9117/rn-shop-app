import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import DefaultText from './DefaultText'
import Colors from '../../constants/Colors'

const AddToCartPopup = props => {
    return(
        <View style={styles.animContainer}>
                <Animated.View style={{...styles.addToCartView, opacity: props.opacity}}>
                    <DefaultText style={styles.animText}>{props.itemName} added to Cart</DefaultText>
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
        bottom: '5%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    animText: {
        fontSize: 15,
        fontFamily: 'open-sans-bold'
    }
})

export default AddToCartPopup