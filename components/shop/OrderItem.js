import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import DefaultText from '../UI/DefaultText'
import Colors from '../../constants/Colors'

const OrderItem = props => {
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <View style={styles.orderTotalWrapper}>
                    <DefaultText>Order total:</DefaultText><DefaultText style={styles.cost}>${props.amount}</DefaultText>
                </View>
                <DefaultText style={styles.date}>{props.date}</DefaultText>
            </View>
            <View>
                <Button title="Show More" color={Colors.primary} />
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
        width: '100%'
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
    }
})

export default OrderItem