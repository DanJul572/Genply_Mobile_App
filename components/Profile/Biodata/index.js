import React from 'react'
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { IdIcon, GradeIcon, LocationIcon, BrithDayIcon, GenderIcon } from '../../../assets/Icons/Profile'
import { COLOR_PRIMARY, WINDOW_WIDTH } from '../../../utils/constant'

const Biodata = ({ user, refreshing, onRefresh }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    colors={[COLOR_PRIMARY]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.item}>
                <Image source={IdIcon} style={styles.icon} />
                <Text style={styles.text}>{user.email}</Text>
            </View>
            <View style={styles.item}>
                <Image source={GradeIcon} style={styles.icon} />
                <Text style={styles.text}>{user.kelas + ' - ' + user.tingkat}</Text>
            </View>
            <View style={styles.item}>
                <Image source={GenderIcon} style={styles.icon} />
                <Text style={styles.text}>{user.jeniskelamin}</Text>
            </View>
            <View style={styles.item}>
                <Image source={BrithDayIcon} style={styles.icon} />
                <Text style={styles.text}>{user.tanggallahir}</Text>
            </View>
            <View style={styles.item}>
                <Image source={LocationIcon} style={styles.icon} />
                <Text style={styles.text}>{user.kota + ', ' + user.provinsi + ', ' + user.country}</Text>
            </View>
        </ScrollView>
    )
}

export default Biodata

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: WINDOW_WIDTH * 0.035,
    },
    item: {
        padding: WINDOW_WIDTH * 0.02,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: WINDOW_WIDTH * 0.05,
        marginTop: WINDOW_WIDTH * 0.005,
    },
    icon: {
        width: '10%',
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05
    },
    text: {
        width: '90%',
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    },
    alert_text: {
        color: '#788389',
        fontFamily: 'Poppins-Bold',
        fontSize: WINDOW_WIDTH * 0.03,
        marginBottom: WINDOW_WIDTH * 0.025,
        textAlign: 'center'
    },
})
