import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, AppState, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { PointIcon, ThemeIcon } from '../../assets/Icons/Learning';
import { BASE_URL, COLOR_PRIMARY, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/constant';
import { TopBar } from '../../components/Learning';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Learning = ({ navigation }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [learning, setLearning] = useState([]);
    const [total, setTotal] = useState(0);

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
        if ((firstOpened) || (refreshing)) getLearning();
    }, [firstOpened, refreshing]);

    const getLearning = async () => {
        setLearning([]);
        setTotal(0);
        setLoading(true);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-data-learning/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(response => {
            (response.data.length > 0) ? setLearning(response.data.slice(0, 3)) : false;
            let total = (response.data.length > 0) ? response.data.reduce((accum, item) => accum + item.nilai, 0) : 0;
            setTotal(total);
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
        <View style={styles.main_container}>
            <Spinner visible={loading} />
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.main_container}>
                <TopBar
                    navigation={navigation}
                />
                <View style={styles.headers}>
                    <Text style={styles.title}>{t('report_title')}</Text>
                    <Text style={styles.total}>{total}</Text>
                    <View style={styles.icon_container}>
                        <Image source={ThemeIcon} style={styles.icon} />
                        <Image source={PointIcon} style={styles.icon} />
                    </View>
                </View>
                {(learning.length > 0) && (
                    <FlatList
                        style={styles.container}
                        keyExtractor={item => item.idpembelajaran}
                        showsVerticalScrollIndicator={false}
                        data={learning}
                        renderItem={({ item }) =>
                            <View style={styles.point_container}>
                                <Text style={styles.point_text}>{item.dptema}</Text>
                                <Text style={styles.point_value}>{item.nilai}</Text>
                            </View>
                        }
                        refreshControl={
                            <RefreshControl
                                colors={[COLOR_PRIMARY]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                )}
                {(learning.length <= 0) && (
                    <ScrollView
                        contentContainerStyle={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
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

export default Learning

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    container: {
        backgroundColor: '#FFFFFF',
    },
    headers: {
        marginBottom: WINDOW_WIDTH * 0.01,
        backgroundColor: '#ECF1F4',
        borderBottomLeftRadius: WINDOW_WIDTH * 0.05,
        borderBottomRightRadius: WINDOW_WIDTH * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    title: {
        textTransform: 'uppercase',
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        textAlign: 'center',
        marginTop: WINDOW_WIDTH * 0.05,
        marginBottom: WINDOW_WIDTH * 0.035
    },
    total: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.065,
        alignSelf: 'center'
    },
    icon_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.03,
        marginHorizontal: WINDOW_WIDTH * 0.045
    },
    icon: {
        width: WINDOW_WIDTH * 0.055,
        height: WINDOW_WIDTH * 0.055,
    },
    lists_container: {
        height: WINDOW_HEIGHT * 0.623,
        justifyContent: 'center'
    },
    point_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: WINDOW_WIDTH * 0.045,
        marginTop: WINDOW_WIDTH * 0.025,
    },
    point_text: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
        flex: 8,
        textAlign: 'left'
    },
    point_value: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
        flex: 1,
        textAlign: 'right'
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
