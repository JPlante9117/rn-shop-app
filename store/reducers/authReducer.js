import { LOGIN, SIGNUP, SET_DID_TRY_AL } from "../actions/authActions"

const initialState = {
    token: null,
    uid: null,
    didTryAutoLogin: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {
                token: action.token,
                uid: action.userId,
                didTryAutoLogin: true
            }
        case SIGNUP:
            return {
                token: action.token,
                uid: action.userId,
                didTryAutoLogin: true
            }
        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin: true
            }
        default:
            return state
    }
}