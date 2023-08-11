import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, AppState, Linking, Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Control, Description, Other, Preview, Ratings, TopBar, Usage } from '../../components/Game'
import { BASE_URL, COLOR_PRIMARY, DEVICE } from '../../utils/constant';
import { useFocusEffect } from '@react-navigation/native';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Game = ({ route, navigation }) => {
    const [id, setId] = useState(route.params.idgame);
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [ratings, setRatings] = useState(0);
    const [requestStatus, setRequestStatus] = useState({
        parent: false,
        control: false,
        ratings: false,
        other: false
    });
    const [game, setGame] = useState({
        iadgame: '',
        logo: '',
        namagame: '',
        size: '',
        download: '',
        deskripsi: '',
        deskripsipanjang: '',
        versi: '',
        companyname: '',
        app_store: '',
        play_store: '',
        screenshot: [],
        video: [],
        installed: false
    });

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
        if ((firstOpened) || (refreshing)) getGame();
    }, [id, firstOpened, refreshing]);

    const changeId = id => {
        setFirstOpened(true);
        setId(id);
    }

    const changeLoading = () => {
        if ((requestStatus.parent) || (requestStatus.other) || (requestStatus.ratings) || (requestStatus.control)) {
            setLoading(true);
        } else if ((!requestStatus.parent) && (!requestStatus.other) && (!requestStatus.ratings) && (!requestStatus.control)) {
            setLoading(false);
        }
    }

    const changeRequestStatus = (page, status) => {
        let state = requestStatus;
        state[page] = status;
        setRequestStatus(state);
        changeLoading();
    }

    const changeRatings = (star) => {
        (star) ? setRatings(star) : setRatings(0);
    }

    const getGame = async () => {
        changeRequestStatus('parent', true);
        setGame({});
        let url = BASE_URL + '/api/get-one-game/' + id + '/' + DEVICE;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
            .then(async (response) => {
                let url = '';
                if (Platform.OS == 'ios') {
                    let string = response.data.companyname;
                    url = string + '://' + string;
                } else {
                    let string = response.data.namagame.replace(/\s/g, '').toLowerCase();
                    url = 'igenply' + '://' + string;
                }
                Linking.canOpenURL(url)
                .then(supported => {
                    let status = (supported) ? true : false;
                    response.data.installed = status;
                    saveGame(status);
                })
                .catch(() => {
                    response.data.installed = false;
                });
                setGame(response.data);
            })
            .catch(error => {
                changeRequestStatus('parent', false);
                Alert.alert('Error', error.message);
            });
    }

    const saveGame = async (installed) => {
        if (installed == false) {
            let url = BASE_URL + '/api/delete-data-download/' + DEVICE
            let user_token = await AsyncStorage.getItem('user_token');
            let user_id = await AsyncStorage.getItem('user_id');
            let headers = {
                'Authorization': user_token
            }
            let body = {
                idprofil: user_id,
                idgame: id
            }
            axios.post(url, body, { headers })
                .then(() => {
                    changeRequestStatus('parent', false);
                })
                .catch(error => {
                    changeRequestStatus('parent', false);
                    Alert.alert('Error', error.message);
                });
        } else {
            changeRequestStatus('parent', false);
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
            <SafeAreaView style={styles.container}>
                <Spinner visible={loading} />
                <StatusBar barStyle='dark-content' />
                <TopBar
                    namagame={game.namagame}
                    play_store={game.play_store}
                    app_store={game.app_store}
                    navigation={navigation}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={[COLOR_PRIMARY]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Control
                        id={id}
                        logo={game.logo}
                        namagame={game.namagame}
                        companyname={game.companyname}
                        app_store={game.app_store}
                        play_store={game.play_store}
                        installed={game.installed}
                    />
                    <Usage
                        size={game.size}
                        ratings={ratings}
                        download={game.download}
                    />
                    <Preview
                        screenshots={game.screenshot}
                        videos={game.video}
                    />
                    <Description
                        navigation={navigation}
                        description={game.deskripsi}
                        detailedDescription={game.deskripsipanjang}
                        version={game.versi}
                        size={game.size}
                    />
                    <Ratings
                        id={id}
                        firstOpened={firstOpened}
                        refreshing={refreshing}
                        changeRatings={changeRatings}
                        changeRequestStatus={changeRequestStatus}
                        navigation={navigation}
                    />
                    <Other
                        id={id}
                        changeId={changeId}
                        firstOpened={firstOpened}
                        refreshing={refreshing}
                        changeRequestStatus={changeRequestStatus}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Game

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})