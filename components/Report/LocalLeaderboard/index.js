import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { DetailIcon, LocationIcon, Trophies1Icon, Trophies2Icon, Trophies3Icon } from '../../../assets/Icons/Report';
import { BASE_URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';
import { useTranslation } from 'react-i18next';

const LocalLeaderboard = ({ navigation, firstOpened, refreshing, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [players, setPlayers] = useState([]);
    const [location, setLocation] = useState(false);
    const [locationString, setLocationString] = useState('');

    useEffect(() => {
        if ((firstOpened) || (refreshing)) getMyProfile();
    }, [firstOpened, refreshing]);

    const getMyProfile = async () => {
        changeRequestStatus('local_leaderboard', true);
        setLocation(false);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-one-user/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(response => {
            let profile = response.data;
            let location_status = ((profile.alamat == null) || (profile.alamat == '-')) ? false : true;
            setLocation(location_status);
            if (location_status == true) {
                getPlayer();
                setLocationString(profile.kota);
            };
            changeRequestStatus('local_leaderboard', false);
        })
        .catch(error => {
            changeRequestStatus('local_leaderboard', false);
            Alert.alert('Error', error.message);
        });
    }

    const getPlayer = async () => {
        changeRequestStatus('local_leaderboard', true);
        setPlayers([]);
        let generate_month = new Date().getMonth() + 1;
        let month = (generate_month.toString().length > 1) ? generate_month : '0' + generate_month;
        let year = new Date().getFullYear();
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/localplayerofthemonth/' + month + '/' + year + '/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(response => {
            (response.data.length > 0) ? setPlayers(response.data.slice(0, 3)) : false;
            changeRequestStatus('local_leaderboard', false);
        })
        .catch(error => {
            changeRequestStatus('local_leaderboard', false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.card_container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>{t('top_local_player_text')}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('LocalLeaderboard')}>
                        <Image source={DetailIcon} style={styles.header_icon} />
                    </TouchableOpacity>
                </View>
                {(location == false) && (
                    <Text style={styles.alert}>{t('location_not_set')}</Text>
                )}
                {((players.length == 0) && (location == true)) && (
                    <Text style={styles.alert}>{t('empty_data_alert')}</Text>
                )}
                {(players.length > 0) && (
                    <View>
                        <View style={styles.body}>
                            {(players[1]) && (
                                <View style={styles.player_container}>
                                    <View style={[styles.player_trophy_background, styles.player_trophy_background_2]}>
                                        <Image source={Trophies2Icon} style={styles.player_trophy} />
                                    </View>
                                    <Image source={{ uri: BASE_URL + '/storage/profil/' + players[1].photo }}  style={styles.player_avatar} />
                                    <View style={[styles.player_background, styles.player_background_2]}>
                                        <Text style={styles.player_score}>{players[1].nilai}</Text>
                                        <Text style={styles.player_name}>{players[1].namalengkap.split(' ')[0]}</Text>
                                    </View>
                                </View>
                            )}
                            {(players[0]) && (
                                <View style={styles.player_container}>
                                    <View style={[styles.player_trophy_background, styles.player_trophy_background_1]}>
                                        <Image source={Trophies1Icon} style={styles.player_trophy} />
                                    </View>
                                    <Image source={{ uri: BASE_URL + '/storage/profil/' + players[0].photo }} style={styles.player_avatar} />
                                    <View style={[styles.player_background, styles.player_background_1]}>
                                        <Text style={styles.player_score}>{players[0].nilai}</Text>
                                        <Text style={styles.player_name}>{players[0].namalengkap.split(' ')[0]}</Text>
                                    </View>
                                </View>
                            )}
                            {(players[2]) && (
                                <View style={styles.player_container}>
                                    <View style={[styles.player_trophy_background, styles.player_trophy_background_3]}>
                                        <Image source={Trophies3Icon} style={styles.player_trophy} />
                                    </View>
                                    <Image source={{ uri: BASE_URL + '/storage/profil/' + players[2].photo }}  style={styles.player_avatar} />
                                    <View style={[styles.player_background, styles.player_background_3]}>
                                        <Text style={styles.player_score}>{players[2].nilai}</Text>
                                        <Text style={styles.player_name}>{players[2].namalengkap.split(' ')[0]}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={styles.city_container}>
                            <Image source={LocationIcon} style={styles.city_icon} />
                            <Text style={styles.city_text}>{locationString}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

export default LocalLeaderboard

const styles = StyleSheet.create({
    container: {
        marginVertical: WINDOW_WIDTH * 0.035,
        alignItems: 'center'
    },
    card_container: {
        padding: WINDOW_WIDTH * 0.02,
        borderRadius:  WINDOW_WIDTH * 0.025,
        width: WINDOW_WIDTH * 0.85,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header_text: {
        fontSize: WINDOW_WIDTH * 0.045,
        marginBottom: WINDOW_WIDTH * 0.035,
        fontFamily: 'Oswald-Regular',
        color: '#787878',
    },
    header_icon: {
        width: WINDOW_WIDTH * 0.1,
        height: WINDOW_HEIGHT * 0.03
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        alignSelf: 'center',
        margin: WINDOW_WIDTH * 0.035
    },
    body: {
        marginTop: WINDOW_WIDTH * 0.025,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    body_container: {
        marginBottom: WINDOW_WIDTH * 0.025
    },
    player_container: {
        width: WINDOW_WIDTH * 0.2,
        alignItems: 'center',
        paddingHorizontal: WINDOW_WIDTH * 0.03,
    },
    player_trophy_background: {
        width: WINDOW_WIDTH * 0.06,
        height: WINDOW_WIDTH * 0.06,
        borderRadius: (WINDOW_WIDTH * 0.06) / 2,
        marginBottom: WINDOW_WIDTH * 0.035,
        marginLeft: WINDOW_WIDTH * 0.14,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3
    },
    player_trophy_background_1: {
        backgroundColor: '#FFD83B'
    },
    player_trophy_background_2: {
        backgroundColor: '#64FF64'
    },
    player_trophy_background_3: {
        backgroundColor: '#00DCFF'
    },
    player_trophy: {
        width: WINDOW_WIDTH * 0.055,
        height: WINDOW_WIDTH * 0.055
    },
    player_background: {
        width: WINDOW_WIDTH * 0.2,
        borderRadius:  WINDOW_WIDTH * 0.025,
        alignItems: 'center',
        paddingHorizontal: WINDOW_WIDTH * 0.02,
        paddingTop: WINDOW_WIDTH * 0.13,
    },
    player_background_1: {
        backgroundColor: '#FFD83B'
    },
    player_background_2: {
        backgroundColor: '#64FF64'
    },
    player_background_3: {
        backgroundColor: '#00DCFF'
    },
    player_avatar: {
        width: WINDOW_WIDTH * 0.17,
        height: WINDOW_WIDTH * 0.17,
        top: WINDOW_WIDTH * 0.025,
        position: 'absolute',
        overflow: 'hidden',
        borderRadius:  WINDOW_WIDTH * 0.03,
        marginBottom: WINDOW_WIDTH * 0.05,
        zIndex: 2
    },
    player_score: {
        fontFamily: 'Roboto-Medium',
        fontSize:  WINDOW_WIDTH * 0.045,
    },
    player_name: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    },
    city_container: {
        marginTop: WINDOW_WIDTH * 0.035,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    city_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        resizeMode: 'contain',
        marginRight: WINDOW_WIDTH * 0.015,
    },
    city_text: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
    }
})
