import React from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { WINDOW_WIDTH, WINDOW_HEIGHT, BASE_URL } from '../../../utils/constant'
import { FlatList } from 'react-native-gesture-handler'

const Preview = ({ screenshots, videos }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={screenshots}
                renderItem={({item, index}) =>
                    <View style={styles.scroll_container}>
                        <View style={styles.preview_container}>
                            <Image source={{ uri: BASE_URL + '/storage/promo/' + item }} style={styles.image} />
                        </View>
                        <View style={styles.preview_container}>
                            <Image source={{ uri: BASE_URL + '/storage/promo/' + videos[index] }} style={styles.image} />
                        </View>
                    </View>
                }
                keyExtractor={item => item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Preview

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: WINDOW_WIDTH * 0.03,
        paddingBottom: WINDOW_WIDTH * 0.03,
        flexDirection: 'row',
    },
    preview_container: {
        marginBottom: WINDOW_WIDTH * 0.01,
        marginRight: WINDOW_WIDTH * 0.025,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: WINDOW_WIDTH * 0.025,
    },
    scroll_container: {
        flexDirection: 'row'
    },
    image: {
        borderRadius: WINDOW_WIDTH * 0.025,
        width: WINDOW_WIDTH * 0.7,
        height:  WINDOW_WIDTH * 0.4,
        resizeMode: 'stretch',
    }
})
