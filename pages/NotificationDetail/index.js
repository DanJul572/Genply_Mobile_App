import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { AppState, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { Content, TopBar } from '../../components/DetailNotification';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const NotificationDetail = ({ route, navigation }) => {
    const [notification, setNotification] = useState(route.params.notification);

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
        if (Object.keys(notification).length <= 0) navigation.navigate('Notification');
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                <Content
                    notification={notification}
                />
            </SafeAreaView>
        </View>
    )
}

export default NotificationDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
