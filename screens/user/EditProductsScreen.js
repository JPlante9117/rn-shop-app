import React, { useCallback, useEffect, useReducer } from 'react'
import { StyleSheet, Platform, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct, createProduct } from '../../store/actions/productsActions'
import Input from '../../components/UI/Input'

const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.validity
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
          }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}

const EditProductsScreen = props => {

    const prodId = props.route.params.pid
    const currentProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
    const disablePrice = currentProduct ? true : false

    const dispatch = useDispatch()

    const initialState = {
        inputValues: {
            title: currentProduct ? currentProduct.title : '',
            imgUrl: currentProduct ? currentProduct.imageUrl : '',
            price: currentProduct ? currentProduct.price.toString() : '',
            description: currentProduct ? currentProduct.description : ''
        },
        inputValidities: {
            title: currentProduct ? true : false,
            imgUrl: currentProduct ? true : false,
            price: currentProduct ? true : false,
            description: currentProduct ? true : false
        },
        formIsValid: currentProduct ? true : false
    }

    const [formState, formDispatch] = useReducer(formReducer, initialState)

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid){
            Alert.alert('Invalid Product', 'Please check to make sure your form is filled out properly!', [
                {text: 'Okay'}
            ])
            return
        }
        if (currentProduct) {
            dispatch(updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imgUrl))
        } else {
            dispatch(createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imgUrl, +formState.inputValues.price))
        }
        props.navigation.goBack()
    }, [
        prodId,
        formState,
        dispatch
    ])

    useEffect(() => {
        props.navigation.setParams({submitForm: submitHandler})
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        formDispatch({
            type: 'UPDATE',
            value: inputValue,
            validity: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch])

    return(
        <ScrollView style={styles.form}>
            <Input 
                id='title'
                label='Title'
                errorText='Please enter a Valid Title'
                autoCapitalize='words'
                returnKeyType='next'
                placeholder={'Enter the Product Name'}
                onInputChange={inputChangeHandler}
                initialValue={currentProduct ? currentProduct.title : ''}
                initialValid={!!currentProduct}
                required
            />
            <Input
                id='imgUrl'
                label='Image URL'
                errorText='Please enter a Valid Image URL'
                placeholder={'Enter an Image URL for the Product'}
                returnKeyType='next'
                onInputChange={inputChangeHandler}
                initialValue={currentProduct ? currentProduct.imageUrl : ''}
                initialValid={!!currentProduct}
                required
            />
            <Input
                id='price'
                label='Price'
                errorText='Please enter a Valid Price'
                style={!disablePrice ? styles.input : styles.disabledInput}
                placeholder={'Enter the Price for the Product'}
                editable={!disablePrice}
                keyboardType='decimal-pad'
                returnKeyType='next'
                onInputChange={inputChangeHandler}
                initialValue={currentProduct ? currentProduct.price : ''}
                initialValid={!!currentProduct}
                min={0}
                required
            />
            <Input
                id='description'
                label='Description'
                errorText='Please enter a Valid Description'
                placeholder={'Enter a short Description of the Product'}
                autoCapitalize='sentences'
                multiline
                numberOfLines={3}
                onInputChange={inputChangeHandler}
                initialValue={currentProduct ? currentProduct.description : ''}
                initialValid={!!currentProduct}
                required
                minLength={5}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
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
            <Item title="Confirm" iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={() => navData.route.params.submitForm()}/>
        </HeaderButtons>
    }
}

export default EditProductsScreen