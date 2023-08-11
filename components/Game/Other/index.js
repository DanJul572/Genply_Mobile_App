import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BASE_URL, DEVICE, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const Other = ({id, changeId, firstOpened, refreshing, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [games, setGames] = useState({
        idgame: '',
        namagame: '',
        logo: '',
    });

    useEffect(() => {
        if ((firstOpened) || (refreshing)) lists();
    }, [id, firstOpened, refreshing]);

    const lists = async () => {
        changeRequestStatus('other', true);
        setGames([]);
        let url = BASE_URL + '/api/game/lists' + '?device=' + DEVICE;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(response => {
            setGames(response.data.slice(0, 10));
            changeRequestStatus('other', false);
        })
        .catch(error => {
            changeRequestStatus('other', false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('others_text')}</Text>
            <FlatList
                data={games}
                renderItem={({ item }) =>
                    <TouchableOpacity activeOpacity={1} onPress={() => changeId(item.idgame)}>
                        <View style={styles.game_container}>
                            <Image source={{uri: BASE_URL + '/storage/game/' + item.logo}} style={styles.image} />
                            <Text style={styles.text}>{item.namagame}</Text>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.idgame}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Other

const styles = StyleSheet.create({
    container: {
        padding: WINDOW_HEIGHT * 0.02
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.04,
        marginBottom: WINDOW_WIDTH * 0.015
    },
    game_container: {
        width: WINDOW_WIDTH * 0.25,
        marginRight: WINDOW_WIDTH * 0.03,
        alignItems: 'center'
    },
    image: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        borderRadius: WINDOW_WIDTH * 0.035,
        overflow: 'hidden',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center'
    }
})
