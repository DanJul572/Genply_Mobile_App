import React, { useCallback, useState, useEffect } from 'react'
import { AppState, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import Form from '../../components/EditProfile/Form'
import TopBar from '../../components/EditProfile/TopBar'
import { COLOR_PRIMARY } from '../../utils/constant'
import Spinner from 'react-native-loading-spinner-overlay'
import { useFocusEffect } from '@react-navigation/native'
import { removeOnlineUser, setOnlineUser } from '../../utils/firebase'

const EditProfile = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstOpened, setFirstOpened] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState({
        uri: '',
        name: ''
    });
    const [requestStatus, setRequestStatus] = useState({
        form: false,
        sidebar: false,
    });

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
        if (route.params) changeAvatar(route.params.avatar)
    }, [route.params]);

    const changeLoading = () => {
        if ((requestStatus.form) || (requestStatus.sidebar)) {
            setLoading(true);
        } else if ((!requestStatus.form) && (!requestStatus.sidebar)) {
            setLoading(false);
        }
    }

    const changeRequestStatus = (page, status) => {
        let state = requestStatus;
        state[page] = status;
        setRequestStatus(state);
        changeLoading();
    }

    const changeAvatar = (param) => {
        setSelectedAvatar(param);
    }

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
            <Spinner visible={loading} />
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={[COLOR_PRIMARY]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Form
                        navigation={navigation}
                        firstOpened={firstOpened}
                        refreshing={refreshing}
                        selectedAvatar={selectedAvatar}
                        changeRequestStatus={changeRequestStatus}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
