import { ADD_TO_CART } from "../actions/cartActions"

const initialState = {
    items: {},
    totalPrice: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            if (state.items[addedProduct.id]){
                const updatedCartItem = new CartItem(
                    ...state.items[addedProduct.id].quantity + 1,
                    prodPrice, prodTitle, ...state.items[addedProduct.id].sum + prodPrice
                )
                return {
                    items: {...state.items, [addedProduct.id]: updatedCartItem},
                    totalPrice: state.totalPrice + prodPrice
                }
            } else {
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
                return {
                    items: {...state.items, [addedProduct.id]: newCartItem},
                    totalPrice: state.totalPrice + prodPrice
                }
            }
        default: 
            return state
    }
}