import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, View, Image, Text, StyleSheet, Platform, Button } from 'react-native'
import Colors from '../constants/Colors'
import DefaultText from './DefaultText'

const ProductItem = (props) => {
    let TouchFeedback = TouchableOpacity
    
    if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchFeedback = TouchableNativeFeedback
    }
    
    return (
        <View style={styles.product}>
            <View style={styles.hideOverflow}>
                <TouchFeedback onPress={props.handleDetailsPress} useForeground>
                    <View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.image} source={{uri: props.imageUrl}} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <DefaultText style={styles.price}>${props.price.toFixed(2)}</DefaultText>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button color={Colors.primary} title="View Details" onPress={props.handleDetailsPress} />
                            <Button color={Colors.primary} title="Add To Cart" onPress={props.handleAddCartPress}/>
                        </View>
                    </View>
                </TouchFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        height: '25%'
    },
    product: {
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
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
        height: '15%'
    }
})

export default ProductItem