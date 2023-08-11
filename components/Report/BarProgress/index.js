import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-shadow-cards'
import * as Progress from 'react-native-progress';
import { DetailIcon } from '../../../assets/Icons/Report'
import { BASE_URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const BarProgress = ({ navigation, firstOpened, refreshing, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [learning, setLearning] = useState([]);

    useEffect(() => {
        if ((firstOpened) || (refreshing)) getLearning();
    }, [firstOpened, refreshing]);

    const getLearning = async () => {
        changeRequestStatus('bar_progress', true);
        setLearning([]);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-data-learning/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(response => {
            (response.data.length > 0) ? setLearning(response.data.slice(0, 3)) : false;
            changeRequestStatus('bar_progress', false);
        })
        .catch(error => {
            changeRequestStatus('bar_progress', false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.card_container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>{t('report_text')}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Learning')}>
                        <Image source={DetailIcon} style={styles.header_icon} />
                    </TouchableOpacity>
                </View>
                {(learning.length > 0) && (
                    <View>
                        {(learning[0]) && (
                            <View style={styles.body_container}>
                                <View style={styles.body_text_container}>
                                    <Text style={styles.body_text}>{learning[0].dptema}</Text>
                                    <Text style={styles.body_text}>{learning[0].nilai}</Text>
                                </View>
                                <Progress.Bar
                                    progress={(learning[0].nilai) / 100}
                                    width={null}
                                    height={WINDOW_HEIGHT * 0.02}
                                    borderRadius={ WINDOW_WIDTH * 0.05}
                                    color={'#FFB4B4'}
                                    unfilledColor={'#EFEFEF'}
                                    borderColor={'transparent'}
                                />
                            </View>
                        )}
                        {(learning[1]) && (
                            <View style={styles.body_container}>
                                <View style={styles.body_text_container}>
                                    <Text style={styles.body_text}>{learning[1].dptema}</Text>
                                    <Text style={styles.body_text}>{learning[1].nilai}</Text>
                                </View>
                                <Progress.Bar
                                    progress={(learning[1].nilai) / 100}
                                    width={null}
                                    height={WINDOW_HEIGHT * 0.02}
                                    borderRadius={ WINDOW_WIDTH * 0.05}
                                    color={'#7CCEFF'}
                                    unfilledColor={'#EFEFEF'}
                                    borderColor={'transparent'}
                                />
                            </View>
                        )}
                        {(learning[2]) && (
                            <View style={styles.body_container}>
                                <View style={styles.body_text_container}>
                                    <Text style={styles.body_text}>{learning[2].dptema}</Text>
                                    <Text style={styles.body_text}>{learning[2].nilai}</Text>
                                </View>
                                <Progress.Bar
                                    progress={(learning[2].nilai) / 100}
                                    width={null}
                                    height={WINDOW_HEIGHT * 0.02}
                                    borderRadius={ WINDOW_WIDTH * 0.05}
                                    color={'#7DFF86'}
                                    unfilledColor={'#EFEFEF'}
                                    borderColor={'transparent'}
                                />
                            </View>
                        )}
                    </View>
                )}
                {(learning.length <= 0) && (
                    <Text style={styles.alert}>{t('empty_data_alert')}</Text>
                )}
            </View>
        </View>
    )
}

export default BarProgress

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: WINDOW_WIDTH * 0.035
    },
    card_container: {
        width: WINDOW_WIDTH * 0.85,
        backgroundColor: '#FFFFFF',
        padding: WINDOW_WIDTH * 0.02,
        borderRadius:  WINDOW_WIDTH * 0.025,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header_text: {
        fontFamily: 'Oswald-Regular',
        fontSize: WINDOW_WIDTH * 0.045,
        marginBottom: WINDOW_WIDTH * 0.035
    },
    header_icon: {
        width: WINDOW_WIDTH * 0.1,
        height: WINDOW_HEIGHT * 0.03
    },
    body_container: {
        marginBottom: WINDOW_WIDTH * 0.025
    },
    body_text_container: {
        marginBottom: WINDOW_WIDTH * 0.01,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body_text: {
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        alignSelf: 'center',
        margin: WINDOW_WIDTH * 0.035
    },
})
