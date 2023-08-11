import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { BackIcon } from '../../../assets/Icons/Leaderboard'
import { WINDOW_WIDTH } from '../../../utils/constant'

const TopBar = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                <View style={styles.icon_container}>
                    <Image source={BackIcon} style={styles.icon} />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>{t('leaderboard_topbar')}</Text>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#35BEE9',
    },
    icon_container: {
        padding: WINDOW_WIDTH * 0.03,
        marginRight: WINDOW_WIDTH * 0.035,
    },
    icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.05,
        textTransform: 'capitalize'
    }
})
