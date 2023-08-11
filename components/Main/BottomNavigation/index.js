import React from 'react'
import { StyleSheet, View  } from 'react-native'
import { COLOR_PRIMARY, WINDOW_WIDTH } from '../../../utils/constant'
import BottomNavigationItem from '../BottomNavigationItem'

const BottomNavigator = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <BottomNavigationItem
                        key={index}
                        label={label}
                        isFocused={isFocused}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    />
                );
            })}
        </View>
    );
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLOR_PRIMARY,
        justifyContent: 'space-between',
        paddingHorizontal: WINDOW_WIDTH * 0.15,
        paddingBottom: WINDOW_WIDTH * 0.065,
        paddingTop: WINDOW_WIDTH * 0.05,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30
    }
})

