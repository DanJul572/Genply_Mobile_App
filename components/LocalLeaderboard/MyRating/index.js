import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant';

const MyRating = ({ player }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.main_container}>
            <View style={styles.container}>
                {(Object.keys(player).length > 0) && (
                    <View style={styles.player_container}>
                        <View style={styles.profile_container}>
                            <Text style={styles.number}>{player.number}</Text>
                            <View style={styles.avatar_container}>
                                <Image source={{ uri: BASE_URL + '/storage/profil/' + player.photo }} style={styles.avatar} />
                            </View>
                            <Text style={styles.name}>{player.namalengkap}</Text>
                        </View>
                        <View style={styles.point_container}>
                            <Text style={styles.point}>{player.nilai}</Text>
                        </View>
                    </View>
                )}
                {(Object.keys(player).length <= 0)&& (
                    <Text style={styles.alert}>{t('not_ranked')}</Text>
                )}
            </View>
        </View>
    )
}

export default MyRating

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: '#FFFFFF'
    },
    container: {
        paddingHorizontal: WINDOW_WIDTH * 0.05,
        backgroundColor: '#FF4660',
        justifyContent: 'center',
        paddingVertical: WINDOW_WIDTH * 0.03,
        borderTopLeftRadius: WINDOW_WIDTH * 0.05,
        borderTopRightRadius: WINDOW_WIDTH * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    player_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profile_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 3
    },
    number: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        color: '#FFFFFF',
        flex: 1
    },
    name: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        color: '#FFFFFF',
        flex: 6
    },
    avatar_container: {
        justifyContent: 'center',
        marginHorizontal: WINDOW_WIDTH * 0.035
    },
    avatar: {
        width: WINDOW_WIDTH * 0.1,
        height:  WINDOW_WIDTH * 0.1,
        borderRadius: (WINDOW_WIDTH * 0.1) / 2,
        borderColor: '#D6D6D6',
        borderWidth: WINDOW_WIDTH * 0.005,
    },
    point_container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: WINDOW_WIDTH * 0.01,
        paddingHorizontal: WINDOW_WIDTH * 0.02,
        borderRadius: WINDOW_WIDTH * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    point: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        color: '#000000',
    },
    alert: {
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.035,
        fontFamily: 'Roboto-Medium',
        alignSelf: 'center'
    }
})
