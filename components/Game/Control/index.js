import React from 'react';
import { Alert, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASE_URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';
import { AppstoreImage, PlaystoreImage } from '../../../assets/Images/Game';
import { useTranslation } from 'react-i18next';

const Control = ({ logo, companyname, namagame, app_store, play_store, installed }) => {
    const { t } = useTranslation();

    const openInAppstore = () => {
        let url = (Platform.OS == 'ios') ? app_store : play_store;
        Linking.canOpenURL(url)
        .then(supported => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                return Alert.alert('Error', 'App not found.');
            }
        })
        .catch(() => {
            Alert.alert('Error', 'App not found.');
        });
    }

    const openApp = () => {
        let url = '';
        if (Platform.OS == 'ios') {
            let string = companyname;
            url = string + '://' + string;
        } else {
            let string = namagame.replace(/\s/g, '').toLowerCase();
            url = 'igenply' + '://' + string;
        }
        Linking.canOpenURL(url)
        .then(supported => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                return Alert.alert('Error', "Can't open the app.");
            }
        })
        .catch(() => {
            Alert.alert('Error', "Can't open the app.");
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image source={{ uri: BASE_URL + '/storage/game/' + logo }} style={styles.avatar}/>
                <View style={styles.action_container}>
                    <Text style={styles.game_name}>{namagame}</Text>
                    {((installed == true)) && (
                        <View style={styles.button_container}>
                            <TouchableOpacity activeOpacity={1} style={styles.touch_container} onPress={() => openApp()}>
                                <View style={styles.open_button}>
                                    <Text style={styles.text_open_button}>{t('open_button')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    {((installed == false)) && (
                        <View style={styles.button_container}>
                            <TouchableOpacity activeOpacity={1} style={styles.touch_container} onPress={() => openInAppstore()}>
                                {(Platform.OS == 'ios') && (
                                    <View style={styles.mobil_store_button}>
                                        <Image style={styles.mobil_store_icon} source={AppstoreImage} />
                                        <Text style={styles.text_button}>App Store</Text>
                                    </View>
                                )}
                                {(Platform.OS == 'android') && (
                                    <View style={styles.mobil_store_button}>
                                        <Image style={styles.mobil_store_icon} source={PlaystoreImage} />
                                        <Text style={styles.text_button}>Google Play</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

export default Control

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: WINDOW_WIDTH * 0.015,
        overflow: 'hidden'
    },
    avatar: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_HEIGHT * 0.15,
        overflow: 'hidden',
        borderRadius: 10
    },
    action_container: {
        width: WINDOW_WIDTH * 0.65,
        justifyContent: 'space-around'
    },
    game_name: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_HEIGHT * 0.035
    },
    button_container: {
        flexDirection: 'row'
    },
    touch_container: {
        flex: 1
    },
    open_button: {
        backgroundColor: '#4ACEF1',
        padding: WINDOW_HEIGHT * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:  WINDOW_WIDTH * 0.01,
        marginRight: 10
    },
    text_open_button: {
        textTransform: 'uppercase',
        fontSize: WINDOW_WIDTH * 0.03,
        fontFamily: 'Roboto-Medium',
        color: '#FFFFFF'
    },
    action_button: {
        backgroundColor: '#4ACEF1',
        padding: WINDOW_HEIGHT * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:  WINDOW_WIDTH * 0.01
    },
    text_button: {
        fontSize: WINDOW_WIDTH * 0.03,
        fontFamily: 'Roboto-Medium',
        color: '#FFFFFF'
    },
    mobil_store_button: {
        backgroundColor: '#000000',
        padding: WINDOW_HEIGHT * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:  WINDOW_WIDTH * 0.01,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    mobil_store_icon: {
        width: WINDOW_WIDTH * 0.035,
        height: WINDOW_WIDTH * 0.035,
        resizeMode: 'contain',
        marginRight: WINDOW_WIDTH * 0.015
    }
})
