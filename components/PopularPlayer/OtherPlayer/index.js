import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ExampleAvatarImage } from '../../../assets/Images/PopularPlayer'
import { WINDOW_WIDTH } from '../../../utils/constant'

const OtherPlayer = ({ otherPlayer }) => {
    return (
        <View style={styles.container}>
            {(otherPlayer.length > 0) && (
                <View style={styles.player_container}>
                    <View style={styles.profile_container}>
                        <Text style={styles.number}>4</Text>
                        <View style={styles.avatar_container}>
                            <Image source={ExampleAvatarImage} style={styles.avatar} />
                        </View>
                        <Text style={styles.name}>Player 4</Text>
                    </View>
                    <View style={styles.point_container}>
                        <Text style={styles.point}>100</Text>
                    </View>
                </View>
            )}
            {(otherPlayer.length <= 0) && (
                <Text style={styles.alert}>
                    Data not available.
                </Text>
            )}
        </View>
    )
}

export default OtherPlayer

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: WINDOW_WIDTH * 0.03,
        paddingTop: WINDOW_WIDTH * 0.03,
        borderTopLeftRadius: WINDOW_WIDTH * 0.05,
        borderTopRightRadius: WINDOW_WIDTH * 0.05,
        flex: 10,
    },
    player_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.025
    },
    profile_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 3
    },
    number: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        color: '#8F8F8F',
        flex: 1
    },
    name: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        color: '#000000',
        flex: 6
    },
    avatar_container: {
        justifyContent: 'center',
        marginHorizontal: WINDOW_WIDTH * 0.035
    },
    avatar: {
        width: WINDOW_WIDTH * 0.1,
        height:  WINDOW_WIDTH * 0.1,
        borderRadius: (WINDOW_WIDTH * 0.1) / 2,
        borderColor: '#D6D6D6',
        borderWidth: WINDOW_WIDTH * 0.005,
    },
    point_container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: WINDOW_WIDTH * 0.01,
        paddingHorizontal: WINDOW_WIDTH * 0.02,
        borderRadius: WINDOW_WIDTH * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    point: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        color: '#000000',
    },
    alert: {
        color: '#000000',
        fontSize: WINDOW_WIDTH * 0.035,
        fontFamily: 'Roboto-Medium',
        alignSelf: 'center',
        top: '50%'
    }
})
