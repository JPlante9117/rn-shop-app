import React, { useState, useCallback, useEffect } from 'react'
import { View, Platform, StyleSheet, ActivityIndicator, Button } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import { fetchOrders } from '../../store/actions/ordersActions'
import Colors from '../../constants/Colors'

const OrdersScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    const loadOrders = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(fetchOrders())
        } catch(err) {
            setError(err)
        }
        setIsLoading(false)
    }, [setIsLoading, setError, dispatch])

    useEffect(() => {
        loadOrders()
    }, [dispatch, loadOrders])

    if(error){
        return <View style={styles.centered}>
            <DefaultText style={styles.emptyMessageText}>An Error Occurred!</DefaultText>
            <Button title="Retry" onPress={loadOrders} />
        </View>
    }

    if(isLoading){
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if(!isLoading && orders.length === 0) {
        return <View style={styles.centered}>
            <DefaultText style={styles.emptyMessageText}>No Orders Found.</DefaultText>
        </View>
    }

    return(
        <FlatList 
        data={orders}
        renderItem={itemData => <OrderItem amount={itemData.item.totalAmount.toFixed(2)} date={itemData.item.readableDate} items={itemData.item.items} />}
        />
    )
}

export const ordersOptions = navData => {
    return {
        title: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navData.navigation.toggleDrawer()}/>
        </HeaderButtons>
        }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyMessageText: {
        fontSize: 40,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 50
    }
})

export default OrdersScreen