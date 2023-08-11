import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackIcon } from '../../../assets/Icons/Learning'
import { WINDOW_WIDTH } from '../../../utils/constant'

const TopBar = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
                <View style={styles.icon_container}>
                    <Image source={BackIcon} style={styles.icon} />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>{t('report_topbar')}</Text>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#009BD1',
        flexDirection: 'row',
        alignItems: 'center'
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
