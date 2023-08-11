import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { AppState, BackHandler, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { BarProgress, Leaderboard, LocalLeaderboard, Username } from '../../components/Report'
import { BackgroundImage } from '../../assets/Images/Report'
import Spinner from 'react-native-loading-spinner-overlay'
import { COLOR_PRIMARY, WINDOW_WIDTH } from '../../utils/constant'
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Report = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [requestStatus, setRequestStatus] = useState({
        username: false,
        bar_progress: false,
        leaderboard: false,
        local_leaderboard: false
    });

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                navigation.navigate('Home');
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
        setFirstOpened(true);
    }, []);

    const changeLoading = () => {
        if ((requestStatus.leaderboard) || (requestStatus.bar_progress) || (requestStatus.username) || (requestStatus.local_leaderboard)) {
            setLoading(true);
        } else if ((!requestStatus.leaderboard) && (!requestStatus.bar_progress) && (!requestStatus.username) && (!requestStatus.local_leaderboard)) {
            setLoading(false);
        }
    }

    const changeRequestStatus = (page, status) => {
        let state = requestStatus;
        state[page] = status;
        setRequestStatus(state);
        changeLoading();
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
                <ImageBackground source={BackgroundImage} style={styles.background}>
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
                        <Username
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <BarProgress
                            navigation={navigation}
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <Leaderboard
                            navigation={navigation}
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                        <LocalLeaderboard
                            navigation={navigation}
                            firstOpened={firstOpened}
                            refreshing={refreshing}
                            changeRequestStatus={changeRequestStatus}
                        />
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </View>
    )
}

export default Report

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        paddingTop: WINDOW_WIDTH * 0.1
    }
})
