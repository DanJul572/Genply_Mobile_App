import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { TopOneIcon, TopThreeIcon, TopTwoIcon } from '../../../assets/Icons/Leaderboard';
import { ExampleAvatarImage } from '../../../assets/Images/PopularPlayer';
import { WINDOW_WIDTH } from '../../../utils/constant';

const TopPlayer = ({ topPlayer }) => {
    return (
        <View style={styles.container}>
            {(topPlayer.length > 0) && (
                <View>
                    <View style={styles.avatar_container}>
                        <View>
                            <Image style={styles.trophy} source={TopTwoIcon} />
                            <Image style={styles.avatar_two} source={ExampleAvatarImage} />
                        </View>
                        <View style={styles.trophy_one_container}>
                            <Image style={styles.trophy_one} source={TopOneIcon} />
                            <Image style={styles.avatar_one} source={ExampleAvatarImage} />
                        </View>
                        <View> 
                            <Image style={styles.trophy} source={TopThreeIcon} />
                            <Image style={styles.avatar_three} source={ExampleAvatarImage} />
                        </View>
                    </View>
                    <View style={styles.point_container}>
                        <View>
                            <LinearGradient colors={['#81F294', '#57E16E']} style={[styles.point, styles.point_two]}>
                                <Text style={styles.name_text}>Player 2</Text>
                                <Text style={styles.point_text}>500</Text>
                            </LinearGradient>
                        </View>
                        <View style={styles.point_one_container}>
                            <LinearGradient colors={['#FFDE2C', '#FFD700']} style={[styles.point, styles.point_one]}>
                                <Text style={styles.name_text}>Player 1</Text>
                                <Text style={styles.point_text}>1500</Text>
                            </LinearGradient>
                        </View>
                        <View>
                            <LinearGradient colors={['#46D3FF', '#46D3FF']} style={[styles.point, styles.point_three]}>
                                <Text style={styles.name_text}>Player 3</Text>
                                <Text style={styles.point_text}>1400</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            )}
            {(topPlayer.length <= 0) && (
                <Text style={styles.alert}>
                    Data not available.
                </Text>
            )}
        </View>
    )
}

export default TopPlayer

const styles = StyleSheet.create({
    container: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#35BEE9',
    },
    avatar_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: WINDOW_WIDTH * 0.055,
        paddingHorizontal: WINDOW_WIDTH * 0.1,
        flex: 1
    },
    trophy_one_container: {
        marginHorizontal: WINDOW_WIDTH * 0.035
    },
    avatar_one: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        borderRadius: (WINDOW_WIDTH * 0.25) / 2,
        borderWidth: WINDOW_WIDTH * 0.01,
        borderColor: '#FFD700'
    },
    avatar_two: {
        width: WINDOW_WIDTH * 0.2,
        height: WINDOW_WIDTH * 0.2,
        borderRadius: (WINDOW_WIDTH * 0.2) / 2,
        borderWidth: WINDOW_WIDTH * 0.01,
        borderColor: '#57E16E'
    },
    avatar_three: {
        width: WINDOW_WIDTH * 0.2,
        height: WINDOW_WIDTH * 0.2,
        borderRadius: (WINDOW_WIDTH * 0.2) / 2,
        borderWidth: WINDOW_WIDTH * 0.01,
        borderColor: '#46D3FF'
    },
    trophy: {
        position: 'absolute',
        right: 0,
        width: WINDOW_WIDTH * 0.055,
        height: WINDOW_WIDTH * 0.055,
        zIndex: 1,
    },
    trophy_one: {
        position: 'absolute',
        right: 0,
        width: WINDOW_WIDTH * 0.065,
        height: WINDOW_WIDTH * 0.065,
        zIndex: 1
    },
    point_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: WINDOW_WIDTH * 0.1,
        marginTop: WINDOW_WIDTH * 0.015,
        flex: 1
    },
    point_one_container: {
        marginHorizontal: WINDOW_WIDTH * 0.035
    },
    point: {
        borderTopLeftRadius: WINDOW_WIDTH * 0.015,
        borderTopRightRadius: WINDOW_WIDTH * 0.015,
        justifyContent: 'center',
        alignItems: 'center',
        padding: WINDOW_WIDTH * 0.01,
        flex: 1,
    },
    point_one: {
        width: WINDOW_WIDTH * 0.25,
        marginTop: WINDOW_WIDTH * 0.01
    },
    point_two: {
        width: WINDOW_WIDTH * 0.2,
        marginTop: WINDOW_WIDTH * 0.03
    },
    point_three: {
        width: WINDOW_WIDTH * 0.2,
        marginTop: WINDOW_WIDTH * 0.05
    },
    name_text: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        fontSize: WINDOW_WIDTH * 0.035,
        marginBottom: WINDOW_WIDTH * 0.05
    },
    point_text: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        fontSize: WINDOW_WIDTH * 0.045,
    },
    alert: {
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.035,
        fontFamily: 'Roboto-Medium'
    }
})
