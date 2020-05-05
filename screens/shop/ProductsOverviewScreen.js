import React, { useRef, useState, useEffect, useCallback } from 'react'
import { View, FlatList, StyleSheet, Platform, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cartActions'
import Animated, { Easing } from 'react-native-reanimated'
import AddToCartPopup from '../../components/shop/AddToCartPopup'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import { fetchProducts } from '../../store/actions/productsActions'
import DefaultText from '../../components/UI/DefaultText'

const ProductsOverviewScreen = props => {
    
    const products = useSelector(state => state.products.availableProducts)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const dispatch = useDispatch()

    const fadeAnim = useRef(new Animated.Value(0)).current
    const [selectedItem, setSelectedItem] = useState('')

    const loadProducts = useCallback(async () => {
        setError(undefined)
        setLoading(true)
        try {
            await dispatch(fetchProducts())
        } catch(err){
            setError(err.message)
        }
        setLoading(false)
    }, [dispatch, setLoading, setError])

    useEffect(()=>{
        loadProducts()
    }, [dispatch, loadProducts])

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

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('Details', {productId: id, productTitle: title})
    }

    const addToCartHandler = item => {
        dispatch(cartActions.addToCart(item))
        setSelectedItem(item.title)
        fadeIn()
        setTimeout(() => fadeOut(), 2000)
    }

    if(error){
        return <View style={styles.centered}>
            <DefaultText>An Error Occurred!</DefaultText>
            <Button title="Retry" onPress={loadProducts} />
        </View>
    }

    if(loading){
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if(!loading && products.length === 0) {
        return <View style={styles.centered}>
            <DefaultText>No Products Found.</DefaultText>
        </View>
    }

    return(
        <View style={styles.screen}>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}>
                    <Button color={Colors.primary} title="View Details" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
                    <Button color={Colors.primary} title="Add To Cart" onPress={() => addToCartHandler(itemData.item)}/>
                </ProductItem>}
            />
            <AddToCartPopup opacity={fadeAnim} itemName={selectedItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
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