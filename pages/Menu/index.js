import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { AppState, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { List, Profile } from '../../components/Menu';
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase';

const Menu = ({ route, navigation }) => {
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

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
    }, [route.params]);

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
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <Profile
                    firstOpened={firstOpened}
                    refreshing={refreshing}
                    navigation={navigation}
                />
                <List
                    refreshing={refreshing}
                    flashMessage={route.params}
                    navigation={navigation}
                    onRefresh={onRefresh}
                />
            </SafeAreaView>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
