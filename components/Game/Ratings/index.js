import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import OptionsMenu from 'react-native-option-menu';
import { BASE_URL, WINDOW_WIDTH } from '../../../utils/constant';
import { ExampleAvatarImage } from '../../../assets/Images/Profile'
import { OtherIcon } from '../../../assets/Icons/Game';
import { t } from 'i18next';

const Ratings = ({ id, firstOpened, refreshing, changeRatings, changeRequestStatus, navigation }) => {
    const [userId, setUserId] = useState('');
    const [myRatingId, setMyRatingId] = useState('');
    const [ratings, setRatings] = useState(0);
    const [giveRatings, setGiveRatings] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [description, setDescription] = useState('');
    const [ratingCount, setRatingCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if ((firstOpened) || (refreshing)) {
            clearState();
            getRatings();
        }
    }, [id, firstOpened, refreshing]);

    const ratingCompleted = (rating) => {
        setRatings(rating);
    }

    const onSend = () => {
        if (ratings <= 0) {
            setError(t('rating_required_validation'));
        } else {
            if (editStatus == false) {
                saveRatings();
            } else {
                updateRatings();
            }
        }
    }

    const clearState = () => {
        setGiveRatings(false);
        setError('');
        setRatings(0);
        setDescription('');
    }

    const getRatings = async () => {
        changeRequestStatus('ratings', true);
        setComments([]);
        setRatingCount(0);
        setUserId('');
        setMyRatingId('');
        let url = BASE_URL + '/api/rating/lists/' + id;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
            .then(async (response) => {
                let comments = response.data.komentar;
                let user_id = await AsyncStorage.getItem('user_id');
                let give_rating = comments.find(item => item.idprofil == user_id);
                if (give_rating) {
                    let index = comments.findIndex(item => item.idprofil == user_id);
                    Array.prototype.move = function (from, to) {
                        this.splice(to, 0, this.splice(from, 1)[0]);
                        return this;
                    };
                    comments.move(index, 0);
                    setGiveRatings(true);
                    setMyRatingId(give_rating.id);
                }
                setUserId(user_id);
                setComments(comments);
                setRatingCount(response.data.jumlah);
                changeRatings(response.data.bintang);
                changeRequestStatus('ratings', false);
            })
            .catch(error => {
                changeRequestStatus('ratings', false);
                Alert.alert('Error', error.message);
            });
    }

    const saveRatings = async () => {
        changeRequestStatus('ratings', true);
        let url = BASE_URL + '/api/rating/store';
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        let body = {
            idprofil: await AsyncStorage.getItem('user_id'),
            idgame: id,
            bintang: ratings,
            komentar: description
        }
        axios.post(url, body, { headers })
            .then(() => {
                setGiveRatings(true);
                getRatings();
                changeRequestStatus('ratings', false);
            })
            .catch(error => {
                changeRequestStatus('ratings', false);
                Alert.alert('Error', error.message);
            });
    }

    const editRating = () => {
        let any_comments = comments.filter(x => x.id != myRatingId);
        let my_comment = comments.find(x => x.id == myRatingId);
        setRatings(my_comment.bintang);
        (my_comment.komentar == null) ? setDescription('') : setDescription(my_comment.komentar);
        setComments(any_comments);
        setGiveRatings(false);
        setEditStatus(true);
    }

    const updateRatings = async () => {
        changeRequestStatus('ratings', true);
        let url = BASE_URL + '/api/rating/update/' + myRatingId;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        let body = {
            idprofil: await AsyncStorage.getItem('user_id'),
            idgame: id,
            bintang: ratings,
            komentar: description
        }
        axios.post(url, body, { headers })
            .then(() => {
                setGiveRatings(true);
                setEditStatus(false);
                setRatings(0);
                setDescription('');
                getRatings();
                changeRequestStatus('ratings', false);
            })
            .catch(error => {
                setEditStatus(false);
                changeRequestStatus('ratings', false);
                Alert.alert('Error', error.message);
            });
    }

    const deleteRating = async () => {
        changeRequestStatus('ratings', true);
        let url = BASE_URL + '/api/rating/delete/' + myRatingId;
        let headers = {
            'Authorization': await AsyncStorage.getItem('user_token')
        }
        axios.get(url, { headers })
            .then(() => {
                setGiveRatings(false);
                clearState();
                getRatings();
                changeRequestStatus('ratings', false);
            })
            .catch(error => {
                changeRequestStatus('ratings', false);
                Alert.alert('Error', error.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('reviews_text')}</Text>
            {(!giveRatings) && (
                <View>
                    <AirbnbRating
                        showRating={false}
                        size={WINDOW_WIDTH * 0.045}
                        selectedColor={'#FFCC00'}
                        onFinishRating={ratingCompleted}
                        defaultRating={ratings}
                    />
                    <TextInput
                        style={styles.text_input}
                        value={description}
                        maxLength={150}
                        onChangeText={setDescription}
                        placeholder={t('optional_description_placeholder')}
                        placeholderTextColor='#788389'
                    />
                    <Text style={styles.text_input_limit}>{description.length + '/150'}</Text>
                    {(error != '') && (
                        <Text style={styles.error_message}>{error}</Text>
                    )}
                    <View style={styles.action_container}>
                        <TouchableOpacity activeOpacity={1} onPress={() => onSend()}>
                            <View style={styles.action_button_container}>
                                <Text style={styles.action_send}>{t('submit_button')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {comments.map(item => (
                <View key={item.id} style={styles.rating_container}>
                    <View style={styles.rating_profile_container}>
                        <View style={styles.rating_profile_sub_container}>
                            <Image source={{ uri: BASE_URL + '/storage/profil/' + item.profile.photo }} style={styles.rating_avatar}/>
                            <Text style={styles.rating_username}>{item.profile.namalengkap}</Text>
                        </View>
                        {(userId == item.profile.idprofil) && (
                            <View style={styles.rating_more}>
                                <OptionsMenu
                                    button={OtherIcon}
                                    buttonStyle={styles.option_menu}
                                    destructiveIndex={1}
                                    options={[ t('edit_option'), t('delete_option'), t('cancel_option') ]}
                                    actions={[ editRating, deleteRating ]}
                                />
                            </View>
                        )}
                    </View>
                    <View style={styles.rating_profile_star_container}>
                        <AirbnbRating
                            showRating={false}
                            size={WINDOW_WIDTH * 0.025}
                            selectedColor={'#FFCC00'}
                            isDisabled={true}
                            defaultRating={item.bintang}
                        />
                        <Text style={styles.rating_creatred_at}>{new Date(Date.parse(item.created_at)).toLocaleDateString('pt-PT')}</Text>
                    </View>
                    {(item.komentar != null) && (
                        <View style={styles.rating_comments_container}>
                            <Text style={styles.rating_comments}>{item.komentar}</Text>
                        </View>
                    )}
                </View>
            ))}
            {(ratingCount > 3) && (
                <View style={styles.show_more_container}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('GameReview', { game_id: id })}>
                        <Text style={styles.show_more_text}>{t('show_more_button') + ' ' + '(' + ratingCount + ')'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default Ratings

const styles = StyleSheet.create({
    container: {
        marginTop: WINDOW_WIDTH * 0.035,
        paddingHorizontal: WINDOW_WIDTH * 0.03,
        paddingBottom: WINDOW_WIDTH * 0.03,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.04,
        marginBottom: WINDOW_WIDTH * 0.025
    },
    text_input: {
        backgroundColor: '#ECECEC',
        fontFamily: 'Roboto-Medium',
        borderRadius: WINDOW_WIDTH * 0.02,
        padding: WINDOW_WIDTH * 0.025,
        color: '#788389',
        marginTop: WINDOW_WIDTH * 0.035
    },
    text_input_limit: {
        color: '#788389',
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.025,
        alignSelf: 'flex-end'
    },
    action_container: {
        alignItems: 'center'
    },
    action_button_container: {
        borderColor: '#008000',
        paddingVertical: WINDOW_WIDTH * 0.005,
        paddingHorizontal: WINDOW_WIDTH * 0.1,
        borderWidth: WINDOW_WIDTH * 0.0025,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WINDOW_WIDTH * 0.05
    },
    action_send: {
        fontFamily: 'Poppins-Bold',
        color: '#008000',
        fontSize: WINDOW_WIDTH * 0.03,
    },
    error_message: {
        color: '#eb3131',
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.025,
        marginTop: WINDOW_WIDTH * 0.015
    },
    rating_container: {
        marginVertical: WINDOW_WIDTH * 0.05,
        borderBottomWidth: WINDOW_WIDTH * 0.001,
        borderBottomColor: '#C0C0C0'
    },
    rating_profile_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rating_profile_sub_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.005
    },
    rating_avatar: {
        width: WINDOW_WIDTH * 0.1,
        height: WINDOW_WIDTH * 0.1,
        borderRadius: (WINDOW_WIDTH * 0.1) / 2,
        marginRight: WINDOW_WIDTH * 0.025,
        overflow: 'hidden',
        borderWidth: WINDOW_WIDTH * 0.005,
        borderColor: '#C0C0C0'
    },
    rating_username: {
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.035
    },
    rating_more: {
        
    },
    option_menu: {
        height: WINDOW_WIDTH * 0.04,
        resizeMode: 'contain',
        transform: [{ rotate: '90deg'}],
        padding: WINDOW_WIDTH * 0.027
    },
    rating_profile_star_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.005
    },
    rating_creatred_at: {
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.025
    },
    rating_comments_container: {
        marginBottom: WINDOW_WIDTH * 0.01
    },
    rating_comments: {
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    },
    show_more_container: {
        alignItems: 'center',
        marginTop: WINDOW_WIDTH * 0.025
    },
    show_more_text: {
        textTransform: 'lowercase',
        fontFamily: 'Poppins-Medium',
        fontSize: WINDOW_WIDTH * 0.03
    }
});
