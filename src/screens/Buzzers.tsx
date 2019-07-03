import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { BuzzerButton } from '../components';

export interface BuzzersProps {}

export const Buzzers: React.FC<BuzzersProps> = () => {
  return (
    <View style={styles.container}>
      <BuzzerButton />
      <BuzzerButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
    marginVertical: 20,
  },
});
