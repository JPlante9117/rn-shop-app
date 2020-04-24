import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsOverviewScreen, { productOverviewOptions } from '../screens/shop/ProductsOverviewScreen'
import { NavigationContainer } from '@react-navigation/native'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import { enableScreens } from 'react-native-screens'

enableScreens()

const Stack = createStackNavigator()

const ShopNavigator = props => {

    const baseHeaderStyles = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
    
    // const ProductsNavigator = () => {
    //     return(
    //         <Stack.Navigator
    //             screenOptions={baseHeaderStyles}
    //             initialRouteName="Overview"
    //         >
    //             <Stack.Screen
    //                 name="Overview"
    //                 component={ProductsOverviewScreen}
    //             />
    //         </Stack.Navigator>
    //     )
    // }
    
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ShopNavigator