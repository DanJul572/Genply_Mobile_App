import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { ShareIcon } from '../../../assets/Icons/Report'
import { WINDOW_WIDTH } from '../../../utils/constant'

const Topbar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.image_container}>
                <Image source={ShareIcon} style={styles.image} />
            </View>
        </View>
    )
}

export default Topbar

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        marginBottom: WINDOW_WIDTH * 0.075
    },
    image_container: {
        padding: WINDOW_WIDTH * 0.03,
    },
    image: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.055
    }
})
