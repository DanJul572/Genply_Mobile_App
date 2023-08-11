import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-date-picker';
import Wizard from 'react-native-wizard';
import Spinner from 'react-native-loading-spinner-overlay';
import { useValidation } from 'react-native-form-validator';
import { score } from 'react-native-zxcvbn';
import { BASE_URL, LOCALIZE, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';
import { getCurrentUser } from '../../../utils/google';
import { checkUserData, storeUserData } from '../../../utils/normal';
import { useTranslation } from 'react-i18next';

const FormBackup = ({ navigation }) => {
    const { t } = useTranslation();

    const [google_id, setGoogleID] = useState('');
    const [gender, setGender] = useState('Laki-Laki');
    const [brith, setBrith] = useState(new Date());
    const [grade, setGrade] = useState('1-SD');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordScore, setPasswordScore] = useState({
        score: 0,
        width: 0,
        color: 'blue'
    });

    const { validate, isFieldInError, getErrorsInField } = useValidation({
        state: { gender, brith, grade, password, confirmPassword },
        deviceLocale: LOCALIZE,
        labels: {
            gender: t('gender_field'),
            brith: t('brith_field'),
            grade: t('grade_field'),
            password: t('password_field'),
            confirmPassword: t('confirm_password_field'),
        }
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    const [openDateInput, setOpenDateInput] = useState(false);
    const wizard = useRef();
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [isLastStep, setIsLastStep] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const stepList = [
        {
            content:
                <View>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>{t('gender_field')} : </Text>
                        <RNPickerSelect
                            onValueChange={(value) => setGender(value)}
                            placeholder={{}}
                            style={inputSelect}
                            useNativeAndroidPickerStyle={false}
                            value={gender}
                            items={[
                                { label: t('male_option'), value: 'Laki-Laki' },
                                { label: t('female_option'), value: 'Perempuan' }
                            ]}
                        />
                        {(isFieldInError('gender')) && (
                            <Text style={styles.error_message}>{getErrorsInField('gender')[0]}</Text>
                        )}
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>{t('brith_field')} : </Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => setOpenDateInput(true)}>
                            <Text style={styles.date_input}>
                                {brith.toLocaleDateString('pt-PT')}
                            </Text>
                        </TouchableOpacity>
                        {(isFieldInError('birth')) && (
                            <Text style={styles.error_message}>{getErrorsInField('birth')[0]}</Text>
                        )}
                        <DatePicker
                            modal
                            title={null}
                            open={openDateInput}
                            date={brith}
                            mode={'date'}
                            onConfirm={(date) => {
                                setOpenDateInput(false);
                                setBrith(date);
                            }}
                            onCancel={() => {
                                setOpenDateInput(false);
                            }}
                        />
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>{t('grade_field')} : </Text>
                        <RNPickerSelect
                            onValueChange={(value) => setGrade(value)}
                            placeholder={{}}
                            style={inputSelect}
                            useNativeAndroidPickerStyle={false}
                            value={grade}
                            items={[
                                { label: '1 - SD', value: '1-SD' },
                                { label: '2 - SD', value: '2-SD' },
                                { label: '3 - SD', value: '3-SD' },
                                { label: '4 - SD', value: '4-SD' },
                                { label: '5 - SD', value: '5-SD' },
                                { label: '6 - SD', value: '6-SD' },
                                { label: '7 - SMP', value: '7-SMP' },
                                { label: '8 - SMP', value: '8-SMP' },
                                { label: '9 - SMP', value: '9-SMP' },
                                { label: '10 - SMA', value: '10-SMA' },
                                { label: '11 - SMA', value: '11-SMA' },
                                { label: '12 - SMA', value: '12-SMA' },
                                { label: '10 - SMK', value: '10-SMK' },
                                { label: '11 - SMK', value: '11-SMK' },
                                { label: '12 - SMK', value: '12-SMK' },
                                { label: 'KULIAH', value: 'KULIAH' },
                            ]}
                        />
                        {(isFieldInError('grade')) && (
                            <Text style={styles.error_message}>{getErrorsInField('grade')[0]}</Text>
                        )}
                    </View>
                </View>
        },
        {
            content:
                <View>
                    <View style={styles.input_container}>
                        <Text style={styles.label}>{t('password_field')} : </Text>
                        <TextInput style={styles.text_input} value={password} onChangeText={value => changePasswordScore(value)} secureTextEntry={true} />
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
                        <TextInput style={styles.text_input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
                        {(isFieldInError('confirmPassword')) && (
                            <Text style={styles.error_message}>{getErrorsInField('confirmPassword')[0]}</Text>
                        )}
                    </View>
                    {(passwordScore.score >= 2) && (
                        <View style={styles.input_container}>
                            <TouchableOpacity onPress={() => onSubmitForm()} activeOpacity={1}>
                                <View style={styles.submit_button}>
                                    <Text style={styles.submit_button_text}>{(t('save_button'))}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
        },
    ];

    useEffect(() => {
        getCurrentUser().then(response => {
            setGoogleID(response.user.id);
        });
    }, []);

    const buttonActive = status => {
        let color = '';
        status ? color = '#788389' : color = '#009FD3';
        return color;
    }

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

    const onSubmitForm = () => {
        let valid = validate({
            gender: { required: true },
            brith: { required: true },
            grade: { required: true },
            password: { required: true, minlength: 8 },
            confirmPassword: { required: true, minlength: 8, equalPassword: password }
        });
        if (valid) {
            signin();
        }
    }

    const signin = async () => {
        setLoading(true);
        let url = BASE_URL + '/api/google/update';
        let body = {
            google_id: google_id,
            gender: gender,
            brithday: (brith.getMonth() + 1) + '/' + (brith.getDate()) + '/' + (brith.getFullYear()),
            grade: grade,
            password: password
        }
        axios.post(url, body)
            .then(() => {
                setLoading(false);
                getCurrentUser().then(response => {
                    login(response.user);
                });
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
                    cleanForm();
                    setLoading(false);
                    checkUserData().then(value => {
                        if (value) {
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

    const cleanForm = () => {
        setGoogleID('');
        setGender('Laki-Laki');
        setBrith(new Date());
        setGrade('1-SD');
        setPassword('');
        setConfirmPassword('');
        setPasswordScore({
            score: 0,
            width: 0,
            color: 'blue'
        });
    }

    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
            <View style={styles.title_container}>
                <Text style={styles.title_text}>{t('register_title').toUpperCase()}</Text>
            </View>
            {(alert) && (
                <View style={styles.alert_container}>
                    <Text style={styles.alert_text}>{alert}</Text>
                </View>
            )}
            <Wizard
                ref={wizard}
                steps={stepList}
                isFirstStep={val => setIsFirstStep(val)}
                isLastStep={val => setIsLastStep(val)}
                currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                    setCurrentStep(currentStep)
                }}
            />
            <View style={styles.button_container}>
                <TouchableOpacity activeOpacity={1} onPress={() => wizard.current.prev()} disabled={isFirstStep}>
                    <Text style={[styles.button_text, { color: buttonActive(isFirstStep) }]}>{t('prev_button')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => wizard.current.next()} disabled={isLastStep}>
                    <Text style={[styles.button_text, { color: buttonActive(isLastStep) }]}>{t('next_button')}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {stepList.map((val, index) => (
                    <View
                        key={'step-indicator-' + index}
                        style={{
                            width: 10,
                            marginHorizontal: 6,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: index === currentStep ? '#009FD3' : '#788389',
                        }}
                    />
                ))}
            </View>
        </View>
    )
}

export default FormBackup

const styles = StyleSheet.create({
    container: {
        padding: WINDOW_WIDTH * 0.05,
        flex: 1
    },
    page_container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    title_container: {
        marginBottom: WINDOW_WIDTH * 0.05
    },
    title_text: {
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: WINDOW_WIDTH * 0.04
    },
    alert_container: {
        marginBottom: WINDOW_WIDTH * 0.035
    },
    alert_text: {
        color: '#FFFFFF',
        backgroundColor: '#EB3131',
        fontFamily: 'Poppins-Regular',
        fontSize: WINDOW_WIDTH * 0.03,
        textAlign: 'center',
        padding: WINDOW_WIDTH * 0.01,
        borderRadius: WINDOW_WIDTH * 0.01
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
    date_input: {
        backgroundColor: '#ECECEC',
        fontFamily: 'Roboto-Medium',
        borderRadius: WINDOW_WIDTH * 0.02,
        paddingHorizontal: WINDOW_WIDTH * 0.025,
        paddingVertical: WINDOW_WIDTH * 0.035,
        color: '#788389'
    },
    button_container: {
        marginTop: WINDOW_WIDTH * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: WINDOW_WIDTH * 0.05
    },
    button_text: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center'
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
    error_message: {
        color: '#eb3131',
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.025,
        marginTop: WINDOW_WIDTH * 0.015
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
