import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { WINDOW_WIDTH } from '../../../utils/constant'

const Content = ({ notification }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content_container}
            >
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.text}</Text>
                <Text style={styles.created_at}>{ new Date(Date.parse(notification.created_at)).toLocaleDateString('pt-PT') }</Text>
            </ScrollView>
        </View>
    )
}

export default Content

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content_container: {
        flex: 1,
        padding: WINDOW_WIDTH * 0.035
    },
    title: {
        color: '#788389',
        fontSize: WINDOW_WIDTH * 0.05,
        fontFamily: 'Poppins-Medium',
        alignSelf: 'center',
        marginBottom: WINDOW_WIDTH * 0.035
    },
    message: {
        color: '#788389',
        fontSize: WINDOW_WIDTH * 0.035,
        fontFamily: 'Roboto-Regular',
        marginBottom: WINDOW_WIDTH * 0.035
    },
    created_at: {
        color: '#788389',
        fontSize: WINDOW_WIDTH * 0.03,
        fontFamily: 'Poppins-Medium',
        alignSelf: 'flex-end',
        marginTop: WINDOW_WIDTH * 0.03
    }
})
