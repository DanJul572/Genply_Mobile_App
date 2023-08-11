import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Alert, AppState, FlatList, Image, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { TopBar } from '../../components/ChoseAvatar';
import { BASE_URL, COLOR_PRIMARY, WINDOW_WIDTH } from '../../utils/constant';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const choseAvatar = ({ navigation }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [avatars, setAvatars] = useState([]);

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
        if ((firstOpened) || (refreshing)) getNotification();
    }, [firstOpened, refreshing]);

    const getNotification = async () => {
        setLoading(true);
        setAvatars([]);
        let url = BASE_URL + '/api/avatar/all';
        let user_token = await AsyncStorage.getItem('user_token');
        let headers = {
            Authorization: user_token
        }
        axios.get(url, { headers })
        .then(response => {
            setAvatars(response.data);
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
                {(avatars.length > 0) && (
                    <FlatList
                        data={avatars}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                colors={[COLOR_PRIMARY]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        renderItem={({ item }) =>
                            <TouchableOpacity activeOpacity={1} onPress={() =>
                                navigation.navigate('EditProfile', {
                                    avatar : { uri: BASE_URL + '/storage/profil/' + item.gambar, name: item.gambar}
                                })
                            }>
                                <View style={styles.individu_container}>
                                    <Image source={{ uri: BASE_URL + '/storage/profil/' + item.gambar }} style={styles.game_avatar} />
                                </View>
                            </TouchableOpacity>
                        }
                    />
                )}
                {(avatars.length <= 0) && (
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

export default choseAvatar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    individu_container: {
        alignSelf: 'center',
        width: WINDOW_WIDTH * 0.28,
        borderWidth: WINDOW_WIDTH * 0.015,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        marginBottom: WINDOW_WIDTH * 0.035,
        marginHorizontal: WINDOW_WIDTH * 0.018,
        borderRadius: WINDOW_WIDTH * 0.015,
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
        borderRadius: WINDOW_WIDTH * 0.015,
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        resizeMode: 'contain',
        alignSelf: 'center'
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
    }
})
