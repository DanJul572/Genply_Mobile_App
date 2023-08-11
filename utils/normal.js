import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const storeUserData = async (user_id, user_token) => {
    try {
        await AsyncStorage.setItem('user_id', user_id.toString());
        await AsyncStorage.setItem('user_token', user_token.toString());
    } catch (error) {
        Alert.alert('Error', error.message);
    }
}

const checkUserData = async () => {
    try {
        let user_id = await AsyncStorage.getItem('user_id');
        let user_token = await AsyncStorage.getItem('user_token');
        if ((user_id != null) && (user_token != null)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        Alert.alert('Error', error);
    }
}

const removeUserData = async () => {
    try {
        await AsyncStorage.multiRemove(['user_id', 'user_token']);
        await AsyncStorage.clear();
    }
    catch(error) {
        Alert.alert('Error', error);
    }
}

export { storeUserData, checkUserData, removeUserData }