import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/database';
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from './constant';

const setOnlineUser = async () => {
    let user_id = await AsyncStorage.getItem('user_id');
    let url = BASE_URL + '/api/get-one-user/' + user_id;
    let headers = {
        'Authorization': await AsyncStorage.getItem('user_token'),
    }
    axios.get(url, { headers })
    .then(response => {
        let user = response.data;
        const reference = firebase.app().database('https://igenply-dev-default-rtdb.asia-southeast1.firebasedatabase.app/');
        reference.ref('users/' + user.idprofil)
        .set({
            id: user.idprofil,
            name: user.namalengkap,
            email: user.email,
            address: user.kota
        });
    })
    .catch(error => {
        Alert.alert('Error', error.message);
    });
}

const removeOnlineUser = async () => {
    let user_id = await AsyncStorage.getItem('user_id');
    const reference = firebase.app().database('https://igenply-dev-default-rtdb.asia-southeast1.firebasedatabase.app/');
    reference.ref('users/' + user_id).remove();
}

export { setOnlineUser, removeOnlineUser }