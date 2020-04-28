import React, { useRef, useState } from 'react'
import { View, FlatList, Text, StyleSheet, Dimensions, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cartActions'
import Animated, { Easing } from 'react-native-reanimated'
import AddToCartPopup from '../../components/UI/AddToCartPopup'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

const ProductsOverviewScreen = props => {
    
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const fadeAnim = useRef(new Animated.Value(0)).current
    const [selectedItem, setSelectedItem] = useState('')

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
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} handleDetailsPress={() => props.navigation.navigate('Details', {productId: itemData.item.id, productTitle: itemData.item.title})} handleAddCartPress={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                    setSelectedItem(itemData.item.title)
                    fadeIn()
                    setTimeout(() => fadeOut(), 2000)
                }} />}
            />
            <AddToCartPopup opacity={fadeAnim} itemName={selectedItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export const productOverviewOptions = navData => {
    return {
        title: 'Nozama',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => navData.navigation.navigate('Cart')}/>
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navData.navigation.toggleDrawer()}/>
    </HeaderButtons>
    }
}

export default ProductsOverviewScreen