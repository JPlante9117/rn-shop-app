import React, { useRef, useState } from 'react'
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/ProductItem'
import * as cartActions from '../../store/actions/cartActions'
import Animated, { Easing } from 'react-native-reanimated'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/DefaultText'
import AddToCartPopup from '../../components/AddToCartPopup'

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
        title: 'Nozama'
    }
}

export default ProductsOverviewScreen