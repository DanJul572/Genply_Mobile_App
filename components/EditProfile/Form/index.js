import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import { useValidation } from 'react-native-form-validator';
import { launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import OptionsMenu from 'react-native-option-menu';
import { BASE_URL, LOCALIZE, WINDOW_WIDTH } from '../../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const Form = ({ navigation, firstOpened, refreshing, selectedAvatar, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [gender, setGender] = useState('Laki-Laki');
    const [brith, setBrith] = useState(new Date());
    const [grade, setGrade] = useState('1-SD');
    const [avatar, setAvatar] = useState(BASE_URL + '/storage/profil/default.jpg');
    const [avatarName, setAvatarName] = useState('');
    const [avatarBase64, setAvatarBase64] = useState('');

    const { validate, isFieldInError, getErrorsInField } = useValidation({
        state: { name, gender, brith, grade },
        deviceLocale: LOCALIZE,
        labels: {
            name: t('name_field'),
            gender: t('gender_field'),
            brith: t('brith_field'),
            grade: t('grade_field'),
        }
    });

    const [openDateInput, setOpenDateInput] = useState(false);
    const [alert, setAlert] = useState({
        color: '',
        message: ''
    });

    useEffect(() => {
        if ((firstOpened) || (refreshing)) {
            setAlert({
                color: '',
                message: ''
            });
            getPlayer();
        };
    }, [firstOpened, refreshing]);

    useEffect(() => {
        if (selectedAvatar.name != '') {
            setAvatar(selectedAvatar.uri);
            setAvatarName(selectedAvatar.name);
            setSelectedImage('avatar');
        };
    }, [selectedAvatar]);

    const update = async () => {
        changeRequestStatus('form', true);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/profil/update/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token'),
        }
        let photo = '';
        let avatar_status = false;
        if (selectedImage == 'avatar') {
            photo = avatarName;
            avatar_status = true;
        } else {
            photo = avatarBase64;
            avatar_status = false;
        }
        let body = {
            avatar_status: avatar_status,
            grade: grade,
            photo: photo,
            nama: name,
            gender: gender,
            brithday: (brith.getMonth() + 1) + '/' + (brith.getDate()) + '/' + (brith.getFullYear())
        }
        axios.post(url, body, { headers })
        .then(response => {
            setAlert({
                color: '#1BA146',
                message: t('profile_changed'),
            });
            console.log(response.data);
            changeRequestStatus('form', false);
        })
        .catch(error => {
            changeRequestStatus('form', false);
            Alert.alert('Error', error.message);
        });
    }

    const getPlayer = async () => {
        changeRequestStatus('form', true);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-one-user/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token'),
        }
        axios.get(url, { headers })
        .then(response => {
            let player = response.data;
            setName(player.namalengkap);
            setGender(player.jeniskelamin);
            setBrith(new Date(Date.parse(player.tanggallahir)));
            (player.tingkat != 'KULIAH') ? setGrade(player.kelas + '-' + player.tingkat) : setGrade('KULIAH');
            setAvatar(BASE_URL + '/storage/profil/' + player.photo);
            changeRequestStatus('form', false);
        })
        .catch(error => {
            changeRequestStatus('form', false);
            Alert.alert('Error', error.message);
        });
    }

    const pickImage = () => {
        let options_1 = {
            mediaType: 'photo',
        }
        launchImageLibrary(options_1, callback => {
            if (callback.errorCode) {
                Alert.alert('Error', callback.errorMessage);
            } else {
                if (!callback.didCancel) {
                    let options_2 = {
                        mediaType: 'photo',
                        includeBase64: true,
                        path: callback.assets[0].uri,
                        width: 500,
                        height: 500
                    }
                    ImagePicker.openCropper(options_2)
                    .then(image => {
                        setAvatar(`data:${image.mime};base64,${image.data}`);
                        setAvatarBase64(image.data);
                        setSelectedImage('galery');
                    });
                }
            }
        });
    }

    const onSubmitForm = () => {
        let valid = validate({
            name: { required: true },
            gender: { required: true },
            brith: { required: true },
            grade: { required: true }
        });
        if (valid) {
            update();
        }
    }

    const openGalery = () => {
        pickImage();
    }

    const openAvatar = () => {
        navigation.navigate('ChoseAvatar');
    }

    const cleanForm = () => {
        setName('');
        setGender('Laki-Laki');
        setBrith(new Date());
        setGrade('1-SD');
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.input_container}>
                    <OptionsMenu
                        button={{ uri: avatar }}
                        buttonStyle={styles.avatar_player}
                        destructiveIndex={1}
                        options={[ t('galery_option'), t('avatar_option'), t('cancel_option') ]}
                        actions={[ openGalery, openAvatar ]}
                    />
                </View>
                <View style={styles.input_container}>
                    {(alert.message != '') && (
                        <Text style={[styles.alert_text, {color: alert.color}]}>{alert.message}</Text>
                    )}
                </View>
                <View style={styles.input_container}>
                    <Text style={styles.label}>{t('name_field')} : </Text>
                    <TextInput style={styles.text_input} value={name} onChangeText={setName} deviceLocale="fr" />
                    {(isFieldInError('name')) && (
                        <Text style={styles.error_message}>{getErrorsInField('name')[0]}</Text>
                    )}
                </View>
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
                <View style={styles.input_container}>
                    <TouchableOpacity onPress={() => onSubmitForm()} activeOpacity={1}>
                        <View style={styles.submit_button}>
                            <Text style={styles.submit_button_text}>{t('save_button')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    container: {
        padding: WINDOW_WIDTH * 0.05,
        flex: 1
    },
    avatar_player: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        borderRadius: (WINDOW_WIDTH * 0.25) / 2,
        borderWidth: WINDOW_WIDTH * 0.01,
        borderColor: '#ECECEC',
        alignSelf: 'center'
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
    alert_text: {
        fontFamily: 'Poppins-Medium',
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
