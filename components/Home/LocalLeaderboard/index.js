import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant';
import { Card } from 'react-native-shadow-cards';
import { LocalLeaderboardBackgroundImage } from '../../../assets/Images/Home';
import { useTranslation } from 'react-i18next';

const LocalLeaderboard = ({ firstOpened, refreshing, changeRequestStatus }) => {
    const { t } = useTranslation();
    
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if ((firstOpened) || (refreshing)) {
            getPlayers();
        }
    }, [firstOpened, refreshing]);

    const getPlayers = async () => {
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
            setPlayers(response.data.slice(0, 3));
            changeRequestStatus('local_leaderboard', false);
        })
        .catch(error => {
            changeRequestStatus('local_leaderboard', false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={ LocalLeaderboardBackgroundImage } style={styles.background}>
                <Text style={styles.text}>{t('top_local_player_text')}</Text>
                <View style={styles.player}>
                    {players.map(item => (
                        <View key={item.idprofil} style={styles.profile_container}>
                            <Card style={styles.card}>
                                <Image source={{ uri: BASE_URL + '/storage/profil/' + item.photo }} style={styles.avatar}/>
                            </Card>
                            <Text style={styles.name}>{item.namalengkap}</Text>
                        </View>
                    ))}
                    {players.length == 0 && (
                        <Text style={styles.alert}>{t('empty_data_alert')}</Text>
                    )}
                </View>
           </ImageBackground>
        </View>
    )
}

export default LocalLeaderboard

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: WINDOW_WIDTH * 0.025,
    },
    background: {
        flex: 1,
        padding: 10,
    },
    text: {
        color: '#575757',
        fontFamily: 'Oswald-Regular',
        fontSize: WINDOW_WIDTH * 0.035
    },
    player: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile_container: {
        alignItems: 'center'
    },
    name: {
        color: '#575757',
        fontFamily: 'Poppins-Regular',
        fontSize: WINDOW_WIDTH * 0.03,
        marginTop: WINDOW_WIDTH * 0.015
    },
    alert: {
        color: '#575757',
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginVertical: WINDOW_WIDTH * 0.05
    },
    card: {
        borderRadius: 10,
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        overflow: 'hidden',
        borderRadius: 10,
        padding: 5,
        marginHorizontal: WINDOW_WIDTH * 0.025
    },
    avatar: {
        flex: 1,
        borderRadius: 5,
    }
})
