import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import DefaultText from '../UI/DefaultText'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'

const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false)

    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <View style={styles.orderTotalWrapper}>
                    <DefaultText>Order total:</DefaultText><DefaultText style={styles.cost}>${props.amount}</DefaultText>
                </View>
                <DefaultText style={styles.date}>{props.date}</DefaultText>
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <Button title={!showDetails ? 'Show More' : 'Show Less'} color={Colors.primary} onPress={() => {
                        setShowDetails(prevState => !prevState)
                    }}/>
                </View>
                {showDetails && <View style={styles.detailContainer}>
                    {props.items.map(item => <CartItem key={item.productId} quantity={item.quantity} title={item.productTitle} price={item.sum} />)}
                    </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    orderTotalWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cost: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'green',
        marginHorizontal: 10
    },
    date: {
        fontSize: 16,
        color: '#888'
    },
    detailContainer: {
        width: '100%'
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 5
    }
})

export default OrderItem