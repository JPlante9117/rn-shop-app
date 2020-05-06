import React, { useReducer, useCallback } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Button } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { signup } from '../../store/actions/authActions'

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

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        formDispatch({
            type: 'UPDATE',
            value: inputValue,
            validity: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch])

    const signupHandler = () => {
        dispatch(signup(formState.inputValues.email, formState.inputValues.password))
    }

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
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button title="Login" color={Colors.primary} onPress={signupHandler}/>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button title="Switch to Signup" color={Colors.primary} onPress={() => {}}/>
                            </View>
                        </View>
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