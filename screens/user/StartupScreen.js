import React, { useEffect } from 'react'
import {View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'
import Colors from '../../constants/Colors'
import { authenticate, triedAutoLogin } from '../../store/actions/authActions'
import { useDispatch } from 'react-redux'
import DefaultText from '../../components/UI/DefaultText'

const StartupScreen = props => {

    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if(!userData){
                dispatch(triedAutoLogin())
                return
            }
            
            const transformedData = JSON.parse(userData)
            const { token, uid, expiryDate } = transformedData
            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !uid){
                dispatch(triedAutoLogin())
                return
            }
            const expirationTime = expirationDate.getTime() - new Date().getTime()

            dispatch(authenticate(uid, token, parseInt(expirationTime) * 1000))
        }
        tryLogin()
    }, [dispatch, authenticate])

    return(
        <View style={styles.screen}>
            <DefaultText style={styles.title}>NOZAMA</DefaultText>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: Colors.primary,
        fontSize: 70,
        fontFamily: 'open-sans-bold'
    }
})

export default StartupScreen