import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { isIos } from './src/constants';
import { HomeScreen } from './src/screens';
import { ApplicationState, createStore } from './src/store';

interface AppProps {
  skipLoadingScreen: boolean;
}

const App: React.FC<AppProps> = ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const store: Store<ApplicationState> = createStore();

  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./src/assets/icon.png'),
        require('./src/assets/splash.png')
      ]),
    ]);
  };

  const handleLoadingError = (error: Error) => {
    console.warn(error);
  };

  const handleFinishLoading = (setLoadingComplete: (bool: boolean) => void) => {
    setLoadingComplete(true);
  };

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
          />
        </PersistGate>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <View style={styles.container}>
          {isIos && <StatusBar barStyle="default" />}
          {/* <AppNavigator /> */}
          <HomeScreen />
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
