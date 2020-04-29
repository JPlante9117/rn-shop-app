import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Platform, Alert } from 'react-native'
import Colors from '../../constants/Colors'
import { deleteProduct } from '../../store/actions/productsActions'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('Edit Products', {pid: id, title: title})
    }

    const deleteAlert = id => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',
        [{text:'Cancel', style: 'default'},
        {text: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(id))}])
    }

    return <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}>
                    <Button color={Colors.primary} title="Edit Listing" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
                    <Button color={Colors.primary} title="Remove From Store" onPress={() => deleteAlert(itemData.item.id)}/>
            </ProductItem>}
            />
}

export const userProductsOptions = navData => {
    return {
        title: 'My Store',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navData.navigation.toggleDrawer()}/>
        </HeaderButtons>
        ,
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => navData.navigation.navigate('Edit Products', {title: 'Add New Product'})}/>
        </HeaderButtons>
}}

export default UserProductsScreen