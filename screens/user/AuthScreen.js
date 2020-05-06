import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { signup, login } from '../../store/actions/authActions'

const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.validity
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
          }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}

const AuthScreen = props => {

    const dispatch = useDispatch()

    const initialState = {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    }

    const [formState, formDispatch] = useReducer(formReducer, initialState)
    const [isSignup, setIsSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        formDispatch({
            type: 'UPDATE',
            value: inputValue,
            validity: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch])

    const authHandler = async () => {
        setError(null)
        setIsLoading(true)
        try {
            if(isSignup){
                await dispatch(signup(formState.inputValues.email, formState.inputValues.password))
            } else {
                await dispatch(login(formState.inputValues.email, formState.inputValues.password))
            }
        } catch(err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if(error){
            Alert.alert('An Error Occurred', error, [{text: 'Okay'}])
        }
    }, [error])

    return(
        <KeyboardAvoidingView style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView style={{width: '100%'}}>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initalValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password (min 5 characters)"
                            onInputChange={inputChangeHandler}
                            initalValue=""
                        />
                        {isLoading ? (
                            <ActivityIndicator size='small' color={Colors.primary} />
                        ) : (
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primary} onPress={authHandler}/>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} color={Colors.accent} onPress={() => setIsSignup(!isSignup)}/>
                            </View>
                        </View>
                        )}
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export const authScreenOptions = navData => {
    return {
        title: 'Sign In'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonWrapper: {
        marginVertical: 5,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
})

export default AuthScreen