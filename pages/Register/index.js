import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TopBar, Form } from '../../components/Register'
import { STATUS_BAR_HEIGHT, WINDOW_WIDTH } from '../../utils/constant';


const Register = ({ navigation }) => {
    
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

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
