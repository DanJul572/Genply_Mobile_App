import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, AppState, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MyRating, OtherPlayer, TopBar, TopPlayer } from '../../components/LocalLeaderboard';
import { BASE_URL } from '../../utils/constant';
import { useFocusEffect } from '@react-navigation/native';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const LocalLeaderboard = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [topPlayer, setTopPlayer] = useState([]);
    const [otherPlayer, setOtherPlayer] = useState([]);
    const [myRating, setMyRating] = useState({});
    const [location, setLocation] = useState('');

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
        if ((firstOpened) || (refreshing)) getPlayer();
    }, [firstOpened, refreshing]);

    const changeMyRating = (player, id) => {
        return player.find((x, index) => {
            x.number = index + 1;
            return x.idprofil == id;
        });
    }

    const getPlayer = async () => {
        setLoading(true);
        setTopPlayer([]);
        setOtherPlayer([]);
        setMyRating({});
        let generate_month = new Date().getMonth() + 1;
        let month = (generate_month.toString().length > 1) ? generate_month : '0' + generate_month;
        let year = new Date().getFullYear();
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/localplayerofthemonth/' + month + '/' + year + '/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(async response => {
            let top_player = response.data.slice(0, 3);
            let other_player = response.data.slice(3, 25);
            let my_rating = changeMyRating(response.data, await AsyncStorage.getItem('user_id'));
            if (top_player.length <= 3) {
                setTopPlayer(top_player);
            }
            if (other_player.length > 0) {
                setOtherPlayer(other_player);
            }
            if (my_rating != null) {
                setMyRating(my_rating);
            }
            getMyProfile(response.data.length);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    const getMyProfile = async (length) => {
        if (length > 1) {
            let user_id = await AsyncStorage.getItem('user_id');
            let url = BASE_URL + '/api/get-one-user/' + user_id;
            let headers = {
                'Authorization': await AsyncStorage.getItem('user_token')
            }
            axios.get(url, { headers })
            .then(response => {
                setLocation(response.data.kota);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                Alert.alert('Error', error.message);
            });
        } else {
            setLoading(false);
        }
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
                <TopPlayer
                    firstOpened={firstOpened}
                    refreshing={refreshing}
                    topPlayer={topPlayer}
                    location={location}
                />
                <OtherPlayer
                    otherPlayer={otherPlayer}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                <MyRating
                    player={myRating}
                />
            </SafeAreaView>
        </View>
    )
}

export default LocalLeaderboard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'space-around'
    },
});
