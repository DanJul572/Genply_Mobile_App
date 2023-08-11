import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import RenderHtml from 'react-native-render-html'
import { WINDOW_WIDTH } from '../../../utils/constant'

const Content = ({ description }) => {
    const [source] = useState({
        html: description
    });

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content_container}
            >
                <RenderHtml
                    style={styles.title}
                    contentWidth={WINDOW_WIDTH}
                    source={source}
                />
            </ScrollView>
        </View>
    )
}

export default Content

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content_container: {
        flex: 1,
        padding: WINDOW_WIDTH * 0.035
    },
    title: {
        fontSize: WINDOW_WIDTH * 0.05,
        fontFamily: 'Poppins-Medium',
        alignSelf: 'center',
        marginBottom: WINDOW_WIDTH * 0.035
    },
    message: {
        fontSize: WINDOW_WIDTH * 0.035,
        fontFamily: 'Roboto-Regular',
        marginBottom: WINDOW_WIDTH * 0.035
    },
    created_at: {
        fontSize: WINDOW_WIDTH * 0.03,
        fontFamily: 'Poppins-Medium',
        alignSelf: 'flex-end',
        marginTop: WINDOW_WIDTH * 0.03
    }
})
