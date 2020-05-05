import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Platform, Alert, View, ActivityIndicator, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { deleteProduct } from '../../store/actions/productsActions'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('Edit Products', {pid: id, title: title})
    }

    const deleteAlert = id => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',
        [{text:'Cancel', style: 'default'},
        {text: 'Yes', style: 'destructive', onPress: async () => {
                setIsLoading(true)
                setError(null)
                try{
                    await dispatch(deleteProduct(id))
                } catch(err){
                    setError(err)
                }
                setIsLoading(false)
            }
        }])
    }

    useEffect(() => {
        if (error){
            Alert.alert('An error occurred!', error, [{text: 'Okay'}])
        }
    })

    if(isLoading){
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserProductsScreen