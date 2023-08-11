import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { LogoGenply } from '../../../assets/Icons/Home'
import { WINDOW_WIDTH } from '../../../utils/constant';

const Logo = () => {
    return (
        <View>
            <Image source={LogoGenply} style={styles.main} />
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    main: {
        height: WINDOW_WIDTH * 0.1,
        width: WINDOW_WIDTH * 0.1,
        resizeMode: 'cover'
    }
})
