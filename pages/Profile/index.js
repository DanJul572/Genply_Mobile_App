import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, AppState, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Biodata, Link } from '../../components/Profile';
import { BASE_URL } from '../../utils/constant';
import { useFocusEffect } from '@react-navigation/native';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Profile = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState({
        email: '',
        namalengkap: '',
        kelas: '',
        tingkat: '',
        photo: '',
        kota: '',
        provinsi: '',
        country: ''
    });
    const [quotes, setQuotes] = useState('');

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
        if ((firstOpened) || (refreshing)) getUser();
    }, [firstOpened, refreshing]);

    const getUser = async () => {
        setLoading(true);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-one-user/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token'),
        }
        axios.get(url, { headers })
            .then(response => {
                setUser(response.data);
                getQuotes();
            })
            .catch(error => {
                setLoading(false);
                Alert.alert('Error', error.message);
            });
    }

    const getQuotes = async () => {
        let url = BASE_URL + '/api/quotes/get';
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token'),
        }
        axios.get(url, { headers })
            .then(response => {
                setQuotes(response.data.text);
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
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <Spinner visible={loading} />
                <Avatar
                    user={user}
                    quotes={quotes}
                    navigation={navigation}
                />
                <Link />
                <Biodata
                    refreshing={refreshing}
                    user={user}
                    onRefresh={onRefresh}
                />
            </SafeAreaView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
});