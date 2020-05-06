import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Button } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'

const AuthScreen = props => {
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
                            errorMessage="Please enter a valid email address"
                            onInputChange={() => {}}
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
                            errorMessage="Please enter a valid password (min 5 characters)"
                            onInputChange={() => {}}
                            initalValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button title="Login" color={Colors.primary} onPress={() => {}}/>
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