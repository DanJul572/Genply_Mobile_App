import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Alert,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LogoIcon } from '../../assets/Icons/Welcome';
import { PascallImage } from '../../assets/Images/Welcome';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/constant';
import { checkUserData } from '../../utils/normal';
import { useTranslation } from 'react-i18next';

const Welcome = ({ navigation }) => {
    const { t } = useTranslation();

    useEffect(() => {
        checkUserData()
            .then(value => {
                if (value) {
                    navigation.navigate('MainApp');
                }
            })
            .catch(error => {
                Alert.alert('Error', error.toString());
            });
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#71D7FF', '#39C7FF', '#00B7FF']} style={styles.background}>
                <Text style={styles.text}>{t('slogan_text')}</Text>
                <Image source={LogoIcon} style={styles.logo} />
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={1}>
                        <View style={styles.button}>
                            <Text style={styles.text_button}>
                                {t('login_button').toUpperCase()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={1}>
                        <View style={styles.button}>
                            <Text style={styles.text_button}>
                            {t('register_button').toUpperCase()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Image source={PascallImage} style={styles.pascall_image} />
            </LinearGradient>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH,
        flex: 1
    },
    background: {
        padding: WINDOW_WIDTH * 0.05,
        alignItems: 'center'
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: WINDOW_WIDTH * 0.045,
        marginBottom: WINDOW_WIDTH * 0.15,
        marginTop: WINDOW_WIDTH * 0.085
    },
    logo: {
        width: WINDOW_WIDTH * 0.27,
        height: WINDOW_WIDTH * 0.255,
        marginBottom: WINDOW_WIDTH * 0.1
    },
    button_container: {
        height: WINDOW_HEIGHT * 0.15,
        justifyContent: 'space-between',
        marginBottom: WINDOW_WIDTH * 0.05
    },
    button: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        width: WINDOW_WIDTH * 0.45,
        padding: WINDOW_WIDTH * 0.025,
        borderRadius: WINDOW_WIDTH * 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    text_button: {
        fontFamily: 'Roboto-Medium',
        color: '#36BFF5',
        fontSize: WINDOW_WIDTH * 0.045
    },
    pascall_image: {
        height: WINDOW_HEIGHT * 0.55,
        resizeMode: 'contain'
    }
})
