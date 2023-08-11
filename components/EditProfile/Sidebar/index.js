import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-shadow-cards'
import { CloseIcon } from '../../../assets/Icons/EditProfile'
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant'

const Sidebar = ({ firstOpened, refreshing, toggleOpen, changeAvatar, changeRequestStatus }) => {
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        if ((firstOpened) || (refreshing)) getAvatars();
    }, [firstOpened, refreshing,]);

    const avatarSelected = (param) => {
        toggleOpen();
        changeAvatar(param);
    }

    const getAvatars = async () => {
        changeRequestStatus('sidebar', true);
        setAvatars([]);
        let url = BASE_URL + '/api/avatar/all';
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
            .then(response => {
                setAvatars(response.data);
                changeRequestStatus('sidebar', false);
            })
            .catch(error => {
                changeRequestStatus('sidebar', false);
                Alert.alert('Error', error.message);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sidebar_content}>
                <View>
                    <View style={styles.sidebar_top}>
                        <TouchableOpacity onPress={toggleOpen} activeOpacity={1}>
                            <Image source={CloseIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.sidebar_top_text}>AVATAR</Text>
                    </View>
                    <View style={styles.sidebar_mid}>
                        {(avatars.length > 0) && (
                            <View>
                                <FlatList
                                    data={avatars}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity activeOpacity={1} onPress={
                                                () => avatarSelected({ uri: BASE_URL + '/storage/profil/' + item.gambar, name: item.gambar})
                                            }
                                        >
                                            <View style={styles.individu_container}>
                                                <Image source={{ uri: BASE_URL + '/storage/profil/' + item.gambar }} style={styles.game_avatar} />
                                            </View>
                                        </TouchableOpacity>
                                    }
                                    keyExtractor={item => item.id}
                                    numColumns={3}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        )}
                        {(avatars.length <= 0) && (
                            <View style={styles.alert_container}>
                                <Text style={styles.alert_text}>Data is not avalaible.</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Sidebar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar_content: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        flex: 5,
    },
    sidebar_top: {
        padding: WINDOW_WIDTH * 0.035,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#7DDAFE'
    },
    sidebar_top_text: {
        fontFamily: 'Roboto-Medium',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.035,
    },
    sidebar_mid: {
        marginTop: WINDOW_WIDTH * 0.025,
        padding: WINDOW_WIDTH * 0.025,
    },
    individu_container: {
        width: WINDOW_WIDTH * 0.28,
        borderWidth: WINDOW_WIDTH * 0.015,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        marginBottom: WINDOW_WIDTH * 0.035,
        marginHorizontal: WINDOW_WIDTH * 0.018,
        borderRadius: WINDOW_WIDTH * 0.015,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    game_avatar: {
        borderRadius: WINDOW_WIDTH * 0.015,
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    icon: {
        width: WINDOW_WIDTH * 0.035,
        height: WINDOW_WIDTH * 0.035,
        resizeMode: 'contain'
    },
    alert_container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert_text: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
    }
});
