import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WINDOW_WIDTH } from '../../../utils/constant'

const Title = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>LIST OF POINT THAT HAVE BEEN OBTAINED</Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECF1F4',
        justifyContent: 'center',
        alignItems: 'center',
        padding: WINDOW_WIDTH * 0.05
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        textAlign: 'center'
    },
})
