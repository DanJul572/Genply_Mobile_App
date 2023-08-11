import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, Alert, RefreshControl } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { BASE_URL, COLOR_PRIMARY, DEVICE, WINDOW_WIDTH } from '../../../utils/constant';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const Game = ({ filter, keyword, ageFilter, navigation, changeRefreshing, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [games, setGames] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect( () => {
        callListsMethod();
    }, [filter.value, keyword, ageFilter, refreshing]);

    const callListsMethod = async () => {
        let user_id = await AsyncStorage.getItem('user_id');
        if (filter.key == 'default') {
            if (filter.value == 'all') {
                lists(BASE_URL + '/api/game/lists/' + DEVICE + '?keyword=' + keyword + '&age=' + ageFilter);
            } else if (filter.value == 'installed') {
                lists(BASE_URL + '/api/tampilkan_mygame_all/' + user_id + '/' + DEVICE + '?keyword=' + keyword + '&age=' + ageFilter);
            } else {
                lists(BASE_URL + '/api/datagameupdate/' + user_id + '/' + DEVICE + '?keyword=' + keyword + '&age=' + ageFilter);
            }
        } else {
            let genre = filter.value;
            lists(BASE_URL + '/api/search/genre/' + genre + '/' + DEVICE + '?keyword=' + keyword + '&age=' + ageFilter);
        }
    }

    const lists = async (url) => {
        changeRequestStatus('game', true);
        setGames([]);
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token'),
        }
        axios.get(url, { headers })
        .then(response => {
            setGames(response.data);
            changeRequestStatus('game', false);
        })
        .catch(error => {
            changeRequestStatus('game', false);
            Alert.alert('Error', error.message);
        });
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        changeRefreshing(true);
        wait(0).then(() => {
            setRefreshing(false);
            changeRefreshing(false);
        });
    }, []);

    return (
        <View style={styles.game_container}>
            {games.length > 0 && (
                <FlatList
                    data={games}
                    renderItem={({ item }) =>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Game', { idgame: item.idgame })}>
                            <View style={styles.individu_container}>
                                <Image source={{ uri: BASE_URL + '/storage/game/' + item.logo }} style={styles.game_avatar} />
                                <Text style={styles.game_name}>{item.namagame}</Text>
                                <Text style={styles.game_size}>{item.size + ' MB'}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.idgame}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={[COLOR_PRIMARY]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
            {games.length == 0 && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            colors={[COLOR_PRIMARY]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text style={styles.alert}>{t('empty_data_alert')}</Text>
                </ScrollView>
            )}
        </View>
    )
}

export default Game

const styles = StyleSheet.create({
    game_container: {
        padding: WINDOW_WIDTH * 0.025,
        flex: 1
    },
    individu_container: {
        borderRadius: WINDOW_WIDTH * 0.015,
        backgroundColor: '#FFFFFF',
        width: WINDOW_WIDTH * 0.28,
        padding: WINDOW_WIDTH * 0.015,
        marginBottom: WINDOW_WIDTH * 0.035,
        marginHorizontal: WINDOW_WIDTH * 0.018,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    game_avatar: {
        borderRadius: WINDOW_WIDTH * 0.025,
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    game_name: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.035,
        marginVertical: WINDOW_WIDTH * 0.01
    },
    game_size: {
        color: '#B1B1B1',
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.025
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        alignSelf: 'center',
        justifyContent: 'center'
    }
})
