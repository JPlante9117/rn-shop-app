import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions"
import CartItem from '../../models/cartItem'

const initialState = {
    items: {},
    totalPrice: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product
            let prodPrice = addedProduct.price
            let prodTitle = addedProduct.title

            let currentCartItem

            if (state.items[addedProduct.id]){
                currentCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            } else {
                currentCartItem = new CartItem(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                )
            }
            return {
                ...state,
                items: {...state.items, [addedProduct.id]: currentCartItem},
                totalPrice: state.totalPrice + prodPrice
            }
        case REMOVE_FROM_CART:
            const removedProduct = action.product
            prodPrice = removedProduct.productPrice
            prodTitle = removedProduct.productTitle

            if(state.items[removedProduct.productId].quantity === 1){
                const remainingItems = state.items
                delete remainingItems[removedProduct.productId]
                
                return {
                    ...state,
                    items: remainingItems,
                    totalPrice: state.totalPrice - prodPrice
                }
            } else {
                const updatedCartItem = new CartItem(
                    state.items[removedProduct.productId].quantity - 1,
                    prodPrice,
                    prodTitle,
                    state.items[removedProduct.productId].sum - prodPrice
                )

                return {
                    ...state,
                    items: {...state.items, [removedProduct.productId]: updatedCartItem},
                    totalPrice: state.totalPrice - prodPrice
                }
            }
        default: 
            return state
    }
}