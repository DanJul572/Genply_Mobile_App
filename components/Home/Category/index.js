import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { Card } from 'react-native-shadow-cards'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'
import { ArcadeIcon, CasualIcon, ShooterIcon, StrategyIcon } from '../../../assets/Icons/Home'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Category = ({ navigation }) => {
    return (
        <View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Search', {filter: {key: 'custom', value: 'arcade'}})}>
                    <View style={styles.category_card}>
                        <ImageBackground source={ArcadeIcon} style={styles.category_background}>
                            <Text style={styles.category_text}>
                                Arcade
                            </Text>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Search', {filter: {key: 'custom', value: 'sport'}})}>
                    <View style={styles.category_card}>
                        <ImageBackground source={CasualIcon} style={styles.category_background}>
                            <Text style={styles.category_text}>
                                Sport
                            </Text>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Search', {filter: {key: 'custom', value: 'action'}})}>
                    <View style={styles.category_card}>
                        <ImageBackground source={ShooterIcon} style={styles.category_background}>
                            <Text style={styles.category_text}>
                                Action
                            </Text>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
                <View style={styles.category_card}>
                    <ImageBackground source={StrategyIcon} style={styles.category_background}>
                        <Text style={styles.category_text}>
                            Strategy
                        </Text>
                    </ImageBackground>
                </View>
            </ScrollView>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    category: {
        flexDirection: 'row',
    },
    category_card: {
        height: WINDOW_HEIGHT * 0.25,
        width: WINDOW_WIDTH * 0.25,
        marginRight: WINDOW_WIDTH * 0.025,
        marginTop: WINDOW_WIDTH * 0.025,
        marginBottom: WINDOW_WIDTH * 0.025,
        borderRadius: WINDOW_WIDTH * 0.025,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    category_background: {
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: WINDOW_WIDTH * 0.025
    },
    category_text: {
        color: '#575757',
        fontFamily: 'Poppins-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    }
})
