import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector } from 'react-redux'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)

    return <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} handleDetailsPress={() => props.navigation.navigate('Details', {productId: itemData.item.id, productTitle: itemData.item.title})} />}
            />
}

export const userProductsOptions = navData => {
    return {
        title: 'My Store',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navData.navigation.toggleDrawer()}/>
        </HeaderButtons>
        }
}

export default UserProductsScreen