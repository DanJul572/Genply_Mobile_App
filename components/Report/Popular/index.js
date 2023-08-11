import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { DetailIcon, Trophies1Icon, Trophies2Icon, Trophies3Icon } from '../../../assets/Icons/Report';
import { ExampleAvatarImage } from '../../../assets/Images/Report';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant';

const Popular = ({ navigation }) => {
    const [players, setPlayers] = useState([]);

    return (
        <View style={styles.container}>
            <Card style={styles.card_container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>Most popular player</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('PopularPlayer')}>
                        <Image source={DetailIcon} style={styles.header_icon} />
                    </TouchableOpacity>
                </View>
                {(players.length == 0) && (
                    <Text style={styles.alert}>Data not available.</Text>
                )}
                {(players.length > 0) && (
                    <View style={styles.body}>
                        <View style={styles.player_container}>
                            <View style={[styles.player_trophy_background, styles.player_trophy_background_2]}>
                                <Image source={Trophies2Icon} style={styles.player_trophy} />
                            </View>
                            <Image source={ExampleAvatarImage} style={styles.player_avatar} />
                            <View style={[styles.player_background, styles.player_background_2]}>
                                <Text style={styles.player_score}>1500</Text>
                            </View>
                        </View>
                        <View style={styles.player_container}>
                            <View style={[styles.player_trophy_background, styles.player_trophy_background_1]}>
                                <Image source={Trophies1Icon} style={styles.player_trophy} />
                            </View>
                            <Image source={ExampleAvatarImage} style={styles.player_avatar} />
                            <View style={[styles.player_background, styles.player_background_1]}>
                                <Text style={styles.player_score}>2000</Text>
                            </View>
                        </View>
                        <View style={styles.player_container}>
                            <View style={[styles.player_trophy_background, styles.player_trophy_background_3]}>
                                <Image source={Trophies3Icon} style={styles.player_trophy} />
                            </View>
                            <Image source={ExampleAvatarImage} style={styles.player_avatar} />
                            <View style={[styles.player_background, styles.player_background_3]}>
                                <Text style={styles.player_score}>1000</Text>
                            </View>
                        </View>
                    </View>
                )}
            </Card>
        </View>
    )
}

export default Popular

const styles = StyleSheet.create({
    container: {
        marginBottom: WINDOW_WIDTH * 0.035,
        alignItems: 'center'
    },
    card_container: {
        padding: WINDOW_WIDTH * 0.02,
        borderRadius:  WINDOW_WIDTH * 0.025,
        width: WINDOW_WIDTH * 0.85,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header_text: {
        fontSize: WINDOW_WIDTH * 0.045,
        marginBottom: WINDOW_WIDTH * 0.035,
        fontFamily: 'Oswald-Regular'
    },
    header_icon: {
        width: WINDOW_WIDTH * 0.1,
        height: WINDOW_HEIGHT * 0.03
    },
    alert: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.035,
        alignSelf: 'center',
        margin: WINDOW_WIDTH * 0.035
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    body_container: {
        marginBottom: WINDOW_WIDTH * 0.025
    },
    player_container: {
        flex: 1,
        width: WINDOW_WIDTH * 0.2,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    player_trophy_background: {
        width: WINDOW_WIDTH * 0.06,
        height: WINDOW_WIDTH * 0.06,
        borderRadius: (WINDOW_WIDTH * 0.06) / 2,
        marginBottom: WINDOW_WIDTH * 0.035,
        marginLeft: WINDOW_WIDTH * 0.14,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3
    },
    player_trophy_background_1: {
        backgroundColor: '#FFD83B'
    },
    player_trophy_background_2: {
        backgroundColor: '#64FF64'
    },
    player_trophy_background_3: {
        backgroundColor: '#00DCFF'
    },
    player_trophy: {
        width: WINDOW_WIDTH * 0.055,
        height: WINDOW_WIDTH * 0.055
    },
    player_background: {
        width: WINDOW_WIDTH * 0.2,
        height: WINDOW_WIDTH * 0.2,
        borderRadius:  WINDOW_WIDTH * 0.025,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: WINDOW_WIDTH * 0.02
    },
    player_background_1: {
        backgroundColor: '#FFD83B'
    },
    player_background_2: {
        backgroundColor: '#64FF64'
    },
    player_background_3: {
        backgroundColor: '#00DCFF'
    },
    player_avatar: {
        width: WINDOW_WIDTH * 0.17,
        height: WINDOW_WIDTH * 0.17,
        top: WINDOW_WIDTH * 0.025,
        position: 'absolute',
        overflow: 'hidden',
        borderRadius:  WINDOW_WIDTH * 0.03,
        zIndex: 2
    },
    player_score: {
        fontFamily: 'Roboto-Medium',
        fontSize:  WINDOW_WIDTH * 0.045,
    }
})
