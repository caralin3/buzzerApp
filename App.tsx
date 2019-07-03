import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Buzzers } from './src/screens';

const App = () => {
  return (
    <View style={styles.container}>
      <Buzzers />
    </View>
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
