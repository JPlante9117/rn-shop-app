import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct, createProduct } from '../../store/actions/productsActions'

const EditProductsScreen = props => {

    const prodId = props.route.params.pid
    const currentProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [title, setTitle] = useState(currentProduct ? currentProduct.title : '')
    const [imgURL, setImgURL] = useState(currentProduct ? currentProduct.imageUrl : '')
    const [price, setPrice] = useState(currentProduct ? currentProduct.price.toString() : '')
    const [desc, setDesc] = useState(currentProduct ? currentProduct.description : '')
    const disablePrice = currentProduct ? true : false

    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        if (currentProduct) {
            dispatch(updateProduct(prodId, title, desc, imgURL))
        } else {
            dispatch(createProduct(title, desc, imgURL, +price))
        }
        props.navigation.goBack()
    }, [prodId, title, desc, price, imgURL])

    useEffect(() => {
        props.navigation.setParams({submitForm: submitHandler})
    }, [submitHandler])

    return(
        <ScrollView style={styles.form}>
            <View style={styles.formControl}>
                <DefaultText style={styles.label}>Title:</DefaultText>
                <TextInput style={styles.input} placeholder={'Enter the Product Name'} value={title} onChangeText={(text) => setTitle(text)} />
                <DefaultText style={styles.label}>Image URL:</DefaultText>
                <TextInput style={styles.input} placeholder={'Enter an Image URL for the Product'} value={imgURL} onChangeText={(text) => setImgURL(text)} />
                <DefaultText style={styles.label}>Price:</DefaultText>
                <TextInput style={!disablePrice ? styles.input : styles.disabledInput} placeholder={'Enter the Price for the Product'} value={price} onChangeText={(text) => setPrice(text)} editable={!disablePrice} />
                <DefaultText style={styles.label}>Description:</DefaultText>
                <TextInput style={styles.input} placeholder={'Enter a short Description of the Product'} value={desc} onChangeText={(text) => setDesc(text)} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    disabledInput: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        color: '#ccc'
    }
})

export const editProductsOptions = navData => {
    return {
        title: navData.route.params.title,
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={() => navData.route.params.submitForm()}/>
        </HeaderButtons>
    }
}

export default EditProductsScreen