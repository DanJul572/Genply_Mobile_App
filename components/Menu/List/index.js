import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import { Alert, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MoneyIcon, ShopIcon, SuggestionIcon, HelpIcon, SettingIcon, ActivityIcon, SignOutIcon, LocationIcon, ChangePassword } from '../../../assets/Icons/Menu';
import { BASE_URL, COLOR_PRIMARY, WINDOW_WIDTH } from '../../../utils/constant';
import Spinner from 'react-native-loading-spinner-overlay';
import { removeUserData } from '../../../utils/normal';
import { isSignedIn, signOut as signOutGoogle } from '../../../utils/google';
import { useTranslation } from 'react-i18next';
import { removeOnlineUser } from '../../../utils/firebase';

const List = ({ flashMessage, navigation, refreshing, onRefresh }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        color: '',
        message: ''
    });

    useEffect(() => {
        if (flashMessage) {
            setAlert(flashMessage.flash_message);
        }
    }, [flashMessage]);

    const signOut = async () => {
        setLoading(true);
        let url = BASE_URL + '/api/logout-dari-game';
        let body = {
            idprofil: await AsyncStorage.getItem('user_id')
        }
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.post(url, body, { headers })
        .then(() => {
            removeOnlineUser();
            removeUserData();
            isSignedIn().then(response => {
                if (response) {
                    signOutGoogle();
                }
            });
            setLoading(false);
            navigation.navigate('Login');
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('error', error.message);
        });
    }

    const getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            let latitude = location.latitude;
            let longitude = location.longitude;
            getAddress(latitude, longitude);
        })
        .catch(error => {
            Alert.alert('Message', 'Please turn on the location via settings.');
        });
    }

    const getAddress = (latitude, longitude) => {
        setLoading(true);
        let key = 'AIzaSyA8HT0Wz1YiY00OwkitT0f4uv-WxOctlng';
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + key;
        axios.get(url)
        .then(response => {
            let result = response.data;
            let address_components = result.results[0].address_components;
            let formatted_address = result.results[0].formatted_address;
            let country = address_components.find(x => x.types[0] == 'country').long_name;
            let province = address_components.find(x => x.types[0] == 'administrative_area_level_1').long_name;
            let city = address_components.find(x => x.types[0] == 'administrative_area_level_2').long_name;
            setAddress(formatted_address, country, province, city);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    const setAddress = async (address, country, province, city) => {
        let user_id = await AsyncStorage.getItem('user_id');
        let user_token = await AsyncStorage.getItem('user_token');
        let url = BASE_URL + '/api/set-location/' + user_id;
        let headers = {
            'Authorization': user_token
        }
        let body = {
            address, country, province, city
        }
        axios.post(url, body, { headers })
        .then(response => {
            if (response.data.message == 'same location') {
                setAlert({
                   color: '#1BA146',
                   message: t('location_same')
                });
            } else {
                setAlert({
                    color: '#1BA146',
                    message: t('location_changed')
                });
            }
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                colors={[COLOR_PRIMARY]}
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }
        >
            <Spinner visible={loading} />
            {(alert.message != '') && (
                <View style={styles.alert_container}>
                    <Text style={[styles.alert_text, {color: alert.color}]}>{alert.message}</Text>
                </View>
            )}
            {/* <View style={styles.option}>                
                <View style={styles.main_menu}>
                    <Image source={MoneyIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('coins_text')}</Text>
                </View>
                <View style={styles.coming_soon_container}>
                    <Text style={styles.coming_coon_text}>{t('comming_soon_text')}</Text>
                </View>
            </View>
            <View style={styles.option}>
                <View style={styles.main_menu}>
                    <Image source={ShopIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('shop_text')}</Text>
                </View>
                <View style={styles.coming_soon_container}>
                    <Text style={styles.coming_coon_text}>{t('comming_soon_text')}</Text>
                </View>
            </View>
            <View style={styles.option}>
                <View style={styles.main_menu}>
                    <Image source={SuggestionIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('sugestion_text')}</Text>
                </View>
                <View style={styles.coming_soon_container}>
                    <Text style={styles.coming_coon_text}>{t('comming_soon_text')}</Text>
                </View>
            </View>
            <View style={styles.option}>
                <View style={styles.main_menu}>
                    <Image source={HelpIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('help_text')}</Text>
                </View>
                <View style={styles.coming_soon_container}>
                    <Text style={styles.coming_coon_text}>{t('comming_soon_text')}</Text>
                </View>
            </View>
            <View style={styles.option}>
                <View style={styles.main_menu}>
                    <Image source={SettingIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('setting_text')}</Text>
                </View>
                <View style={styles.coming_soon_container}>
                    <Text style={styles.coming_coon_text}>{t('comming_soon_text')}</Text>
                </View>
            </View>
            <View style={styles.option}>
                <View style={styles.main_menu}>
                    <Image source={ActivityIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('activity_text')}</Text>
                </View>
                <View style={styles.coming_soon_container}>
                    <Text style={styles.coming_coon_text}>{t('comming_soon_text')}</Text>
                </View>
            </View> */}
            <TouchableOpacity activeOpacity={1} style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
                <View style={styles.main_menu}>
                    <Image source={ChangePassword} style={styles.icon}/>
                    <Text style={styles.text}>{t('change_password_text')}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.option} onPress={() => getLocation()}>
                <View style={styles.main_menu}>
                    <Image source={LocationIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('set_location_text')}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.option} onPress={() => signOut()}>
                <View style={styles.main_menu}>
                    <Image source={SignOutIcon} style={styles.icon}/>
                    <Text style={styles.text}>{t('sign_out_text')}</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    alert_container: {
        marginVertical: WINDOW_WIDTH * 0.025,
    },
    alert_text: {
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.03,
        textAlign: 'center'
    },
    option: {
        paddingVertical: WINDOW_WIDTH * 0.025,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignItems: 'center'
    },
    main_menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        marginRight: 15
    },
    text: {
        color: '#788389',
        textTransform: 'capitalize',
        fontFamily: 'Roboto-Light',
        fontSize: WINDOW_WIDTH * 0.035
    },
    coming_soon_container: {
        backgroundColor: '#FFCC00',
        paddingHorizontal: WINDOW_WIDTH * 0.01,
        alignItems: 'center',
        borderRadius: WINDOW_WIDTH * 0.25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    coming_coon_text: {
        textTransform: 'lowercase',
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.025,
        color: '#FFFFFF'
    }
})
