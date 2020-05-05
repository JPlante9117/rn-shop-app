import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/productsActions'
import Product from '../../models/product'

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
    switch(action.type){
        case DELETE_PRODUCT:
            return{
                ...state,
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.pid),
                userProducts: state.userProducts.filter(prod => prod.id !== action.pid)
            }
        case CREATE_PRODUCT:
            const newProd = new Product(action.productData.id, 'u1', action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)
            return {
                ...state,
                availableProducts: [...state.availableProducts, newProd],
                userProducts: [...state.userProducts, newProd]
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.productData.id)
            const updatedProduct = new Product(action.productData.id, state.userProducts[productIndex].ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, state.userProducts[productIndex].price)
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProduct
            const updatedAllProducts = [...state.availableProducts]
            const availableProdIndex = state.availableProducts.findIndex(prod => prod.id === action.productData.id)
            updatedAllProducts[availableProdIndex] = updatedProduct

            return {
                ...state,
                availableProducts: updatedAllProducts,
                userProducts: updatedUserProducts
            }
        default: 
            return state
    }
}