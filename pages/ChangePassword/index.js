import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { AppState, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TopBar } from '../../components/ChangePassword'
import Form from '../../components/ChangePassword/Form'
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase'

const ChangePassword = ({route, navigation }) => {
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

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                <Form
                    route={route}
                    navigation={navigation}
                />
            </SafeAreaView>
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
