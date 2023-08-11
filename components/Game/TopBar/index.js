import React from 'react'
import Share from 'react-native-share'
import { Alert, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { BackIcon, ShareIcon } from '../../../assets/Icons/Game'
import { WINDOW_WIDTH } from '../../../utils/constant'

const TopBar = ({ navigation, namagame, play_store, app_store }) => {
    const shareGame = () => {
        let options = {
            message: namagame + '\n\n' + 'Google Play :\n' + play_store + '\n\n' + 'App Store :\n' + app_store
        }
        Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch(() => {
                return;
            });
    }

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <View style={styles.back_container}>
                        <Image source={BackIcon} style={styles.back} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareGame()} activeOpacity={1}>
                    <View style={styles.other_container}>
                        <Image source={ShareIcon} style={styles.other} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    back_container: {
        padding: WINDOW_WIDTH * 0.03,
    },
    back: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        resizeMode: 'contain',
    },
    other_container: {
        padding: WINDOW_WIDTH * 0.03,
    },
    other: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
        resizeMode: 'contain',
    }
})
