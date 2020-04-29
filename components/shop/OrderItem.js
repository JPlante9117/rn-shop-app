import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import DefaultText from '../UI/DefaultText'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'
import Card from '../UI/Card'

const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false)

    return(
        <Card style={styles.orderItem}>
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
        </Card>
    )
}

const styles = StyleSheet.create({
    orderItem: {
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