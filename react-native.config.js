module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './src/assets/fonts',
    './node_modules/react-native-vector-icons/Fonts',
  ],
  dependencies: {
    'react-native-config': {
      // disable auto-linking for Android codegen if you handle it manually
      platforms: {
        android: null,
      },
    },
  },
};