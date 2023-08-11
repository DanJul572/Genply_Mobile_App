import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AppState, BackHandler, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Filter, Game} from '../../components/Search';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Search = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [requestStatus, setRequestStatus] = useState({
        filter: false,
        game: false,
        main: false,
    });
    const [keyword, setKeyword] = useState('');
    const [filter, setFilter] = useState({
        key: 'default',
        value: 'all'
    });
    const [ageFilter, setAgeFilter] = useState('');

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
        if (refreshing) {
            setKeyword('');
            setAgeFilter('');
            setFilter({
                key: 'default',
                value: 'all'
            });
            if (route.params) {
                route.params.age = undefined;
                route.params.filter = undefined;
            };
        }
        if (route.params) {
            if (route.params.filter) changeFilter(route.params.filter);
            if (route.params.age) {
                if (((ageFilter) != (route.params.age))) {
                    setAgeFilter(route.params.age);
                }
            }
        };
    }, [route.params, refreshing]);

    const changeRefreshing = status => {
        setRefreshing(status);
    }

    const changeKeyword = keyword => {
        setKeyword(keyword);
    }

    const changeFilter = filter => {
        setFilter(filter);
    }

    const changeLoading = () => {
        if ((requestStatus.filter) || (requestStatus.game) || (requestStatus.main)) {
            setLoading(true);
        } else if ((!requestStatus.filter) && (!requestStatus.game) && (!requestStatus.main)) {
            setLoading(false);
        }
    }

    const changeRequestStatus = (page, status) => {
        let state = requestStatus;
        state[page] = status;
        setRequestStatus(state);
        changeLoading();
    }

    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                    <Filter
                        navigation={navigation}
                        filter={filter}
                        refreshing={refreshing}
                        changeKeyword={changeKeyword}
                        changeFilter={changeFilter}
                        changeRequestStatus={changeRequestStatus}
                    />
                    <Game
                        keyword={keyword}
                        filter={filter}
                        ageFilter={ageFilter}
                        navigation={navigation}
                        changeRefreshing={changeRefreshing}
                        changeRequestStatus={changeRequestStatus}
                    />
            </SafeAreaView>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
