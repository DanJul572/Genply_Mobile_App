import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackIcon } from '../../../assets/Icons/DetailedInformation'
import { WINDOW_WIDTH } from '../../../utils/constant'

const TopBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
                <Image source={BackIcon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.text}>DETAILED INFORMATIONS</Text>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#009BD1',
        padding: WINDOW_WIDTH * 0.035,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.015
    },
    icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        marginRight: WINDOW_WIDTH * 0.035
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.05,
        textTransform: 'capitalize'
    }
})
