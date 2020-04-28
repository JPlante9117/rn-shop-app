import React from 'react'
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/DefaultText'
import * as cartActions from '../../store/actions/cartActions'

const ProductDetailsScreen = props => {

    const {navigation, route} = props

    const productId= route.params.productId
    const selectedProduct = useSelector(state => state.products.availableProducts).find(prod => prod.id === productId)
    const dispatch = useDispatch()

    return(
        <View>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add To Cart" onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
            </View>
            <ScrollView style={styles.textDetails}>
                <DefaultText style={styles.price}>${selectedProduct.price.toFixed(2)}</DefaultText>
                <DefaultText style={styles.description}>{selectedProduct.description}</DefaultText>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    textDetails: {
        margin: 10
    },
    price: {
        color: '#888',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        textAlign: 'center'
    },
    actions: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
})

export const productDetailsOptions = navData => {
    return {
        title: navData.route.params.productTitle
    }
}

export default ProductDetailsScreen