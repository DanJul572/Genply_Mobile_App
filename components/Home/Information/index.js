import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ImageBackground, Alert, FlatList, Text, TouchableOpacity, Image } from 'react-native'
import { Card } from 'react-native-shadow-cards'
import { BASE_URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Information = ({ navigation, firstOpened, refreshing, changeRequestStatus }) => {
    const [informations, setInformations] = useState([]);
    const [informationsCount, setInformationsCount] = useState([]);

    useEffect(() => {
        if ((firstOpened) || (refreshing)) {
            getInformations();
        }
    }, [firstOpened, refreshing]);

    const getInformations = async () => {
        changeRequestStatus('information', true);
        setInformations([]);
        let url = BASE_URL + '/api/informasi/lists?';
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
            .then(response => {
                setInformations(response.data.lists);
                setInformationsCount(response.data.count);
                changeRequestStatus('information', false);
            })
            .catch(error => {
                changeRequestStatus('information', false);
                Alert.alert('Error', error.message);
            });
    }

    return (
        <View>
            {(informations.length > 0) && (
                <View>
                    <FlatList
                        data={informations}
                        renderItem={({ item }) =>
                            <View style={ styles.card }>
                                <Image source={{ uri: BASE_URL + '/storage/promo/' + item.gambar }} style={styles.background}/>
                            </View>
                        }
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    )
}

export default Information

const styles = StyleSheet.create({
    card: {
        marginRight: WINDOW_WIDTH * 0.025,
        marginTop: WINDOW_WIDTH * 0.025,
        borderRadius: WINDOW_WIDTH * 0.025,
        overflow: 'hidden',
        elevation: 0
    },
    background: {
        width: WINDOW_WIDTH * 0.9,
        height:  WINDOW_WIDTH * 0.3,
    },
    show_more_text: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        alignSelf: 'center',
        marginTop: WINDOW_WIDTH * 0.025
    }
})
