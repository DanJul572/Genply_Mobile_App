import React, { useEffect } from 'react'
import { ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BASE_URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'
import { BackIcon, EditIcon } from '../../../assets/Icons/Profile'
import { BackgroundImage } from '../../../assets/Images/Profile'

const Avatar = ({ navigation, user, quotes }) => {

    return (
        <View style={styles.container}>
            <ImageBackground source={BackgroundImage} style={styles.background}>
                <View style={styles.top_container}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                        <View style={styles.top_icon_container}>
                            <Image source={BackIcon} style={styles.top_icon}></Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} activeOpacity={1}>
                        <View style={styles.top_icon_container}>
                            <Image source={EditIcon} style={styles.top_icon}></Image>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.main_container}>
                    <View style={styles.avatar_container}>
                        <Image source={{ uri: BASE_URL + '/storage/profil/' + user.photo }} style={styles.avatar}></Image>
                    </View>
                    <View style={styles.text_container}>
                        <Text style={styles.username}>{user.namalengkap}</Text>
                        <Text style={styles.paragraph}>{quotes}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Avatar

const CONTAINER_HEIGHT = WINDOW_HEIGHT * 0.25

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: WINDOW_WIDTH * 0.05,
        borderBottomRightRadius: WINDOW_WIDTH * 0.05,
        overflow: 'hidden',
    },
    background: {
        width: '100%'
    },
    top_container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    top_icon_container: {
        padding: WINDOW_WIDTH * 0.03
    },
    top_icon: {
        width: WINDOW_WIDTH * 0.05,
        height: WINDOW_WIDTH * 0.05,
    },
    main_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: WINDOW_WIDTH * 0.05
    },
    avatar_container: {
        backgroundColor: '#FFFFFF',
        height: CONTAINER_HEIGHT * 0.5,
        width: CONTAINER_HEIGHT * 0.5,
        borderRadius: (CONTAINER_HEIGHT * 0.5) / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: WINDOW_WIDTH * 0.05,
        padding: 3,
    },
    avatar: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: (CONTAINER_HEIGHT * 0.5) / 2,
    },
    text_container: {
        width: WINDOW_WIDTH * 0.6,
    },
    username: {
        marginBottom: WINDOW_WIDTH * 0.025,
        fontFamily: 'Poppins-Medium',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.05
    },
    paragraph: {
        fontFamily: 'Poppins-Light',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.03
    }
})
