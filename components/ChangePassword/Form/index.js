import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { score } from 'react-native-zxcvbn';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useValidation } from 'react-native-form-validator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL, LOCALIZE, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Form = ({ route, navigation }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordScore, setPasswordScore] = useState({
        score: 0,
        width: 0,
        color: 'transparent'
    });
    const { validate, isFieldInError, getErrorsInField } = useValidation({
        state: { password, confirmPassword, oldPassword },
        deviceLocale: LOCALIZE,
        labels: {
            password: t('password_field'),
            confirmPassword: t('confirm_password_field'),
            oldPassword: t('old_password_field'),
        }
    });
    const [alert, setAlert] = useState({
        color: '',
        message: ''
    });

    useEffect(() => {
        if (route.params) {
            let param = route.params.flash_message;
            setAlert({
                color: param.color,
                message: param.message,
            });
        }
    }, []);

    const changePasswordScore = (password) => {
        setPassword(password);
        let passwordScore = score(password);
        passwordScore.then(score => {
            let color = '';
            let width = 0;
            if (score == 0) {
                color = '#ff2900';
                width = 20;
            } else if (score == 1) {
                color = '#ff6900';
                width = 40;
            } else if (score == 2) {
                color = '#f3d331';
                width = 60;
            } else if (score == 3) {
                color = '#14eb6e';
                width = 80;
            } else if (score == 4) {
                color = '#00ff6b';
                width = 100;
            }
            setPasswordScore({
                score: score,
                width: width / 100,
                color: color
            });
        });
    }

    const onSubmitForm = (type) => {
        if (type == 'main') {
            let valid = validate({
                password: { required: true },
                confirmPassword: { required: true, equalPassword: password }
            });
            if (valid) {
                change();
            }
        } else {
            let valid = validate({
                oldPassword: { required: true },
            });
            if (valid) {
                check();
            }
        }
    }

    const change = async () => {
        setLoading(true);
        let url = BASE_URL + '/api/change-password';
        let user_id = await AsyncStorage.getItem('user_id');
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        let body = {
            idprofil: user_id,
            password: password
        }
        axios.post(url, body, { headers })
        .then(response => {
            setLoading(false);
            navigation.navigate('Menu', {flash_message: {
                color: '#1BA146',
                message: t('password_changed')
            }});
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    const check = async () => {
        setLoading(true);
        let url = BASE_URL + '/api/check-password';
        let user_id = await AsyncStorage.getItem('user_id');
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        let body = {
            idprofil: user_id,
            password: oldPassword
        }
        axios.post(url, body, { headers })
        .then(response => {
            if (response.data.status == false) {
                setAlert({
                    color: '#eb3131',
                    message: t('password_wrong_message')
                });
            } else {
                setAlert({
                    color: '',
                    message: ''
                });
                setOldPassword('');
                setValidPassword(true);
            }
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
            {(validPassword) && (
                <View>
                    <View style={styles.title_container}>
                        <Text style={styles.title_text}>{t('change_password_title_2')}</Text>
                    </View>
                    {(alert.message != '') && (
                        <Text style={[styles.alert_text, { color: alert.color }]}>{alert.message}</Text>
                    )}
                    <View style={styles.input_container}>
                        <Text style={styles.label}>{t('password_field')} : </Text>
                        <TextInput autoCapitalize='none' style={styles.text_input} value={password} onChangeText={value => changePasswordScore(value)} secureTextEntry={true} />
                        <Progress.Bar
                            style={{ marginTop: WINDOW_WIDTH * 0.01 }}
                            progress={passwordScore.width}
                            width={null}
                            height={WINDOW_HEIGHT * 0.01}
                            borderRadius={WINDOW_WIDTH * 0.05}
                            color={passwordScore.color}
                            unfilledColor={'#EFEFEF'}
                            borderColor={'transparent'}
                            animated={false}
                        />
                        {(isFieldInError('password')) && (
                            <Text style={styles.error_message}>{getErrorsInField('password')[0]}</Text>
                        )}
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>{t('confirm_password_field')} : </Text>
                        <TextInput autoCapitalize='none' style={styles.text_input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
                        {(isFieldInError('confirmPassword')) && (
                            <Text style={styles.error_message}>{getErrorsInField('confirmPassword')[0]}</Text>
                        )}
                    </View>
                    <View style={styles.input_container}>
                        {/* {(passwordScore.score >= 2) && ( */}
                            <TouchableOpacity onPress={() => onSubmitForm('main')} activeOpacity={1}>
                                <View style={styles.submit_button}>
                                <Text style={styles.submit_button_text}>{t('submit_button')}</Text>
                                </View>
                            </TouchableOpacity>
                        {/* )} */}
                    </View>
                </View>
            )}
            {(!validPassword) && (
                <View>
                    <View style={styles.title_container}>
                        <Text style={styles.title_text}>{t('change_password_title_1')}</Text>
                    </View>
                    {(alert.message != '') && (
                        <Text style={[styles.alert_text, { color: alert.color }]}>{alert.message}</Text>
                    )}
                    <View style={styles.input_container}>
                        <Text style={styles.label}>{t('old_password_field')} : </Text>
                        <TextInput autoCapitalize='none' style={styles.text_input} value={oldPassword} onChangeText={setOldPassword} secureTextEntry={true} />
                        {(isFieldInError('oldPassword')) && (
                            <Text style={styles.error_message}>{getErrorsInField('oldPassword')[0]}</Text>
                        )}
                    </View>
                    <View style={styles.input_container}>
                        <TouchableOpacity onPress={() => onSubmitForm('check')} activeOpacity={1}>
                            <View style={styles.submit_button}>
                                <Text style={styles.submit_button_text}>{t('submit_button')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    container: {
        padding: WINDOW_WIDTH * 0.05,
        flex: 1,
        justifyContent: 'center'
    },
    title_container: {
        marginBottom: WINDOW_WIDTH * 0.05
    },
    title_text: {
        textTransform: 'uppercase',
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: WINDOW_WIDTH * 0.04
    },
    input_container: {
        marginBottom: WINDOW_WIDTH * 0.035
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: '#788389',
        fontSize: WINDOW_WIDTH * 0.03,
        marginBottom: WINDOW_WIDTH * 0.005
    },
    text_input: {
        backgroundColor: '#ECECEC',
        fontFamily: 'Roboto-Medium',
        borderRadius: WINDOW_WIDTH * 0.02,
        padding: WINDOW_WIDTH * 0.025,
        color: '#788389'
    },
    error_message: {
        color: '#eb3131',
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.025,
        marginTop: WINDOW_WIDTH * 0.015
    },
    submit_button: {
        backgroundColor: '#009FD3',
        padding: WINDOW_WIDTH * 0.025,
        borderRadius: WINDOW_WIDTH * 0.05
    },
    submit_button_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03
    },
    alert_text: {
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.03,
        marginBottom: WINDOW_WIDTH * 0.045,
        textAlign: 'center'
    },
})
