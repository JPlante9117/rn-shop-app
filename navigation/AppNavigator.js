import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import ShopNavigator, { AuthNavigator } from './ShopNavigator'

const AppNavigator = props => {

    const isAuth = useSelector(state => !!state.authentication.token)
    const didTryAutoLogin = useSelector(state => state.authentication.didTryAutoLogin)

    return(
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppNavigator