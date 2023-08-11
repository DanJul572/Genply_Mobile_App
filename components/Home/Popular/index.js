import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { BASE_URL, DEVICE, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';
import {  StarIcon } from '../../../assets/Icons/Home';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const Popular = ({ firstOpened, refreshing, navigation, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [games, setGames] = useState({
        idgame: '',
        logo: '',
        namagame: ''
    });

    useEffect(() => {
        if ((firstOpened) || (refreshing)) {
            getGames();
        }
    }, [firstOpened, refreshing]);

    const getGames = async () => {
        changeRequestStatus('popular', true);
        setGames([]);
        let url = BASE_URL + '/api/datagamepopular?device=' + DEVICE;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(response => {
            setGames(response.data.slice(0, 5));
            changeRequestStatus('popular', false);
        })
        .catch(error => {
            changeRequestStatus('popular', false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View>
            <Text style={styles.title}>{t('popular_text')}</Text>
            {(games.length > 0) && (
                <FlatList
                    data={games}
                    renderItem={({ item }) => 
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Game', {idgame: item.idgame})}>
                            <View style={styles.popular_card}>
                                <Image source={{uri: BASE_URL + '/storage/game/' + item.logo}} style={styles.avatar}/>
                                <View>
                                    <Text style={styles.name}>{item.namagame}</Text>
                                    <View style={styles.rating}>
                                        <Image source={StarIcon} style={styles.rating_icon}/>
                                        {(item.rating_avg_bintang != null) && (
                                            <Text style={styles.name} style={styles.rating_text}>{parseFloat(item.rating_avg_bintang).toFixed(1)}</Text>
                                        )}
                                        {(item.rating_avg_bintang == null) && (
                                            <Text style={styles.name} style={styles.rating_text}>0</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.idgame}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            )}
            {(games.length <= 0) && (
                <Text style={styles.alert}>{t('empty_data_alert')}</Text>
            )}
        </View>
    )
}

export default Popular

const styles = StyleSheet.create({
    title: {
        color: '#788389',
        fontFamily: 'Oswald-Regular',
        fontSize: WINDOW_WIDTH * 0.05,
        marginBottom: WINDOW_WIDTH * 0.015
    },
    popular_card: {
        padding: WINDOW_WIDTH * 0.01,
        margin: WINDOW_WIDTH * 0.015,
        marginBottom: WINDOW_WIDTH * 0.025,
        height: WINDOW_HEIGHT * 0.12,
        width: WINDOW_WIDTH * 0.6,
        borderRadius: WINDOW_WIDTH * 0.015,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    avatar: {
        height: '100%',
        width: '30%',
        borderRadius: WINDOW_WIDTH * 0.015,
        marginRight: WINDOW_WIDTH * 0.025,
    },
    name: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03
    },
    rating: {
        alignItems: 'center',
        marginTop: WINDOW_WIDTH * 0.015,
        flexDirection: 'row'
    },
    rating_icon: {
        height: WINDOW_WIDTH * 0.03,
        width: WINDOW_WIDTH * 0.03,
        marginRight: WINDOW_WIDTH * 0.015,
    },
    rating_text: {
        color: '#9F9F9F',
        fontFamily: 'Roboto-Light',
        fontSize: WINDOW_WIDTH * 0.03
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        alignSelf: 'center',
        justifyContent: 'center'
    }
})
