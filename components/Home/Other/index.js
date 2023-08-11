import React from 'react'
import { Card } from 'react-native-shadow-cards'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'
import { ExampleGameImage2 } from '../../../assets/Images/Home'
import {  StarIcon } from '../../../assets/Icons/Home'

const Other = () => {
    return (
        <View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                <Card style={ styles.card }>
                    <Image source={ ExampleGameImage2 } style={styles.image} />
                    <View style={styles.information}>
                        <Text style={styles.game_name}>Boomerang Contenst</Text>
                        <View style={styles.rating}>
                            <Image source={StarIcon} style={styles.rating_icon}/>
                            <Text style={styles.name} style={styles.rating_text}>4/5</Text>
                        </View>
                    </View>
                    <View  style={styles.information2}>
                        <Card style={ styles.category_card }>
                            <Text style={styles.category_text}>Casual</Text>
                        </Card>
                        <Text style={ styles.game_size }>65 MB</Text>
                    </View>
                </Card>
                <Card style={ styles.card }>
                    <Image source={ ExampleGameImage2 } style={styles.image} />
                    <View style={styles.information}>
                        <Text style={styles.game_name}>Boomerang Contenst</Text>
                        <View style={styles.rating}>
                            <Image source={StarIcon} style={styles.rating_icon}/>
                            <Text style={styles.name} style={styles.rating_text}>4/5</Text>
                        </View>
                    </View>
                    <View  style={styles.information2}>
                        <Card style={ styles.category_card }>
                            <Text style={styles.category_text}>Casual</Text>
                        </Card>
                        <Text style={ styles.game_size }>65 MB</Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
}

export default Other

const styles = StyleSheet.create({
    card: {
        padding: WINDOW_WIDTH * 0.01,
        margin: 10,
        width: WINDOW_WIDTH * 0.6,
        height: WINDOW_HEIGHT * 0.2,
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    image: {
        width: '100%',
        height: '60%',
        borderRadius: 5,
    },
    information: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    game_name: {
        fontFamily: 'Roboto-Regular',
        fontSize: WINDOW_WIDTH * 0.03
    },
    rating: {
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    rating_icon: {
        height: WINDOW_WIDTH * 0.03,
        width: WINDOW_WIDTH * 0.03,
        marginRight: 5
    },
    rating_text: {
        color: '#9F9F9F',
        fontFamily: 'Roboto-Light',
        fontSize: WINDOW_WIDTH * 0.03
    },
    information2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    category_card: {
        borderRadius: 5,
        backgroundColor: '#E1E1E1',
        width: '50%',
        padding: WINDOW_WIDTH * 0.01,
        alignItems: 'center',
        justifyContent: 'center'
    },
    category_text: {
        color: '#9E9E9E',
        fontSize: WINDOW_WIDTH * 0.025
    },
    game_size: {
        fontFamily: 'Roboto-Light',
        fontSize:  WINDOW_WIDTH * 0.03
    },
})
