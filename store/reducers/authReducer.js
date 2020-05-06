import { SET_DID_TRY_AL, AUTHENTICATE, LOGOUT } from "../actions/authActions"

const initialState = {
    token: null,
    uid: null,
    didTryAutoLogin: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE:
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
        case LOGOUT:
            return initialState
        default:
            return state
    }
}