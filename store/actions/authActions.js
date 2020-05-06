import { AsyncStorage } from "react-native"

export const AUTHENTICATE = 'AUTHENTICATE'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL'
export const LOGOUT = 'LOGOUT'

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const authenticate = (userId, token) => {
    return {
        type: AUTHENTICATE,
        uid: userId,
        token: token
    }
} 

export const triedAutoLogin = () => {
    return {
        type: SET_DID_TRY_AL
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqx1bvkiDewT2bpSohXETetD1UOb8XnF8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!resp.ok){
            const errorResData = await resp.json()

            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            console.log(errorId)
            switch(errorId){
                case 'INVALID_EMAIL':
                    message = 'This email is not valid!'
                    break
                case 'EMAIL_EXISTS':
                    message = 'This email already exists!'
                    break
                case 'INVALID_PASSWORD':
                    message = 'The password is invalid!'
                    break
                case 'MISSING_PASSWORD':
                    message = 'No password was given! Please supply a password.'
                    break
            }
            throw new Error(message)
        }

        const resData = await resp.json()
        dispatch(authenticate(resData.localId, resData.idToken))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString()
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqx1bvkiDewT2bpSohXETetD1UOb8XnF8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!resp.ok){
            const errorResData = await resp.json()

            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            console.log(errorId)
            switch(errorId){
                case 'INVALID_EMAIL':
                    message = 'This email is not valid!'
                    break
                case 'EMAIL_NOT_FOUND':
                    message = 'This email is not found!'
                    break
                case 'INVALID_PASSWORD':
                    message = 'The password is invalid!'
                    break
                case 'MISSING_PASSWORD':
                    message = 'No password was given! Please supply a password.'
                    break
            }
            throw new Error(message)
        }

        const resData = await resp.json()
        
        dispatch(authenticate(resData.localId, resData.idToken))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString()
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

const saveDataToStorage = (token, userId, expDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        uid: userId,
        expiryDate: expDate
    }))
}