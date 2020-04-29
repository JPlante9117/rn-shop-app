import React from 'react'
import { StyleSheet, View } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'

const EditProductsScreen = props => {
    return(
        <View>
            <DefaultText>EDIT/ADD PRODUCTS</DefaultText>
        </View>
    )
}

const styles = StyleSheet.create({

})

export const editProductsOptions = navData => {
    return {
        title: navData.route.params.title
    }
}

export default EditProductsScreen