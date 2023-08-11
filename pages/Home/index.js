import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, AppState, BackHandler, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Notification, Popular, Category, Recomended, Information, Leaderboard, HighestRatedGame, LocalLeaderboard, LastLeaderboard, LastLocalLeaderboard } from '../../components/Home';
import Logo from '../../components/Home/Logo';
import { COLOR_PRIMARY, WINDOW_WIDTH } from '../../utils/constant';
import { useTranslation } from 'react-i18next';
import { setOnlineUser, removeOnlineUser } from '../../utils/firebase';

const Home = ({ navigation }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [requestStatus, setRequestStatus] = useState({
        popular: false,
        category: false,
        recomended: false,
        information: false,
        leaderboard: false,
        highest_rated_game: false,
        local_leaderboard: false,
        last_leaderboard: false,
        last_local_leaderboard: false,
    });

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                Alert.alert(t('confirmation_title_popup'), t('exit_app_description_popup'), [
                    {
                        text: t('cancel_button_popup').toUpperCase(),
                        onPress: () => null,
                        style: 'cancel'
                    },
                    { text: t('confirm_button_popup').toUpperCase(), onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };

            const stateAction = (state) => {
                if (state == 'active') {
                    setOnlineUser();
                } else if (state == 'background') {
                    removeOnlineUser();
                }
            }

            const handler = BackHandler.addEventListener('hardwareBackPress', backAction);
            const currentState = AppState.addEventListener('change', stateAction);

            return () => {
                handler.remove();
                currentState.remove();
            };
        }, [])
    );

    useEffect(() => {
        checkUserData().then(value => {
            if (!value) {
                navigation.navigate('Login');
            } else {
                setOnlineUser();
                setFirstOpened(true);
            }
        });
    }, []);

    const changeLoading = () => {
        if ((requestStatus.popular) || (requestStatus.category) || (requestStatus.recomended) || (requestStatus.information) || (requestStatus.leaderboard) || (requestStatus.highest_rated_game) || (requestStatus.local_leaderboard) || (requestStatus.last_leaderboard) || (requestStatus.last_local_leaderboard)) {
            setLoading(true);
        } else if ((!requestStatus.popular) && (!requestStatus.category) && (!requestStatus.recomended) && (!requestStatus.information) && (!requestStatus.leaderboard) && (!requestStatus.highest_rated_game) && (!requestStatus.local_leaderboard) && (!requestStatus.last_leaderboard) && (!requestStatus.last_local_leaderboard)) {
            setLoading(false);
        }
    }

    const changeRequestStatus = (page, status) => {
        let state = requestStatus;
        state[page] = status;
        setRequestStatus(state);
        changeLoading();
    }

    const checkUserData = async () => {
        try {
            let user_id = await AsyncStorage.getItem('user_id');
            let user_token = await AsyncStorage.getItem('user_token');
            if ((user_id != null) && (user_token != null)) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            Alert.alert('Error', error.toString());
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
        <View>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <Spinner visible={loading} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.mid}
                    refreshControl={
                        <RefreshControl
                            colors={[COLOR_PRIMARY]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => navigation.navigate('Menu')} activeOpacity={1}>
                            <Logo />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Notification')} activeOpacity={1}>
                            <Notification />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section_container}>
                        <Popular
                            navigation={navigation}
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <Category
                            navigation={navigation}
                        />
                        <Recomended
                            navigation={navigation}
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <Information
                            navigation={navigation}
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <Leaderboard
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <LastLeaderboard
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <HighestRatedGame
                            navigation={navigation}
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <LocalLeaderboard
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <LastLocalLeaderboard
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.025,
        marginHorizontal: WINDOW_WIDTH * 0.025
    },
    section_container: {
        paddingHorizontal: WINDOW_WIDTH * 0.015
    },
    mid: {
        marginTop: WINDOW_WIDTH * 0.025
    },
})
