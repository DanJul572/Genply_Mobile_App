import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant';
import { useTranslation } from 'react-i18next';

const USername = ({ firstOpened, refreshing, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [player, setPlayer] = useState({
        name: '',
        great: ''
    });

    useEffect(() => {
        if ((firstOpened) || (refreshing)) getPlayer();
    }, [firstOpened, refreshing]);

    const getPlayer = async () => {
        changeRequestStatus('username', true);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-one-user/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token'),
        }
        axios.get(url, { headers })
        .then(response => {
            let great = 0;
            (response.data.nilai == null) ? great = 0 : great = response.data.nilai;
            setPlayer({
                name: response.data.namalengkap,
                great: great
            });
            changeRequestStatus('username', false);
        })
        .catch(error => {
            changeRequestStatus('username', false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View>
            {(Object.keys(player).length > 0) && (
                <View style={styles.container}>
                    <Text style={styles.name}>{player.name}</Text>
                    <Text style={styles.score}>{t('point_text') + ' : ' + player.great}</Text>
                </View>
            )}
        </View>
    )
}

export default USername

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.06,
        marginBottom: WINDOW_WIDTH * 0.05
    },
    score: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.04
    }
})
