import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BackIcon } from '../../../assets/Icons/Register'
import { WINDOW_WIDTH } from '../../../utils/constant'

const TopBar  = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
                <View style={styles.icon_container}>
                    <Image source={BackIcon} style={styles.icon} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    icon_container: {
        alignSelf: 'flex-start',
        padding: WINDOW_WIDTH * 0.03,
    },
    icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05
    },
})
