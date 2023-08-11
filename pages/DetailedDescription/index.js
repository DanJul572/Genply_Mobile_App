import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { AppState, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Content, TopBar } from '../../components/DetailedDescription';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const DetailedDescription = ({ route, navigation }) => {
    const [description, setDescription] = useState(route.params.description);

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
        if (Object.keys(description).length <= 0) navigation.goBack();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                <Content
                    description={description}
                />
            </SafeAreaView>
        </View>
    )
}

export default DetailedDescription

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
