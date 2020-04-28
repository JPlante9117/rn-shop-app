import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'

const CartScreen = props => {
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
        return transformedCart
    })

    return (
        <View style={styles.screen}>
            <View style={styles.items}>
                <DefaultText>Order Summary:</DefaultText>
                <FlatList 
                    data={cartItems}
                    renderItem={itemData => <DefaultText>{itemData.item.title}</DefaultText>}
                />
            </View>
            <View style={styles.summary}>
                <DefaultText style={styles.summaryText}>Total: <DefaultText style={styles.totalPrice}>${cartTotal.toFixed(2)}</DefaultText></DefaultText>
                <Button title="Place Order" color={Colors.accent} disabled={cartItems.length === 0} />
            </View>
        </View>
    )
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
        
    }
})

export default CartScreen