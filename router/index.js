import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigation from '../components/Main/BottomNavigation'
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native'
import { Search, Home, Report, Menu, Profile, Game, Welcome, Login, Leaderboard, PopularPlayer, Learning, Register, EditProfile, ChangePassword, GoogleRegister, Notification, NotificationDetail, GameReview, DetailedDescription, DetailedInformation, AppleRegister, ChoseAvatar, AdditionalGameFilters, LocalLeaderboard } from '../pages'
import { COLOR_MAIN_BACKGROUND } from '../utils/constant'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLOR_MAIN_BACKGROUND
    },
};

const MainApp = () => {
    return (
        <Tab.Navigator initialRouteName='Home' tabBar={props => <BottomNavigation {...props} />}>
            <Tab.Screen name='Search' component={Search} options={{ headerShown: false }} />
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Tab.Screen name='Report' component={Report} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='MainApp' component={MainApp} options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
                <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name='Game' component={Game} options={{ headerShown: false }} />
                <Stack.Screen name='Leaderboard' component={Leaderboard} options={{ headerShown: false }} />
                <Stack.Screen name='PopularPlayer' component={PopularPlayer} options={{ headerShown: false }} />
                <Stack.Screen name='Learning' component={Learning} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name='GoogleRegister' component={GoogleRegister} options={{ headerShown: false }} />
                <Stack.Screen name='Notification' component={Notification} options={{ headerShown: false }} />
                <Stack.Screen name='NotificationDetail' component={NotificationDetail} options={{ headerShown: false }} />
                <Stack.Screen name='GameReview' component={GameReview} options={{ headerShown: false }} />
                <Stack.Screen name='DetailedDescription' component={DetailedDescription} options={{ headerShown: false }} />
                <Stack.Screen name='DetailedInformation' component={DetailedInformation} options={{ headerShown: false }} />
                <Stack.Screen name='AppleRegister' component={AppleRegister} options={{ headerShown: false }} />
                <Stack.Screen name='ChoseAvatar' component={ChoseAvatar} options={{ headerShown: false }} />
                <Stack.Screen name='AdditionalGameFilters' component={AdditionalGameFilters} options={{ headerShown: false }} />
                <Stack.Screen name='LocalLeaderboard' component={LocalLeaderboard} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router