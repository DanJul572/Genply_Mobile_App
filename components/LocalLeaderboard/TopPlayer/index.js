import React from 'react'
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { LocationIcon, TopOneIcon, TopThreeIcon, TopTwoIcon } from '../../../assets/Icons/LocalLeaderboard';
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant';

const TopPlayer = ({ topPlayer, location }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {(topPlayer.length > 0) && (
                <View>
                    <View style={styles.avatar_container}>
                        {(topPlayer[1] != null) && (
                            <View>
                                <Image style={styles.trophy} source={TopTwoIcon} />
                                <Image style={styles.avatar_two} source={{ uri: BASE_URL + '/storage/profil/' + topPlayer[1].photo }} />
                            </View>
                        )}
                        {(topPlayer[0] != null) && (
                            <View style={styles.trophy_one_container}>
                                <Image style={styles.trophy_one} source={TopOneIcon} />
                                <Image style={styles.avatar_one} source={{ uri: BASE_URL + '/storage/profil/' + topPlayer[0].photo }} />
                            </View>
                        )}
                        {(topPlayer[2] != null) && (
                            <View>
                                <Image style={styles.trophy} source={TopThreeIcon} />
                                <Image style={styles.avatar_three} source={{ uri: BASE_URL + '/storage/profil/' + topPlayer[2].photo }} />
                            </View>
                        )}
                    </View>
                    <View style={styles.point_container}>
                        {(topPlayer[1] != null) && (
                            <View>
                                <LinearGradient colors={['#81F294', '#57E16E']} style={[styles.point, styles.point_two]}>
                                    <Text style={styles.name_text}>{topPlayer[1].namalengkap.split(' ')[0]}</Text>
                                    <Text style={styles.point_text}>{topPlayer[1].nilai}</Text>
                                </LinearGradient>
                            </View>
                        )}
                        {(topPlayer[0] != null) && (
                            <View style={styles.point_one_container}>
                                <LinearGradient colors={['#FFDE2C', '#FFD700']} style={[styles.point, styles.point_one]}>
                                    <Text style={styles.name_text}>{topPlayer[0].namalengkap.split(' ')[0]}</Text>
                                    <Text style={styles.point_text}>{topPlayer[0].nilai}</Text>
                                </LinearGradient>
                            </View>
                        )}
                        {(topPlayer[2] != null) && (
                            <View>
                                <LinearGradient colors={['#46D3FF', '#46D3FF']} style={[styles.point, styles.point_three]}>
                                    <Text style={styles.name_text}>{topPlayer[2].namalengkap.split(' ')[0]}</Text>
                                    <Text style={styles.point_text}>{topPlayer[2].nilai}</Text>
                                </LinearGradient>
                            </View>
                        )}
                    </View>
                    <View style={styles.city_container}>
                        <Image style={styles.city_icon} source={LocationIcon} />
                        <Text style={styles.city}>{location}</Text>
                    </View>
                </View>
            )}
            {(topPlayer.length <= 0) && (
                <Text style={styles.alert}>
                    {t('empty_data_alert')}
                </Text>
            )}
        </View>
    )
}

export default TopPlayer

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#35BEE9',
        borderBottomLeftRadius: WINDOW_WIDTH * 0.05,
        borderBottomRightRadius: WINDOW_WIDTH * 0.05,
        marginBottom: WINDOW_WIDTH * 0.014,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,
        elevation: 3,
    },
    city_container: {
        marginBottom: WINDOW_WIDTH * 0.03,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    city_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        resizeMode: 'contain',
        marginRight: WINDOW_WIDTH * 0.015
    },
    city: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.04
    },
    avatar_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: WINDOW_WIDTH * 0.055
    },
    trophy_one_container: {
        marginHorizontal: WINDOW_WIDTH * 0.035
    },
    avatar_one: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        borderRadius: (WINDOW_WIDTH * 0.25) / 2,
        borderWidth: WINDOW_WIDTH * 0.01,
        borderColor: '#FFD700'
    },
    avatar_two: {
        width: WINDOW_WIDTH * 0.2,
        height: WINDOW_WIDTH * 0.2,
        borderRadius: (WINDOW_WIDTH * 0.2) / 2,
        borderWidth: WINDOW_WIDTH * 0.01,
        borderColor: '#57E16E'
    },
    avatar_three: {
        width: WINDOW_WIDTH * 0.2,
        height: WINDOW_WIDTH * 0.2,
        borderRadius: (WINDOW_WIDTH * 0.2) / 2,
        borderWidth: WINDOW_WIDTH * 0.01,
        borderColor: '#46D3FF'
    },
    trophy: {
        position: 'absolute',
        right: 0,
        width: WINDOW_WIDTH * 0.055,
        height: WINDOW_WIDTH * 0.055,
        zIndex: 1
    },
    trophy_one: {
        position: 'absolute',
        right: 0,
        width: WINDOW_WIDTH * 0.065,
        height: WINDOW_WIDTH * 0.065,
        zIndex: 1
    },
    point_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: WINDOW_WIDTH * 0.1,
        paddingBottom: WINDOW_WIDTH * 0.05,
    },
    point_one_container: {
        marginHorizontal: WINDOW_WIDTH * 0.035,
    },
    point: {
        borderRadius: WINDOW_WIDTH * 0.015,
        justifyContent: 'center',
        alignItems: 'center',
        padding: WINDOW_WIDTH * 0.01
    },
    point_one: {
        width: WINDOW_WIDTH * 0.25,
        marginTop: WINDOW_WIDTH * 0.01
    },
    point_two: {
        width: WINDOW_WIDTH * 0.2,
        marginTop: WINDOW_WIDTH * 0.03
    },
    point_three: {
        width: WINDOW_WIDTH * 0.2,
        marginTop: WINDOW_WIDTH * 0.05
    },
    name_text: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.05
    },
    point_text: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        fontSize: WINDOW_WIDTH * 0.045,
    },
    alert: {
        marginVertical: WINDOW_WIDTH * 0.25,
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.035,
        fontFamily: 'Roboto-Medium'
    }
})
