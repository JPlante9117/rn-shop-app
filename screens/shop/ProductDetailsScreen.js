import React from 'react'
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'

const ProductDetailsScreen = props => {

    const {navigation, route} = props

    const productId= route.params.productId
    const selectedProduct = useSelector(state => state.products.availableProducts).find(prod => prod.id === productId)

    return(
        <View>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add To Cart" onPress={() => {}} />
            </View>
            <ScrollView style={styles.textDetails}>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
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
        fontSize: 14,
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