import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NotificationIcon } from '../../../assets/Icons/Home'
import { WINDOW_WIDTH } from '../../../utils/constant';

const Notification = () => {
    return (
        <View>
            <Image source={NotificationIcon} style={styles.main} />
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    main: {
        height: WINDOW_WIDTH * 0.095,
        width: WINDOW_WIDTH * 0.095
    }
})
