import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Image, StyleSheet, Text, View, Alert } from 'react-native'
import { BASE_URL, DEVICE, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'
import { StarIcon } from '../../../assets/Icons/Home'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const HighestRatedGame = ({ firstOpened, refreshing, navigation, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [games, setGames] = useState({
        idgame: '',
        screenshot: [],
        namagame: '',
        size: '',
        genre: ''
    });

    useEffect(() => {
        if ((firstOpened) || (refreshing)) {
            getGames();
        }
    }, [firstOpened, refreshing]);

    const getGames = async () => {
        changeRequestStatus('highest_rated_game', true);
        setGames([]);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/highest-rated-game/' + user_id + '/' + DEVICE;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
            .then(response => {
                setGames(response.data);
                changeRequestStatus('highest_rated_game', false);
            })
            .catch(error => {
                changeRequestStatus('highest_rated_game', false);
                Alert.alert('Error', error.message);
            });
    }

    return (
        <View>
            <Text style={styles.title}>{t('highest_rating_text')}</Text>
            {(games.length > 0) && (
                <FlatList
                    data={games}
                    renderItem={({ item }) =>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Game', { idgame: item.idgame })}>
                            <View style={styles.card}>
                                <Image source={{ uri: BASE_URL + '/storage/promo/' + item.screenshot[0] }} style={styles.image} />
                                <View style={styles.information}>
                                    <Text style={styles.game_name}>{item.namagame}</Text>
                                    <View style={styles.rating}>
                                        <Image source={StarIcon} style={styles.rating_icon} />
                                        {(item.rating_avg_bintang != null) && (
                                            <Text style={styles.rating_text}>{parseFloat(item.rating_avg_bintang).toFixed(1)}</Text>
                                        )}
                                        {(item.rating_avg_bintang == null) && (
                                            <Text style={styles.rating_text}>0</Text>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.information2}>
                                    <View style={styles.category_card}>
                                        <Text style={styles.category_text}>{item.genre}</Text>
                                    </View>
                                    <Text style={styles.game_size}>{item.size} MB</Text>
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

export default HighestRatedGame

const styles = StyleSheet.create({
    title: {
        color: '#788389',
        fontFamily: 'Oswald-Regular',
        fontSize: WINDOW_WIDTH * 0.05,
        marginBottom: WINDOW_WIDTH * 0.015,
        textTransform: 'capitalize'
    },
    card: {
        padding: WINDOW_WIDTH * 0.01,
        margin: WINDOW_WIDTH * 0.015,
        marginBottom: WINDOW_WIDTH * 0.025,
        width: WINDOW_WIDTH * 0.7,
        height: WINDOW_HEIGHT * 0.2,
        borderRadius: WINDOW_WIDTH * 0.025,
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: WINDOW_WIDTH * 0.25,
        resizeMode: 'stretch',
        borderRadius: WINDOW_WIDTH * 0.015,
    },
    information: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    game_name: {
        color: '#788389',
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    },
    rating: {
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    rating_icon: {
        height: WINDOW_WIDTH * 0.03,
        width: WINDOW_WIDTH * 0.03,
        marginRight: WINDOW_WIDTH * 0.01
    },
    rating_text: {
        color: '#788389',
        fontFamily: 'Roboto-Light',
        fontSize: WINDOW_WIDTH * 0.03
    },
    information2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    category_card: {
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        width: '50%',
        padding: WINDOW_WIDTH * 0.01,
        alignItems: 'center',
        justifyContent: 'center'
    },
    category_text: {
        color: '#7E7E7E',
        fontSize: WINDOW_WIDTH * 0.025
    },
    game_size: {
        color: '#788389',
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
