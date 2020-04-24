import React from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/ProductItem'

const ProductsOverviewScreen = props => {
    
    const products = useSelector(state => state.products.availableProducts)

    return(
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} handleDetailsPress={() => {}} handleAddCartPress={() => {}} />}
        />
    )
}

export const productOverviewOptions = navData => {
    return {
        title: 'Nozama'
    }
}

export default ProductsOverviewScreen