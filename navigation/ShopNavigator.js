import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import ProductsOverviewScreen, { productOverviewOptions } from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import { View, Platform, Button, ScrollView } from 'react-native'
import { enableScreens } from 'react-native-screens'
import ProductDetailsScreen, { productDetailsOptions } from '../screens/shop/ProductDetailsScreen'
import OrdersScreen, { ordersOptions } from '../screens/shop/OrdersScreen'
import CartScreen, { cartOptions } from '../screens/shop/CartScreen'
import { Ionicons, Entypo } from '@expo/vector-icons'
import UserProductsScreen, {userProductsOptions} from '../screens/user/UserProductsScreen'
import EditProductsScreen, { editProductsOptions } from '../screens/user/EditProductsScreen'
import AuthScreen, {authScreenOptions} from '../screens/user/AuthScreen'
import { useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LOGOUT, logout } from '../store/actions/authActions'
import DefaultText from '../components/UI/DefaultText'
import { TouchableOpacity } from 'react-native-gesture-handler'

enableScreens()

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

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

export const ShopNavigator = props => {

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

    const dispatch = useDispatch()
    
    return(
            <Drawer.Navigator
                initialRouteName="Shop"
                drawerContentOptions={{
                    activeTintColor: Colors.primary
                }}
                drawerStyle={{
                    width: '60%'
                }}
                drawerContent={props => {
                    return(
                        <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
                            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                                <DrawerItemList {...props} />
                            </SafeAreaView>
                            <TouchableOpacity style={{padding: 10, flexDirection: 'row', backgroundColor: Colors.primary, alignItems: 'center'}} onPress={() => dispatch(logout())}>
                                    <Ionicons name={Platform.OS === 'android' ? 'md-exit' : 'ios-exit'} size={23} color='white' />
                                    <DefaultText style={{color: 'white', marginLeft: 30}}>LOGOUT</DefaultText>
                            </TouchableOpacity>
                        </ScrollView>
                    )
                }}
            >
                <Drawer.Screen
                    name="Shop"
                    component={storeStack}
                    options={{
                        drawerIcon: props => <Entypo name={'shop'} size={23} color={props.color} />
                    }}
                />
                <Drawer.Screen
                    name="Orders"
                    component={orderStack}
                    options={{
                        drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={props.color}/>
                    }}
                    
                />
                <Drawer.Screen 
                    name="User"
                    component={userStack}
                    options={{
                        drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={props.color}/>,
                        drawerLabel: 'My Store'
                    }}
                />
            </Drawer.Navigator>
    )
}

export const AuthNavigator = props => {
    return(
        <Stack.Navigator
        screenOptions={baseHeaderStyles}
    >
        <Stack.Screen
            name="SignIn"
            component={AuthScreen}
            options={authScreenOptions}
        />
    </Stack.Navigator>
    )
}

export default ShopNavigator