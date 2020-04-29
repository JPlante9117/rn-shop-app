import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-native'
import Colors from '../../constants/Colors'
import { deleteProduct } from '../../store/actions/productsActions'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {

    }

    const deleteItemHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price}>
                    <Button color={Colors.primary} title="Edit Listing" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
                    <Button color={Colors.primary} title="Remove From Store" onPress={() => deleteItemHandler(itemData.item.id)}/>
            </ProductItem>}
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