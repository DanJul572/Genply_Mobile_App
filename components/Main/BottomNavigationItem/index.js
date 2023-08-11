import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { HomeIcon, HomeIconActive, ReportIcon, ReportIconActive, SearchIcon, SearchIconActive } from '../../../assets/Icons/Main'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../utils/constant'

const BottomNavigationItem = ({ onPress, onLongPress, isFocused, label }) => {
    const Icon = () => {
        if (label == 'Home') return isFocused ? <Image source={HomeIconActive} style={styles.icon} /> : <Image source={HomeIcon} style={styles.icon} />
        if (label == 'Report') return isFocused ? <Image source={ReportIconActive} style={styles.icon} /> : <Image source={ReportIcon} style={styles.icon} />
        if (label == 'Search') return isFocused ? <Image source={SearchIconActive} style={styles.icon} /> : <Image source={SearchIcon} style={styles.icon} />
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon />
        </TouchableOpacity>
    );
}

export default BottomNavigationItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    icon: {
        width: WINDOW_WIDTH * 0.075,
        height: WINDOW_WIDTH * 0.075
    },
})
