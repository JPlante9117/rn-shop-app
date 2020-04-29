import React from 'react'
import { View, Platform } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = props => {

    const orders = useSelector(state => state.orders.orders)

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

export default OrdersScreen