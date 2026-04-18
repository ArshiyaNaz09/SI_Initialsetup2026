/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { NativeModules } from 'react-native';

console.log(NativeModules);
AppRegistry.registerComponent(appName, () => App);
