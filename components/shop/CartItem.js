import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import DefaultText from '../UI/DefaultText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const CartItem = props => {
    return(
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <DefaultText style={styles.itemTitle}>{props.title.length < 15 ? props.title : props.title.substring(0, 15).concat('...')}</DefaultText>
                <DefaultText style={styles.quantity}> x {props.quantity}</DefaultText>
            </View>
            <View style={styles.itemData}>
                <DefaultText style={styles.amount}>{props.price}</DefaultText>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color={'white'} />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 8
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        color: '#888',
        fontSize: 16
    },
    itemTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        marginHorizontal: 10
    },
    amount: {
        color: 'green',
        fontSize: 16
    },
    deleteButton: {
        padding: 10,
        marginLeft: 20,
        backgroundColor: 'red',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
})

export default CartItem