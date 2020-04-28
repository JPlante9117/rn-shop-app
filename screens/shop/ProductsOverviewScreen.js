import React from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/ProductItem'
import * as cartActions from '../../store/actions/cartActions'

const ProductsOverviewScreen = props => {
    
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    return(
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} handleDetailsPress={() => props.navigation.navigate('Details', {productId: itemData.item.id, productTitle: itemData.item.title})} handleAddCartPress={() => dispatch(cartActions.addToCart(itemData.item))} />}
        />
    )
}

export const productOverviewOptions = navData => {
    return {
        title: 'Nozama'
    }
}

export default ProductsOverviewScreen