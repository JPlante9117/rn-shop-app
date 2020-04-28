import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import Colors from '../../constants/Colors'

const CustomHeaderButton = props => {

    const iconColor = Platform.OS === 'android' ? 'white' : Colors.primary

    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={iconColor} />
}

export default CustomHeaderButton