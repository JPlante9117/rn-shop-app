import { AsyncStorage } from "react-native"
import { API_KEY } from "../../KEYS/firebaseAPIKey"

export const AUTHENTICATE = 'AUTHENTICATE'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL'
export const LOGOUT = 'LOGOUT'

let timer

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {
        type: LOGOUT
    }
}

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({type: AUTHENTICATE,
            uid: userId,
            token: token})
    }
} 

export const triedAutoLogin = () => {
    return {
        type: SET_DID_TRY_AL
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
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
                case 'WEAK_PASSWORD':
                    message = 'Password is too short. Make sure it is at least 6 characters.'
            }
            throw new Error(message)
        }

        const resData = await resp.json()
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString()
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
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
        
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString()
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

const clearLogoutTimer = () => {
    if(timer){
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirTime)
    }
}

const saveDataToStorage = (token, userId, expDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        uid: userId,
        expiryDate: expDate
    }))
}