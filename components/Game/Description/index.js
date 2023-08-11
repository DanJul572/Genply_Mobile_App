import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WINDOW_WIDTH } from '../../../utils/constant'
import { DetailIcon } from '../../../assets/Icons/Game'
import { useTranslation } from 'react-i18next'

const Description = ({ navigation, detailedDescription, description, version, size }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.description_container}>
                <View style={styles.description_sub_container}>
                    <Text style={styles.description_title}>{t('description_text')}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('DetailedDescription', { description: detailedDescription })}>
                        <View style={styles.detail_icon_container}>
                            <Image source={DetailIcon} style={styles.detail_icon} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.description_text}>{description}</Text>
            </View>
            <View>
                <Text style={styles.information_title}>{t('information_text')}</Text>
                <View style={styles.information_content}>
                    <Text style={styles.information_text}>{t('version_text')}</Text>
                    <Text style={styles.information_text}>{version}</Text>
                </View>
                <View style={styles.information_content}>
                    <Text style={styles.information_text}>{t('size_text')}</Text>
                    <Text style={styles.information_text}>{size} MB</Text>
                </View>
            </View>
        </View>
    )
}

export default Description

const styles = StyleSheet.create({
    container: {
        marginTop: WINDOW_WIDTH * 0.035,
        paddingHorizontal: WINDOW_WIDTH * 0.03,
        paddingBottom: WINDOW_WIDTH * 0.03,
    },
    description_container: {
        marginBottom: WINDOW_WIDTH * 0.1
    },
    description_sub_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    description_title: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.04,
        marginBottom: WINDOW_WIDTH * 0.015,
    },
    detail_icon_container: {
        padding: WINDOW_WIDTH * 0.025
    },
    detail_icon: {
        height: WINDOW_WIDTH * 0.035,
        resizeMode: 'contain'
    },
    description_text: {
        fontFamily: 'Roboto-Light',
    },
    information_title: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.04,
        marginBottom: WINDOW_WIDTH * 0.015
    },
    information_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.015
    },
    information_text: {
        fontFamily: 'Roboto-Light',
    }
})
