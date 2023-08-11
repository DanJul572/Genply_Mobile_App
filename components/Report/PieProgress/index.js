import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card } from 'react-native-shadow-cards'
import * as Progress from 'react-native-progress';
import { DetailIcon } from '../../../assets/Icons/Report'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'

const PieProgress = () => {
    return (
        <View style={styles.container}>
            <Card style={styles.card_container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>Progress</Text>
                    <Image source={DetailIcon} style={styles.header_icon} />
                </View>
                <View style={styles.body}>
                    <View style={styles.body_container}>
                        <Progress.Pie
                        progress={0.4}
                        size={WINDOW_WIDTH * 0.25}
                        color={'#FFA4A4'}
                        unfilledColor={'#EFEFEF'}
                        borderColor={'transparent'}/>
                    </View>
                    <View style={styles.body_container}>
                        <Progress.Pie
                        progress={0.8}
                        size={WINDOW_WIDTH * 0.25}
                        color={'#6CFF61'}
                        unfilledColor={'#EFEFEF'}
                        borderColor={'transparent'}/>
                    </View>
                    <View style={styles.body_container}>
                        <Progress.Pie
                        progress={0.55}
                        size={WINDOW_WIDTH * 0.25}
                        color={'#85EAFF'}
                        unfilledColor={'#EFEFEF'}
                        borderColor={'transparent'}/>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default PieProgress

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: WINDOW_WIDTH * 0.035
    },
    card_container: {
        padding: WINDOW_WIDTH * 0.02,
        borderRadius:  WINDOW_WIDTH * 0.025
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header_text: {
        fontFamily: 'Oswald-Regular',
        fontSize: WINDOW_WIDTH * 0.045,
        marginBottom: WINDOW_WIDTH * 0.035
    },
    header_icon: {
        width: WINDOW_WIDTH * 0.1,
        height: WINDOW_HEIGHT * 0.03
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body_container: {
        marginBottom: WINDOW_WIDTH * 0.025,
    }
})
