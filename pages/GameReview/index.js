import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AppState, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { TopBar } from '../../components/GameReview';
import { BASE_URL, COLOR_MAIN_BACKGROUND, COLOR_PRIMARY, WINDOW_WIDTH } from '../../utils/constant';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const GameReview = ({ route, navigation }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [ratings, setRatings] = useState([]);
    const [star, setStar] = useState(0);
    const [count, setCount] = useState(0);

    useFocusEffect(
        useCallback(() => {
            const stateAction = (state) => {
                if (state == 'active') {
                    setOnlineUser();
                } else if (state == 'background') {
                    removeOnlineUser();
                }
            }
            const currentState = AppState.addEventListener('change', stateAction);
            return () => {
                currentState.remove();
            }
        }, [])
    );

    useEffect(() => {
        setFirstOpened(true);
        if ((firstOpened) || (refreshing)) getRatings();
    }, [firstOpened, refreshing]);

    const getRatings = async () => {
        setLoading(true);
        setRatings([]);
        setStar(0);
        setCount(0);
        let url = BASE_URL + '/api/rating/all/' + route.params.game_id;
        let user_token = await AsyncStorage.getItem('user_token');
        let headers = {
            Authorization: user_token
        }
        axios.get(url, { headers })
        .then(response => {
            setRatings(response.data.komentar);
            setStar(response.data.bintang);
            setCount(response.data.jumlah)
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setFirstOpened(false);
        setRefreshing(true);
        wait(0).then(() => {
            setRefreshing(false);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                {(ratings.length > 0) && (
                    <FlatList
                        data={ratings}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                colors={[COLOR_PRIMARY]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        renderItem={({ item }) =>
                            <View key={item.id} style={styles.rating_container}>
                                <View style={styles.rating_profile_container}>
                                    <Image source={{ uri: BASE_URL + '/storage/profil/' + item.profile.photo }} style={styles.rating_avatar} />
                                    <Text style={styles.rating_username}>{item.profile.namalengkap}</Text>
                                </View>
                                <View style={styles.rating_profile_star_container}>
                                    <AirbnbRating
                                        showRating={false}
                                        size={WINDOW_WIDTH * 0.025}
                                        selectedColor={'#FFCC00'}
                                        isDisabled={true}
                                        defaultRating={item.bintang}
                                    />
                                    <Text style={styles.rating_creatred_at}>{new Date(Date.parse(item.created_at)).toLocaleDateString('pt-PT')}</Text>
                                </View>
                                {(item.komentar != null) && (
                                    <View style={styles.rating_comments_container}>
                                        <Text style={styles.rating_comments}>{item.komentar}</Text>
                                    </View>
                                )}
                            </View>
                        }
                        ListHeaderComponent={
                            <View style={styles.headers_container}>
                                <Text style={styles.headers_title}>{star.toFixed(1) + ' ' + t('out_of_text') + ' ' + count + ' ' + t('reviews_text')}</Text>
                                <Rating
                                    readonly={true}
                                    startingValue={star.toFixed(1)}
                                    type={'custom'}
                                    imageSize={WINDOW_WIDTH * 0.075}
                                    tintColor={COLOR_MAIN_BACKGROUND}
                                    ratingColor={'#FFCC00'}
                                    ratingBackgroundColor={'#C0C0C0'}
                                />
                            </View>
                        }
                    />
                )}
                {(ratings.length <= 0) && (
                    <ScrollView
                        scrollEnabled={false}
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
                        <View style={styles.alert_container}>
                            <Text style={styles.alert}>{t('empty_data_alert')}</Text>
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    )
}

export default GameReview

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rating_container: {
        marginBottom: WINDOW_WIDTH * 0.05,
        marginHorizontal: WINDOW_WIDTH * 0.05,
        borderBottomWidth: WINDOW_WIDTH * 0.001,
        borderBottomColor: '#C0C0C0'
    },
    rating_profile_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.005
    },
    rating_avatar: {
        width: WINDOW_WIDTH * 0.1,
        height: WINDOW_WIDTH * 0.1,
        borderRadius: (WINDOW_WIDTH * 0.1) / 2,
        marginRight: WINDOW_WIDTH * 0.025,
        overflow: 'hidden',
        borderWidth: WINDOW_WIDTH * 0.005,
        borderColor: '#C0C0C0'
    },
    rating_username: {
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.035
    },
    rating_profile_star_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.005
    },
    rating_creatred_at: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.025
    },
    rating_comments_container: {
        marginBottom: WINDOW_WIDTH * 0.01
    },
    rating_comments: {
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    },
    alert_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
    },
    headers_container: {
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.065,
    },
    headers_title: {
        textTransform: 'lowercase',
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.025
    }
})
