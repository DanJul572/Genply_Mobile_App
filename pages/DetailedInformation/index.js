import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, AppState, FlatList, ImageBackground, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card } from 'react-native-shadow-cards';
import { TopBar } from '../../components/DetailedInformation';
import { BASE_URL, COLOR_PRIMARY, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/constant';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const DetailedInformation = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [informations, setInformations] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const stateAction = (state) => {
                if (state == 'active') {
                    setOnlineUser();
                } else if (state == 'background') {
                    removeOnlineUser();
                }
            }
            const currentState = AppState.addEventListener('change', stateAction);
            return () => {
                currentState.remove();
            }
        }, [])
    );

    useEffect(() => {
        setFirstOpened(true);
        if ((firstOpened) || (refreshing)) getInformation();
    }, [firstOpened, refreshing]);

    const getInformation = async () => {
        setLoading(true);
        setInformations([]);
        let url = BASE_URL + '/api/informasi/all';
        let user_token = await AsyncStorage.getItem('user_token');
        let headers = {
            Authorization: user_token
        }
        axios.get(url, { headers })
        .then(response => {
            setInformations(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setFirstOpened(false);
        setRefreshing(true);
        wait(0).then(() => {
            setRefreshing(false);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                {(informations.length > 0) && (
                    <FlatList
                        data={informations}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                colors={[COLOR_PRIMARY]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        renderItem={({ item }) =>
                            <Card style={ styles.card }>
                                <ImageBackground source={{ uri: BASE_URL + '/storage/promo/' + item.gambar }} style={styles.background}/>
                            </Card>
                        }
                    />
                )}
                {(informations.length <= 0) && (
                    <ScrollView
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                colors={[COLOR_PRIMARY]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View style={styles.alert_container}>
                            <Text style={styles.alert}>Data is not avalaible.</Text>
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    )
}

export default DetailedInformation

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1,
    },
    card: {
        margin: WINDOW_WIDTH * 0.015,
        width: WINDOW_WIDTH * 0.95,
        height: WINDOW_HEIGHT * 0.3,
        alignSelf: 'center',
        borderRadius: WINDOW_WIDTH * 0.025,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    alert_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
    }
})
