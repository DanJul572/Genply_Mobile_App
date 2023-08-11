import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { BASE_URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';
import { BackIcon } from '../../../assets/Icons/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const Profile = ({ firstOpened, refreshing, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        namalengkap: '',
        email: '',
        kelas: '',
        tingkat: '',
        photo: ''
    });

    useEffect(() => {
        if ((firstOpened) || (refreshing)) getUser();
    }, [firstOpened, refreshing]);

    const getUser = async () => {
        setLoading(true);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-one-user/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token'),
        }
        axios.get(url, { headers })
        .then(response => {
            setUser(response.data);
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
            <View style={styles.top_container}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <View style={styles.top_icon_container}>
                        <Image source={BackIcon} style={styles.top_icon}></Image>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} activeOpacity={1}>
                <View style={styles.avatar_container}>
                    <Image source={{ uri: BASE_URL + '/storage/profil/' + user.photo }} style={styles.avatar}/>
                </View>
            </TouchableOpacity>
            <View style={styles.information_container}>
                <View style={styles.information}>
                    <Text style={styles.information_text}>{user.namalengkap}</Text>
                </View>
            </View>
        </View>
    )
}

export default Profile

const TOP_HEIGHT = WINDOW_HEIGHT * 0.3

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3DC3F7',
        alignItems: 'center',
        borderBottomLeftRadius: WINDOW_WIDTH * 0.05,
        borderBottomRightRadius: WINDOW_WIDTH * 0.05,
        marginBottom: WINDOW_WIDTH * 0.014,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,
        elevation: 3,
    },
    top_container: {
        alignSelf: 'flex-start'
    },
    top_icon_container: {
        padding: WINDOW_WIDTH * 0.03
    },
    top_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
    },
    avatar_container: {
        height: (TOP_HEIGHT) * 0.5,
        width: (TOP_HEIGHT) * 0.5,
        backgroundColor: '#FFFFFF',
        borderRadius: ((TOP_HEIGHT) * 0.5) / 2,
        overflow: 'hidden',
        padding: WINDOW_WIDTH * 0.005,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        flex: 1,
        borderRadius: ((TOP_HEIGHT) * 0.5) / 2,
        width: '100%',
        height: '100%',
    },
    information_container: {
        marginVertical: WINDOW_WIDTH * 0.045
    },
    information: {
        alignItems: 'center'
    },
    icon: {
        width: WINDOW_WIDTH * 0.03,
        height: WINDOW_WIDTH * 0.03,
        marginRight: 10
    },
    information_text: {
        fontFamily: 'Roboto-Medium',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.045
    },
    greate_text: {
        fontFamily: 'Roboto-Light',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.03
    }
})
