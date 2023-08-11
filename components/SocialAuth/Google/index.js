import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { signIn } from '../../../utils/google';
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant';
import { storeUserData, checkUserData } from '../../../utils/normal';
import { GoogleIcon } from '../../../assets/Icons/Login';
import { setOnlineUser } from '../../../utils/firebase';


const Google = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const signInWithGoogle = () => {
        signIn().then(response => {
            if (response.user) {
                saveUserData(response.user);
            }
        });
    }

    const saveUserData = (user) => {
        setLoading(true);
        let url = BASE_URL + '/api/google/store';
        let body = {
            google_id: user.id,
            email: user.email,
            name: user.name,
        }
        axios.post(url, body)
        .then(response => {
            if (response.data.password == 'not set yet') {
                setLoading(false);
                navigation.navigate('GoogleRegister');
            } else {
                login(user);
            }
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    const login = async (user) => {
        let url = BASE_URL + '/api/google/login/react';
        let body = {
            google_id: user.id
        }
        axios.post(url, body)
        .then(response => {
            if (response.data != 0) {
                let user_id = response.data.user_id;
                let user_token = 'Bearer ' + response.data.token;
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
            <TouchableOpacity activeOpacity={1} onPress={() => signInWithGoogle()}>
                <View style={styles.button_container}>
                    <Image style={styles.button_icon} source={GoogleIcon} />
                    <Text style={styles.button_text}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Google

const styles = StyleSheet.create({
    button_container: {
        flexDirection: 'row',
        borderRadius: WINDOW_WIDTH * 0.01,
        padding: WINDOW_WIDTH * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        width: WINDOW_WIDTH * 0.75,
        backgroundColor: '#FFFFFF',
        marginTop: WINDOW_WIDTH * 0.035
    },
    button_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        marginRight: WINDOW_WIDTH * 0.015
    },
    button_text: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.035
    },
})
