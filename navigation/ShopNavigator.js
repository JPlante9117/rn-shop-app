import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProductsOverviewScreen, { productOverviewOptions } from '../screens/shop/ProductsOverviewScreen'
import { NavigationContainer } from '@react-navigation/native'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import { enableScreens } from 'react-native-screens'
import ProductDetailsScreen, { productDetailsOptions } from '../screens/shop/ProductDetailsScreen'
import OrdersScreen, { ordersOptions } from '../screens/shop/OrdersScreen'
import CartScreen, { cartOptions } from '../screens/shop/CartScreen'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/UI/HeaderButton'
import { Ionicons, Entypo } from '@expo/vector-icons'
import UserProductsScreen, {userProductsOptions} from '../screens/user/UserProductsScreen'
import EditProductsScreen, { editProductsOptions } from '../screens/user/EditProductsScreen'

enableScreens()

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

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

    const storeStack = () => {
        return( 
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
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={cartOptions}
                />
            </Stack.Navigator>
        )
    }

    const orderStack = () => {
        return(
            <Stack.Navigator
                screenOptions={baseHeaderStyles}
                initialRouteName="Orders"
            >
                <Stack.Screen
                    name="Orders"
                    component={OrdersScreen}
                    options={ordersOptions}
                    />
            </Stack.Navigator>
        )
    }

    const userStack = () => {
        return(
            <Stack.Navigator
                screenOptions={baseHeaderStyles}
                initialRouteName="UserProducts"
            >
                <Stack.Screen
                    name="User Products"
                    component={UserProductsScreen}
                    options={userProductsOptions}
                    />
                <Stack.Screen
                    name="Edit Products"
                    component={EditProductsScreen}
                    options={editProductsOptions}
                />
            </Stack.Navigator>
        )
    }
    
    return(
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Shop"
                drawerContentOptions={{
                    activeTintColor: Colors.primary
                }}
            >
                <Drawer.Screen
                    name="Shop"
                    component={storeStack}
                    options={{
                        drawerIcon: drawerConfig => <Entypo name={'shop'} size={23} color={drawerConfig.tintColor} />
                    }}
                />
                <Drawer.Screen
                    name="Orders"
                    component={orderStack}
                    options={{
                        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor}/>
                    }}
                    
                />
                <Drawer.Screen 
                    name="User"
                    component={userStack}
                    options={{
                        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor}/>,
                        drawerLabel: 'My Store'
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default ShopNavigator