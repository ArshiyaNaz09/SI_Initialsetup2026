import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, DeviceEventEmitter, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './src/i18n';
import Stacks from './src/navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { PersistGate } from 'redux-persist/integration/react';
import { thunk } from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import SI_reducer from './src/Redux/reducers/SI_reducer';
import CustomError from './src/Components/modals/CustomeError';
import {
  persistReducer,
  persistStore,
} from 'redux-persist'; /* redux-persist/es/persistReducer */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';
import ForegroundHandler from './src/assets/Helpers/Foreground_Handler';
import {
  requestUserPermission,
  NotificationListner,
  backgroundHandler,
} from './src/assets/Helpers/Pushnotification_Helper';
import { LogBox } from 'react-native';
import wss from './src/assets/Helpers/helpers';
window.navigator.userAgent = 'react-native';
import NavigationService from './src/navigation/NavigationService';
import io from 'socket.io-client';
import firebase from '@react-native-firebase/app';
import { Manager } from 'socket.io-client';
import ImmersiveBars from 'react-native-immersive-bars';
// globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
// import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';

import { registerGlobals } from 'react-native-webrtc';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

registerGlobals();

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const persistConfig = {
  timeout: 1000,
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, SI_reducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

//const store = createStore(SI_reducer, applyMiddleware(thunk))

const App = () => {
  // useEffect(() => {
  //     let unsubscribe: any;

  //     const initApp = async () => {
  //       try {
  //         await initializeSslPinning({
  //           'selfinspection.adafsa.gov.ae': {
  //             includeSubdomains: true,
  //             publicKeyHashes: [
  //               '+R72NI29QtDmkYN/tarTC6K7BOZ/YMUkCJxMSmjcxJw=',
  //               '8Rw90Ej3Ttt8RRkrg+WYDS9n7IS03bk5bjP/UXPtaY8=',
  //             ],
  //           },
  //           'services.adafsa.gov.ae': {
  //             includeSubdomains: true,
  //             publicKeyHashes: [
  //               '+R72NI29QtDmkYN/tarTC6K7BOZ/YMUkCJxMSmjcxJw=',
  //               '8Rw90Ej3Ttt8RRkrg+WYDS9n7IS03bk5bjP/UXPtaY8=',
  //             ],
  //           },
  //         });

  //         console.log('SSL Pinning initialized');

  //         requestUserPermission();
  //         NotificationListner();
  //         backgroundHandler();

  //         unsubscribe = messaging().onMessage(async remoteMessage => {
  //           console.log('FCM Message data', remoteMessage);
  //           NavigationService.navigate('CallScreen', { callData: remoteMessage });
  //         });

  //       } catch (e) {
  //         console.log('SSL Pinning init error:', e);
  //       }
  //     };

  //     initApp();

  //     return () => {
  //       if (unsubscribe) unsubscribe();
  //     };
  //   }, []);

  useEffect(() => {
    console.log('app');

    // const firebaseConfig = {
    //   apiKey: "AIzaSyCP5pjp_3yVugKXKzk1VbGF57-nwhH7vhM",
    //   authDomain: "",
    //   projectId: "self-inspection-4172e",
    //   storageBucket: "self-inspection-4172e.appspot.com",
    //   messagingSenderId: "1234567890",
    //   appId: "1:261698602356:ios:3e397e525359847057d821"
    // };
    // console.log('firebase.apps.length',);
    // console.log('firebase.apps.length', typeof firebase.apps.length);
    // console.log('firebase.apps.length', firebase.apps.length);
    // if (!firebase.apps.length) { // Prevent re-initialization in development
    //   firebase.initializeApp(firebaseConfig);
    // }
    requestUserPermission();
    NotificationListner();
    // ForegroundHandler();
    backgroundHandler();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message data', remoteMessage);
      NavigationService.navigate('CallScreen', { callData: remoteMessage });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView>
      <RootSiblingParent>
        <Provider store={store}>
          <PersistGate /* loading={null}  */ persistor={persistor}>
            <SafeAreaProvider style={styles.container}>
              {/* <Provider store={store}> */}
              <Stacks />
              {/*   </Provider> */}
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, Text, StyleSheet, useColorScheme, View } from 'react-native';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <NewAppScreen templateFileName="App.tsx" />
//       <Text>test</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
