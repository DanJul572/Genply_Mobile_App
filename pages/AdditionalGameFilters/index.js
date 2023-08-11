import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select'
import { Alert, AppState, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { TopBar } from '../../components/AdditionalGameFilters';
import { BASE_URL, COLOR_PRIMARY, WINDOW_WIDTH } from '../../utils/constant';
import { t } from 'i18next';
import { useFocusEffect } from '@react-navigation/native';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const AdditionalGameFilters = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [ages, setAges] = useState([]);
    const [age, setAge] = useState('');

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
        if ((firstOpened) || (refreshing)) getAge();
    }, [firstOpened, refreshing]);

    const getAge = async () => {
        setLoading(true);
        setAges([]);
        setAge('');
        let url = BASE_URL + '/api/dataumur';
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers: headers })
        .then(response => {
            let age_response = [];
            age_response = response.data.map((item) => {
                return {
                    label: item.toString(),
                    value: item.toString()
                }
            });
            setAges(age_response);
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
                    {(ages.length > 0) && (
                        <View style={styles.form_container}>
                            <Text style={styles.label}>{t('age_field')} : </Text>
                            <RNPickerSelect
                                onValueChange={(value) => setAge(value)}
                                placeholder={{}}
                                style={inputSelect}
                                useNativeAndroidPickerStyle={false}
                                value={age}
                                items={ages}
                            />
                            <TouchableOpacity activeOpacity={1} onPress={() =>
                                navigation.navigate('Search', { age: age })
                            }>
                                <View style={styles.action_button_container}>
                                    <Text style={styles.action_send}>{t('apply_button')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default AdditionalGameFilters

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form_container: {
        paddingHorizontal: WINDOW_WIDTH * 0.05,
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: '#788389',
        fontSize: WINDOW_WIDTH * 0.03,
        marginBottom: WINDOW_WIDTH * 0.005
    },
    action_button_container: {
        alignSelf: 'center',
        width: WINDOW_WIDTH * 0.35,
        backgroundColor: '#009BD1',
        padding: WINDOW_WIDTH * 0.015,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WINDOW_WIDTH * 0.015,
        marginTop: WINDOW_WIDTH * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    action_send: {
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.03,
    },
});

const inputSelect = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#ECECEC',
        fontFamily: 'Roboto-Medium',
        borderRadius: WINDOW_WIDTH * 0.02,
        padding: WINDOW_WIDTH * 0.025,
        color: '#788389'
    },
    inputAndroid: {
        backgroundColor: '#ECECEC',
        fontFamily: 'Roboto-Medium',
        borderRadius: WINDOW_WIDTH * 0.02,
        padding: WINDOW_WIDTH * 0.025,
        color: '#788389'
    },
});