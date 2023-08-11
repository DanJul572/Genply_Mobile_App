import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { TopBar, Form } from '../../components/AppleRegister';
import { STATUS_BAR_HEIGHT, WINDOW_WIDTH } from '../../utils/constant';

const AppleRegister = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Form
                        apple_id={route.params.apple_id}
                        navigation={navigation}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default AppleRegister

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
    }
)
