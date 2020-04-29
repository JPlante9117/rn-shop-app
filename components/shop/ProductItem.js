import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, View, Image, Text, StyleSheet, Platform } from 'react-native'
import DefaultText from '../UI/DefaultText'
import Card from '../UI/Card'

const ProductItem = (props) => {
    let TouchFeedback = TouchableOpacity
    
    if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchFeedback = TouchableNativeFeedback
    }
    
    return (
        <Card style={styles.product}>
            <View style={styles.hideOverflow}>
                <TouchFeedback onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.image} source={{uri: props.imageUrl}} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <DefaultText style={styles.price}>${props.price.toFixed(2)}</DefaultText>
                        </View>
                        <View style={styles.buttonContainer}>
                            {props.children}
                        </View>
                    </View>
                </TouchFeedback>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        height: '23%'
    },
    product: {
        height: 300,
        margin: 20
    },
    hideOverflow: {
        overflow: 'hidden',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imgContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        color: '#888',
        marginHorizontal: 20,
    },
    details: {
        alignItems: 'center',
        height: '17%'
    }
})

export default ProductItem