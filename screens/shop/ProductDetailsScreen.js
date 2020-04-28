import React, { useRef } from 'react'
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'
import * as cartActions from '../../store/actions/cartActions'
import Animated, { Easing } from 'react-native-reanimated'
import AddToCartPopup from '../../components/UI/AddToCartPopup'

const ProductDetailsScreen = props => {

    const {navigation, route} = props

    const productId= route.params.productId
    const selectedProduct = useSelector(state => state.products.availableProducts).find(prod => prod.id === productId)
    const dispatch = useDispatch()

    const fadeAnim = useRef(new Animated.Value(0)).current

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.ease
        }).start()
    }

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 700,
            easing: Easing.ease
        }).start()
    }

    return(
        <View style={styles.screen}>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add To Cart" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct))
                    fadeIn()
                    setTimeout(() => fadeOut(), 2000)
                    }}
                 />
            </View>
            <ScrollView style={styles.textDetails}>
                <DefaultText style={styles.price}>${selectedProduct.price.toFixed(2)}</DefaultText>
                <DefaultText style={styles.description}>{selectedProduct.description}</DefaultText>
            </ScrollView>
            <AddToCartPopup opacity={fadeAnim} itemName={selectedProduct.title} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 300
    },
    textDetails: {
        margin: 10
    },
    price: {
        color: '#888',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        textAlign: 'center'
    },
    actions: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
})

export const productDetailsOptions = navData => {
    return {
        title: navData.route.params.productTitle
    }
}

export default ProductDetailsScreen