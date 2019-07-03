import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BuzzerButton } from '../components';

export interface HomeScreenProps {}

export const DisconnectedHomeScreen: React.FC<HomeScreenProps> = () => {
  const [disabled, setDisabled] = React.useState(false);
  const [disabled2, setDisabled2] = React.useState(false);
  return (
    <View style={styles.container}>
      <BuzzerButton disabled={disabled} onPress={() => setDisabled(true)} />
      <BuzzerButton disabled={disabled2} onPress={() => setDisabled2(true)} />
    </View>
  );
};

export const HomeScreen = DisconnectedHomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 20
  }
});
