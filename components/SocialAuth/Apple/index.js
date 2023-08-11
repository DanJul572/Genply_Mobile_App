import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant';
import { signIn } from '../../../utils/apple';
import { AppleIcon } from '../../../assets/Icons/Login';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { checkUserData, storeUserData } from '../../../utils/normal';
import { useTranslation } from 'react-i18next';
import { setOnlineUser } from '../../../utils/firebase';

const Apple = ({ navigation, setAlert }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const onAppleButtonPress = () => {
        signIn().then(response => {
            checkUserDataInServer(response);
        });
    }

    const checkUserDataInServer = (user) => {
        setLoading(true);
        let url = BASE_URL + '/api/apple/check/' + user.apple_id;
        axios.get(url)
        .then(response => {
            let user_in_server = response.data;
            if (user_in_server.status == false) {
                if (user.give_credential == true) {
                    setAlert({
                        color: '#eb3131',
                        message: t('apple_register_error_message')
                    });
                    setLoading(false);
                } else if (user.give_credential == false) {
                    saveUserData(user);
                }
            } else if (user_in_server.status == true) {
                if (user_in_server.password == 'not set yet') {
                    setLoading(false);
                    navigation.navigate('AppleRegister', { apple_id: user.apple_id });
                } else if (user_in_server.password == 'set') {
                    login(user.apple_id);
                }
            }
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    const saveUserData = (user) => {
        let url = BASE_URL + '/api/apple/store';
        let body = {
            apple_id: user.apple_id,
            email: user.email,
            namalengkap: user.given_name + ' ' + user.family_name,
        }
        axios.post(url, body)
        .then(response => {
            if (response.data.password == 'not set yet') {
                setLoading(false);
                navigation.navigate('AppleRegister', { apple_id: user.apple_id });
            } else {
                login(user.apple_id);
            }
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        })
    }

    const login = (apple_id) => {
        let url = BASE_URL + '/api/apple/login';
        let body = {
            apple_id: apple_id
        }
        axios.post(url, body)
        .then(response => {
            let data =  response.data;
            if (data != 0) {
                let user_id = data.user_id.toString();
                let user_token = 'Bearer ' + data.token;
                storeUserData(user_id, user_token);
                setLoading(false);
                checkUserData().then(value => {
                    if (value) {
                        setOnlineUser();
                        navigation.navigate('MainApp');
                    }
                });
            }
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View>
            <Spinner visible={loading} />
            <TouchableOpacity activeOpacity={1} onPress={() => onAppleButtonPress()}>
                <View style={styles.button_container}>
                    <Image style={styles.button_icon} source={AppleIcon} />
                    <Text style={styles.button_text}>Sign in with Apple</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Apple

const styles = StyleSheet.create({
    button_container: {
        flexDirection: 'row',
        borderRadius: WINDOW_WIDTH * 0.01,
        padding: WINDOW_WIDTH * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        width: WINDOW_WIDTH * 0.75,
        backgroundColor: '#000000',
        marginTop: WINDOW_WIDTH * 0.02
    },
    button_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        marginRight: WINDOW_WIDTH * 0.015,
        resizeMode: 'contain'
    },
    button_text: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        color: '#FFFFFF'
    },
})
