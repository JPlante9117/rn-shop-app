import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import DefaultText from './DefaultText'

class Input extends React.Component {

    state = {
        value: this.props.initialValue ? this.props.initialValue : '',
        isValid: this.props.initialValid ? this.props.initialValid : false,
        touched: false
    }

    textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (this.props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (this.props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (this.props.min != null && +text <= this.props.min) {
        isValid = false;
        }
        if (this.props.max != null && +text > this.props.max) {
        isValid = false;
        }
        if (this.props.minLength != null && text.length < this.props.minLength) {
        isValid = false;
        }

        this.setState(prevState => ({
            ...prevState,
            value: text,
            isValid: isValid,
        }))
    }

    lostFocusHandler = () => {
        this.setState(prevState => ({
            ...prevState,
            touched: true
        }))
        this.props.onInputChange(this.props.id, this.state.value, this.state.isValid)
    }

    render = () => {
        return(
            <View style={styles.formControl}>
                <DefaultText style={styles.label}>{this.props.label}:</DefaultText>
                <TextInput
                    {...this.props}
                    style={{...styles.input, ...this.props.style}}
                    value={this.state.value.toString()}
                    onBlur={this.lostFocusHandler}
                    onChangeText={this.textChangeHandler}
                />
                {!this.state.isValid && this.state.touched && (
                    <Text style={{color: 'red', opacity: 0.4}}>{this.props.errorText}</Text>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
})

/*

*/

export default Input