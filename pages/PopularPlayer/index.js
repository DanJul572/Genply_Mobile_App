import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { OtherPlayer, TopBar, TopPlayer } from '../../components/PopularPlayer';
import { STATUS_BAR_HEIGHT, WINDOW_WIDTH } from '../../utils/constant';

const PopularPlayer = ({ navigation }) => {
    const [topPlayer, setTopPlayer] = useState([]);
    const [otherPlayer, setOtherPlayer] = useState([]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={styles.container}>
                <TopBar
                    navigation={navigation}
                />
                <TopPlayer
                    topPlayer={topPlayer}
                />
                <OtherPlayer
                    otherPlayer={otherPlayer}
                />
            </SafeAreaView>
        </View>
    )
}

export default PopularPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
