import { Dimensions, Platform, StatusBar } from 'react-native';
import * as RNLocalize from "react-native-localize";

export const COLOR_PRIMARY = '#7DDAFE';
export const COLOR_MAIN_BACKGROUND = '#F5FCFF';
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const BASE_URL = 'https://igenply.com';
export const DEVICE = Platform.OS;
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? StatusBar.currentHeight : 0;
export const LOCALIZE = RNLocalize.getLocales()[0].languageCode;