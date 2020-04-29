import React, { useRef } from 'react'
import { View, StyleSheet, Button, Dimensions } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import { removeFromCart, clearCart } from '../../store/actions/cartActions'
import { addOrder } from '../../store/actions/ordersActions'
import Animated, { Easing } from 'react-native-reanimated'
import OrderPlacedPopup from '../../components/shop/OrderPlacedPopup'

const CartScreen = props => {
    const dispatch = useDispatch()
    const cartTotal = useSelector(state => state.cart.totalPrice)
    const cartItems = useSelector(state => {
        const transformedCart = []
        for(const key in state.cart.items){
            transformedCart.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCart.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })

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

    return (
        <View style={styles.screen}>
            <View style={styles.items}>
                <DefaultText style={styles.titleText}>Order Summary:</DefaultText>
                {cartItems.length === 0 ? 
                    <DefaultText style={styles.emptyMessageText}>Your Cart Is Empty</DefaultText>
                 : 
                 <FlatList 
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => <CartItem quantity={itemData.item.quantity} deletable title={itemData.item.productTitle} price={itemData.item.productPrice} onRemove={() => dispatch(removeFromCart(itemData.item)) } />}
                />}
            </View>
            <OrderPlacedPopup opacity={fadeAnim} navigation={props.navigation}/>
            <View style={styles.summary}>
                <DefaultText style={styles.summaryText}>Total: <DefaultText style={styles.totalPrice}>${cartTotal.toFixed(2)}</DefaultText></DefaultText>
                <Button title="Place Order" color={Colors.accent} disabled={cartItems.length === 0} onPress={() => {
                    dispatch(addOrder(cartItems, cartTotal))
                    fadeIn()
                    setTimeout(() => fadeOut(), 6000)
                }} />
            </View>
        </View>
    )
}

export const cartOptions = navData => {
    return {
        title: 'Checkout'
        }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    summary: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-end'
    },
    summaryText: {
        textAlign: 'right',
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: 30,
        color: '#888'
    },
    totalPrice: {
        color: 'green',
        fontSize: 30,
    },
    items: {
        margin: 20,
        
    },
    titleText: {
        marginBottom: 10,
        fontFamily: 'open-sans-bold',
        fontSize: 20
    },
    emptyMessageText: {
        fontSize: 40,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 50
    }
})

export default CartScreen