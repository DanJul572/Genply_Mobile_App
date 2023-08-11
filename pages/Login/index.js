import React, { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { useValidation } from 'react-native-form-validator';
import LinearGradient from 'react-native-linear-gradient';
import { Alert, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LogoIcon } from '../../assets/Icons/Welcome';
import { BASE_URL, LOCALIZE, WINDOW_WIDTH } from '../../utils/constant';
import { Pascall2Image } from '../../assets/Images/Login';
import { Google, Apple } from '../../components/SocialAuth';
import { checkUserData, storeUserData } from '../../utils/normal';
import { BackIcon } from '../../assets/Icons/Login';
import { useTranslation } from 'react-i18next';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Login = ({route, navigation }) => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({
        color: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const { validate, isFieldInError, getErrorsInField } = useValidation({
        state: { email, password },
        deviceLocale: LOCALIZE,
        labels: {
            email: t('email_field'),
            password: t('password_field'),
        }
    });

    useEffect(() => {
        checkUserData()
        .then(value => {
            if (value) {
                navigation.navigate('MainApp');
            }
        })
        .catch(error => {
            Alert.alert('Error', error.toString());
        });
        if (route.params) {
            let param = route.params.flash_message;
            setAlert({
                color: param.color,
                message: param.message,
            });
        }
    }, []);

    const onSubmitForm = () => {
        let valid = validate({
            email: { required: true, email: true },
            password: { required: true },
        });
        if (valid) {
            login();
        }
    }

    const login = () => {
        setLoading(true);
        setAlert(false);
        let url = BASE_URL + '/api/login';
        let form = {
            email: email,
            password: password
        }
        axios.post(url, form)
        .then(response => {
            if (response.data.message) {
                let message = response.data.message;
                let alert_message = '';
                if (message == 'not verified') {
                    alert_message = t('email_not_verified_message');
                } else if (message == 'password wrong') {
                    alert_message = t('password_wrong_message');
                } else if (message == 'not registered') {
                    alert_message = t('email_not_registered_message');
                }
                setAlert({
                    color: '#eb3131',
                    message: alert_message,
                });
            } else {
                let user_id = response.data.id.toString();
                let user_token = 'Bearer ' + response.data.token;
                storeUserData(user_id, user_token);
                setEmail('');
                setPassword('');
            }
            setLoading(false);
            checkUserData()
            .then(value => {
                if (value) {
                    setOnlineUser();
                    navigation.navigate('MainApp');
                }
            })
            .catch(error => {
                Alert.alert('Error', error.toString());
            });
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <Spinner visible={loading} />
            <SafeAreaView style={styles.container}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#71D7FF', '#39C7FF', '#00B7FF']} style={styles.background}>
                    <View style={styles.top_bar_container}>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Welcome')}>
                            <View style={styles.top_bar_icon_container}>
                                <Image style={styles.top_bar_icon} source={BackIcon} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.text}>{t('slogan_text')}</Text>
                    </View>
                    <Image source={LogoIcon} style={styles.logo} />
                    {(alert.message != '') && (
                        <Text style={[styles.alert_text, {color: alert.color}]}>{alert.message}</Text>
                    )}
                    <View style={styles.form_container}>
                        <View>
                            <TextInput autoCapitalize='none' onChangeText={setEmail} value={email} placeholder={t('email_field')} placeholderTextColor="#FFFFFF" style={styles.input_field} />
                            {(isFieldInError('email')) && (
                                <Text style={styles.error_message}>{getErrorsInField('email')[0]}</Text>
                            )}
                            <TextInput autoCapitalize='none' onChangeText={setPassword} value={password} placeholder={t('password_field')} placeholderTextColor="#FFFFFF" secureTextEntry={true} style={[styles.input_field, styles.input_field_password]} />
                            {(isFieldInError('password')) && (
                                <Text style={styles.error_message}>{getErrorsInField('password')[0]}</Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => onSubmitForm()} activeOpacity={1}>
                            <View style={styles.button}>
                                <Text style={styles.text_button}>{t('login_button').toUpperCase()}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.social_auth_title}>
                            <View style={styles.line} />
                            <Text style={styles.or_text}>{(t('or_text'))}</Text>
                            <View style={styles.line} />
                        </View>
                        <View style={styles.social_auth_container}>
                            <Google
                                navigation={navigation}
                            />
                            {(Platform.OS == 'ios') && (
                                <Apple
                                    setAlert={setAlert}
                                    navigation={navigation}
                                />
                            )}
                        </View>
                    </View>
                    <Image source={Pascall2Image} style={styles.pascall_image} />
                </LinearGradient>
            </SafeAreaView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH,
        flex: 1
    },
    background: {
        alignItems: 'center',
        flex: 1
    },
    top_bar_container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.1
    },
    top_bar_icon_container: {
        padding: WINDOW_WIDTH * 0.03,
        marginRight: WINDOW_WIDTH * 0.035,
    },
    top_bar_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: WINDOW_WIDTH * 0.045
    },
    logo: {
        width: WINDOW_WIDTH * 0.27,
        height: WINDOW_WIDTH * 0.255,
        marginBottom: WINDOW_WIDTH * 0.055
    },
    alert_text: {
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.03,
        marginTop: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.025,
        marginHorizontal: WINDOW_WIDTH * 0.03,
        textAlign: 'center'
    },
    form_container: {
        alignItems: 'center',
        zIndex: 1,
        padding: WINDOW_WIDTH * 0.05,
    },
    input_field: {
        borderColor: '#FFFFFF',
        width: WINDOW_WIDTH * 0.85,
        paddingVertical: WINDOW_WIDTH * 0.015,
        paddingHorizontal: 0,
        borderBottomWidth: WINDOW_WIDTH * 0.005,
        color: '#FFFFFF',
    },
    input_field_password: {
        marginTop: WINDOW_WIDTH * 0.035
    },
    error_message: {
        color: '#EB3131',
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.025,
        marginTop: WINDOW_WIDTH * 0.015
    },
    button: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        width: WINDOW_WIDTH * 0.45,
        padding: WINDOW_WIDTH * 0.025,
        borderRadius: WINDOW_WIDTH * 0.5,
        marginTop: WINDOW_WIDTH * 0.05,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    text_button: {
        fontFamily: 'Roboto-Medium',
        color: '#36BFF5',
        fontSize: WINDOW_WIDTH * 0.045
    },
    social_auth_title: {
        marginTop: WINDOW_WIDTH * 0.055,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        backgroundColor: '#FFFFFF',
        height: WINDOW_WIDTH * 0.001,
        flex: 1
    },
    or_text: {
        fontFamily: 'Roboto-Medium',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.035,
        marginHorizontal: WINDOW_WIDTH * 0.035
    },
    social_auth_container: {
        alignItems: 'center'
    },
    pascall_image: {
        width: WINDOW_WIDTH * 0.85,
        height: WINDOW_WIDTH * 0.85,
        position: 'absolute',
        bottom: 0,
        left: -(WINDOW_WIDTH * 0.32),
    }
})
