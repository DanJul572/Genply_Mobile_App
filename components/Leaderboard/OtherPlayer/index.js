import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BASE_URL, COLOR_PRIMARY, WINDOW_WIDTH } from '../../../utils/constant';

const OtherPlayer = ({ otherPlayer, refreshing, onRefresh }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {(otherPlayer.length > 0) && (
                <FlatList
                    data={otherPlayer}
                    keyExtractor={item => item.idprofil}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={styles.player_container} key={item.idprofil}>
                            <View style={styles.profile_container}>
                                <Text style={styles.number}>{index + 4}</Text>
                                <View style={styles.avatar_container}>
                                    <Image source={{ uri: BASE_URL + '/storage/profil/' + item.photo }} style={styles.avatar} />
                                </View>
                                <Text style={styles.name}>{item.namalengkap}</Text>
                            </View>
                            <View style={styles.point_container}>
                                <Text style={styles.point}>{item.nilai}</Text>
                            </View>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            colors={[COLOR_PRIMARY]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
            {(otherPlayer.length <= 0) && (
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={[COLOR_PRIMARY]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.alert_container}>
                        <Text style={styles.alert}>{t('empty_data_alert')}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default OtherPlayer

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: WINDOW_WIDTH * 0.03,
        borderTopLeftRadius: WINDOW_WIDTH * 0.05,
        borderTopRightRadius: WINDOW_WIDTH * 0.05,
        flex: 8,
    },
    player_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: WINDOW_WIDTH * 0.025,
        marginHorizontal: WINDOW_WIDTH * 0.05,
        
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
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    point: {
        fontFamily: 'Roboto-Medium',
        fontSize: WINDOW_WIDTH * 0.03,
        color: '#000000',
    },
    alert_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert: {
        color: '#000000',
        fontSize: WINDOW_WIDTH * 0.035,
        fontFamily: 'Roboto-Medium',
    }
})
