import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../../utils/constant'
import { StarIcon, DownloadIcon } from '../../../assets/Icons/Game'

const Usage = ({ ratings, size, download }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={StarIcon} style={styles.icon}></Image>
                <Text style={styles.text}>{ratings.toFixed(1)}</Text>
            </View>
            <View style={styles.size_card}>
                <Image source={DownloadIcon} style={styles.icon}></Image>
                <Text style={styles.text}>{download}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.download_text}>{size} MB</Text>
            </View>
        </View>
    )
}

export default Usage

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: WINDOW_WIDTH * 0.03,
        paddingBottom: WINDOW_WIDTH * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flex: 1,
        backgroundColor: '#ECECEC', 
        padding: WINDOW_WIDTH * 0.02,
        borderRadius: WINDOW_WIDTH * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    size_card: {
        flex: 1,
        backgroundColor: '#ECECEC',
        padding: WINDOW_WIDTH * 0.02,
        borderRadius: WINDOW_WIDTH * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    icon: {
        width: WINDOW_WIDTH * 0.03,
        height: WINDOW_WIDTH * 0.03,
        marginRight: WINDOW_WIDTH * 0.015
    },
    text: {
        fontFamily: 'Roboto-Light'
    },
    download_text: {
        fontFamily: 'Roboto-Medium'
    }
})
