import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { PointIcon, ThemeIcon } from '../../../assets/Icons/Learning';
import { BASE_URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';

const List = () => {
    const [loading, setLoading] = useState(false);
    const [learning, setLearning] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getLearning();
    }, []);

    const getLearning = async () => {
        setLoading(true);
        let user_id = await AsyncStorage.getItem('user_id');
        let url = BASE_URL + '/api/get-data-learning/' + user_id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
        .then(response => {
            (response.data.length > 0) ? setLearning(response.data.slice(0, 3)) : false;
            let total = (response.data.length > 0) ? response.data.reduce((accum, item) => accum + item.nilai, 0) : 0;
            setTotal(total);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Error', error.message);
        });
    }

    return (
        <View style={styles.main_container}>
            <Spinner visible={loading} />
            <View style={styles.container}>
                <Text style={styles.total}>{total}</Text>
                <View style={styles.icon_container}>
                    <Image source={ThemeIcon} style={styles.icon} />
                    <Image source={PointIcon} style={styles.icon} />
                </View>
                <View style={styles.lists_container}>
                    {(learning.length > 0) && (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={false}
                        >
                            {learning.map(item => (
                                <View style={styles.point_container} key={item.idpembelajaran}>
                                    <Text style={styles.point_text}>{item.dptema}</Text>
                                    <Text style={styles.point_value}>{item.nilai}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                    {(learning.length <= 0) && (
                        <Text style={styles.alert}>Data not available.</Text>
                    )}
                </View>
            </View>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    refresh_icon: {
        position: 'absolute'
    },
    main_container: {
        backgroundColor: '#ECF1F4',
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: WINDOW_WIDTH * 0.05,
        borderTopRightRadius: WINDOW_WIDTH * 0.05,
        padding: WINDOW_WIDTH * 0.05,
        alignItems: 'center'
    },
    total: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.065,
        marginBottom: WINDOW_WIDTH * 0.045
    },
    icon_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: WINDOW_WIDTH * 0.035
    },
    icon: {
        width: WINDOW_WIDTH * 0.055,
        height: WINDOW_WIDTH * 0.055,
    },
    lists_container: {
        height: WINDOW_HEIGHT * 0.623,
        justifyContent: 'center'
    },
    point_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    point_text: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
        flex: 8,
        textAlign: 'left'
    },
    point_value: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
        flex: 1,
        textAlign: 'right'
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.015,
    }
})
