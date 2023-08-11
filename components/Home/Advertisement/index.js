import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { ExampleAdvertisementImage } from '../../../assets/Images/Home'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'

const Advertisement = () => {
    return (
        <View style={styles.container}>
           <ImageBackground source={ ExampleAdvertisementImage } style={styles.background}>
                <Text style={styles.text}>
                    Advertising Concept
                </Text>
           </ImageBackground>
        </View>
    )
}

export default Advertisement

const styles = StyleSheet.create({
    container: {
        height: WINDOW_HEIGHT * 0.15,
        overflow: 'hidden',
        borderRadius: WINDOW_WIDTH * 0.025,
        marginVertical: WINDOW_WIDTH * 0.025,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'BebasNeue-Regular',
        fontSize: WINDOW_WIDTH * 0.055,
        color: '#FFFFFF'
    },
})
