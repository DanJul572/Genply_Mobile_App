import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { TopBar, Form } from '../../components/GoogleRegister'
import { STATUS_BAR_HEIGHT, WINDOW_WIDTH } from '../../utils/constant'

const GoogleRegister = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Form
                        navigation={navigation}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default GoogleRegister

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
