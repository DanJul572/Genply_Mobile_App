import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { BackIcon } from '../../../assets/Icons/Leaderboard'
import { WINDOW_WIDTH } from '../../../utils/constant'

const TopBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                <Image source={BackIcon} style={styles.icon}></Image>
            </TouchableOpacity>
            <Text style={styles.text}>MOST POPULAR PLAYER</Text>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        paddingTop: WINDOW_WIDTH * 0.025,
        paddingHorizontal: WINDOW_WIDTH * 0.035,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#35BEE9',
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
