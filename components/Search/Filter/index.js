import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { OtherIcon, SearchIcon } from '../../../assets/Icons/Search';
import { WINDOW_WIDTH, WINDOW_HEIGHT, BASE_URL, HEADERS } from '../../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const Filter = ({ navigation, filter, refreshing, changeKeyword, changeFilter, changeRequestStatus }) => {
    const { t } = useTranslation();

    const [keyword, setKeyword] = useState('');
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        if (refreshing) setKeyword('');
        getGenre();
    }, [refreshing]);

    const getGenre = async () => {
        changeRequestStatus('filter', true);
        setGenre([]);
        let url = BASE_URL + '/api/datagenre';
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers: headers })
        .then(response => {
            setGenre(response.data);
            changeRequestStatus('filter', false);
        })
        .catch(error => {
            changeRequestStatus('filter', false);
            Alert.alert('Error', error.message);
        });
    }

    const buttonActive = filter_button => {
        if (filter_button == filter.value) {
            return {
                backgroundColor: '#209CBC'
            }
        } else {
            return {
                backgroundColor: '#4ACEF1'
            }
        }
    }

    const onFilterButtonPress = filter => {
        setKeyword('');
        changeFilter(filter);
        changeKeyword('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.form_container}>
                <View style={styles.form_sub_container}>
                    <TextInput style = {styles.input}
                    placeholder={t('search_placeholder') + '...'}
                    placeholderTextColor = "#BBBBBB"
                    autoCapitalize = "none"
                    value={keyword}
                    onChangeText={text => setKeyword(text)}/>
                    <TouchableOpacity activeOpacity={1} style={styles.icon_container} onPress={() => changeKeyword(keyword)}>
                        <View style={styles.search_icon_container}>
                            <Image source={SearchIcon} style={styles.search_icon} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.age_filter_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('AdditionalGameFilters')} activeOpacity={1}>
                        <View style={styles.age_filter_icon_container}>
                            <Image source={OtherIcon} style={styles.age_filter_icon} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.filter_container}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.filter_button, buttonActive('all')]}
                        onPress={() => onFilterButtonPress({key: 'default', value: 'all'})}>
                        <Text style={styles.filter_text}>{t('all_button')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.filter_button, buttonActive('installed')]}
                        onPress={() => onFilterButtonPress({key: 'default', value: 'installed'})}>
                        <Text style={styles.filter_text}>{t('installed_button')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.filter_button, buttonActive('updated')]}
                        onPress={() => onFilterButtonPress({key: 'default', value: 'updated'})}>
                        <Text style={styles.filter_text}>{t('update_button')}</Text>
                    </TouchableOpacity>
                    {genre.map(item => (
                        <TouchableOpacity
                            key={item}
                            activeOpacity={1}
                            style={[styles.filter_button, buttonActive(item.toLowerCase())]}
                            onPress={() => onFilterButtonPress({key: 'custom', value: item.toLowerCase()})}>
                            <Text style={styles.filter_text}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    form_container: {
        marginVertical: WINDOW_WIDTH * 0.025,
        marginHorizontal: WINDOW_WIDTH * 0.025,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    form_sub_container: {
        flexDirection: 'row',
        flex: 1
    },
    age_filter_container: {
        marginLeft: WINDOW_WIDTH * 0.025
    },
    age_filter_icon_container: {
        padding: WINDOW_WIDTH * 0.025,
    },
    age_filter_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        resizeMode: 'contain',
    },
    input: {
        flex: 1,
        height: WINDOW_WIDTH * 0.1,
        borderTopLeftRadius: WINDOW_WIDTH * 0.025,
        borderBottomLeftRadius:  WINDOW_WIDTH * 0.025,
        backgroundColor: '#EFEFEF',
        paddingHorizontal: WINDOW_WIDTH * 0.025
    },
    icon_container: {
        borderTopRightRadius: WINDOW_WIDTH * 0.025,
        borderBottomRightRadius:  WINDOW_WIDTH * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    search_icon_container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        padding: WINDOW_WIDTH * 0.02
    },
    search_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05
    },
    filter_container: {
        marginHorizontal: WINDOW_WIDTH * 0.025,
        marginBottom: WINDOW_WIDTH * 0.025,
    },
    filter_button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WINDOW_WIDTH * 0.05,
        padding: WINDOW_WIDTH * 0.005,
        marginRight: WINDOW_WIDTH * 0.015,
        width: WINDOW_WIDTH * 0.25
    },
    filter_text: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Medium',
        textTransform: 'capitalize',
    }
})
