import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { BuzzerButton } from '../components';

export interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [disabled, setDisabled] = React.useState(false);
  const [disabled2, setDisabled2] = React.useState(false);
  return (
    <View style={styles.container}>
      <BuzzerButton out={disabled} onPress={() => setDisabled(true)} />
      <BuzzerButton out={disabled2} onPress={() => setDisabled2(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
    marginVertical: 20
  }
});
