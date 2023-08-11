import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, AppState, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MyRating, OtherPlayer, TopBar, TopPlayer } from '../../components/Leaderboard';
import { BASE_URL } from '../../utils/constant';
import { useFocusEffect } from '@react-navigation/native';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Leaderboard = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [topPlayer, setTopPlayer] = useState([]);
    const [otherPlayer, setOtherPlayer] = useState([]);
    const [myRating, setMyRating] = useState({});

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
        let url = BASE_URL + '/api/playerofthemonth/' + month + '/' + year;
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
                <TopPlayer
                    firstOpened={firstOpened}
                    refreshing={refreshing}
                    topPlayer={topPlayer}
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

export default Leaderboard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'space-around'
    },
});
