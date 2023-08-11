import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { CloseIcon } from '../../../assets/Icons/Search'
import { WINDOW_WIDTH } from '../../../utils/constant'

const Sidebar = ({ toggleOpen, ageArray, changeAgeFilter }) => {
    const [age, setAge] = useState(ageArray[0].value);

    const changeAge = () => {
        changeAgeFilter(age);
        toggleOpen();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sidebar_opacity} />
            <View style={styles.sidebar_content}>
                <View>
                    <View style={styles.sidebar_top}>
                        <TouchableOpacity onPress={toggleOpen} activeOpacity={1}>
                            <Image source={CloseIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.sidebar_top_text}>FILTER</Text>
                    </View>
                    <View style={styles.sidebar_mid}>
                        <Text style={styles.label}>Age (years) : </Text>
                        <RNPickerSelect
                            onValueChange={(value) => setAge(value)}
                            placeholder={{}}
                            style={inputSelect}
                            useNativeAndroidPickerStyle={false}
                            value={age}
                            items={ageArray}
                        />
                    </View>
                </View>
                <View style={styles.sidebar_bothom}>
                    <TouchableOpacity activeOpacity={1} onPress={() => changeAge() }>
                        <View style={styles.action_button_container}>
                            <Text style={styles.action_send}>Apply</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Sidebar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    sidebar_opacity: {
        opacity: 0.5,
        flex: 1,
        backgroundColor: 'black'
    },
    sidebar_content: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        flex: 5,
    },
    sidebar_top: {
        padding: WINDOW_WIDTH * 0.025,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#7DDAFE'
    },
    sidebar_top_text: {
        fontFamily: 'Roboto-Medium',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.035,
    },
    sidebar_mid: {
        marginTop: WINDOW_WIDTH * 0.025,
        padding: WINDOW_WIDTH * 0.025,
    },
    icon: {
        width: WINDOW_WIDTH * 0.035,
        height: WINDOW_WIDTH * 0.035,
        resizeMode: 'contain'
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: '#788389',
        fontSize: WINDOW_WIDTH * 0.03,
        marginBottom: WINDOW_WIDTH * 0.005
    },
    sidebar_bothom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.25
    },
    action_button_container: {
        backgroundColor: '#7DDAFE',
        paddingVertical: WINDOW_WIDTH * 0.005,
        paddingHorizontal: WINDOW_WIDTH * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WINDOW_WIDTH * 0.05,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    action_send: {
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        fontSize: WINDOW_WIDTH * 0.03,
    },
});

const inputSelect = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#ECECEC',
        fontFamily: 'Roboto-Medium',
        borderRadius: WINDOW_WIDTH * 0.02,
        padding: WINDOW_WIDTH * 0.025,
        color: '#788389'
    },
    inputAndroid: {
        backgroundColor: '#ECECEC',
        fontFamily: 'Roboto-Medium',
        borderRadius: WINDOW_WIDTH * 0.02,
        padding: WINDOW_WIDTH * 0.025,
        color: '#788389'
    },
});
