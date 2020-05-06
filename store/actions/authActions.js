export const SIGNUP = 'SIGNUP'

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
            throw new Error('Something went wrong!')
        }

        const resData = await resp.json()
        console.log(resData)
        dispatch({
            type: SIGNUP
        })
    }
}