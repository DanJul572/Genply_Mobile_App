import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Alert, AppState, FlatList, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { TopBar } from '../../components/Notification';
import { BASE_URL, COLOR_PRIMARY, WINDOW_WIDTH } from '../../utils/constant';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Notification = ({ navigation }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState([]);

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
        setNotifications([]);
        let url = BASE_URL + '/api/notification/list';
        let user_token = await AsyncStorage.getItem('user_token');
        let headers = {
            Authorization: user_token
        }
        axios.get(url, { headers })
        .then(response => {
            setNotifications(response.data);
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
                {(notifications.length > 0) && (
                    <FlatList
                        data={notifications}
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
                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('NotificationDetail', { notification: item })}>
                                <View style={styles.notification_container}>
                                    <Text style={styles.notification_message}>{item.title}</Text>
                                    <Text style={styles.notification_date}>
                                        { new Date(Date.parse(item.created_at)).toLocaleDateString('pt-PT') }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                )}
                {(notifications.length <= 0) && (
                    <ScrollView
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

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    notification_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: WINDOW_WIDTH * 0.025,
        marginVertical: WINDOW_WIDTH * 0.015,
        backgroundColor: '#FFFFFF',
        padding: WINDOW_WIDTH * 0.025,
        borderRadius: WINDOW_WIDTH * 0.015,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    notification_message: {
        textAlign: 'left',
        flex: 2,
        color: '#788389',
        fontFamily: 'Roboto-Regular',
    },
    notification_date: {
        textAlign: 'right',
        flex: 1,
        color: '#788389',
        fontFamily: 'Roboto-Regular',
    },
    alert_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert: {
        color: '#788389',
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
    }
})
