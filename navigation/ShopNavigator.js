import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsOverviewScreen, { productOverviewOptions } from '../screens/shop/ProductsOverviewScreen'
import { NavigationContainer } from '@react-navigation/native'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import { enableScreens } from 'react-native-screens'
import ProductDetailsScreen, { productDetailsOptions } from '../screens/shop/ProductDetailsScreen'

enableScreens()

const Stack = createStackNavigator()

const ShopNavigator = props => {

    const baseHeaderStyles = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
    }
    
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={baseHeaderStyles}
                initialRouteName="Overview"
            >
                <Stack.Screen
                    name="Overview"
                    component={ProductsOverviewScreen}
                    options={productOverviewOptions}
                />
                <Stack.Screen
                    name="Details"
                    component={ProductDetailsScreen}
                    options={productDetailsOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ShopNavigator