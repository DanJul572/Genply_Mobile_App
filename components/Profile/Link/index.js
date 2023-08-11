import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { MedalIcon, TrophyIcon, SmileIcon } from '../../../assets/Icons/Profile'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'

const Link = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={MedalIcon}/>
            <Image style={styles.icon} source={TrophyIcon}/>
            <Image style={styles.icon} source={SmileIcon}/>
        </View>
    )
}

export default Link

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF'
    },
    icon: {
        width: WINDOW_WIDTH * 0.2,
        height: WINDOW_WIDTH * 0.2,
        marginHorizontal: 10
    }
})
