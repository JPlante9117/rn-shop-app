import Product from "../../models/product"

export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const SET_PRODUCTS = "SET_PRODUCTS"

export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(`https://rn-shop-app-ac605.firebaseio.com/products/${productId}.json`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            throw new Error('Something went wrong!')
        }
        
        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState().authentication.token
        const userId = getState().authentication.uid
        const response = await fetch(`https://rn-shop-app-ac605.firebaseio.com/products.json?auth=${token}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        })

        const resData = await response.json()

        console.log(resData)

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }
        })
    }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().authentication.uid
        try {
            const response = await fetch('https://rn-shop-app-ac605.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json()
            const loadedProducts = []

            for(const key in resData){
                loadedProducts.push(new Product(key, resData[key].ownerId, resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(item => item.ownerId === userId)
            })
        } catch(err) {
            throw err
        }
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
            const token = getState().authentication.token
            const response = await fetch(`https://rn-shop-app-ac605.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            })

            if(!response.ok){
                throw new Error('Something went wrong!')
            }

            dispatch({
                type: UPDATE_PRODUCT, productData: {
                    id,
                    title,
                    description,
                    imageUrl
                }
            })
    }
}