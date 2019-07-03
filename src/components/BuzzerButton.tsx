import { Audio } from 'expo-av';
import { PlaybackSource } from 'expo-av/build/AV';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Animated,
  Easing
} from 'react-native';

export interface BuzzerButtonProps {
  out?: boolean;
  onPress: () => void;
}

export const BuzzerButton: React.FC<BuzzerButtonProps> = ({ out, onPress }) => {
  const [disabled, setDisabled] = React.useState(false);
  const [translateValue] = React.useState<Animated.Value>(
    new Animated.Value(0)
  );

  const animateDown = () => {
    if (!disabled) {
      Animated.timing(translateValue, {
        duration: 10,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true
      }).start();
    }
  };

  const animateUp = () => {
    if (!disabled) {
      Animated.timing(translateValue, {
        duration: 100,
        easing: Easing.linear,
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  };

  const colors = {
    0: {
      backgroundColor: '#f00',
      borderColor: '#c71212',
      colors: ['#ff4242', '#ff0000', '#d11b1b', '#a11616']
    },
    1: {
      backgroundColor: '#f00',
      borderColor: '#c71212',
      colors: ['#d11b1b', '#ff0000', '#a11616']
    }
  };

  const playSound = async (sound: PlaybackSource) => {
    const soundObject: Audio.Sound = new Audio.Sound();
    try {
      await soundObject.loadAsync(sound);
      const { isLoaded } = await soundObject.getStatusAsync();
      if (isLoaded) {
        await soundObject.playAsync();
        onPress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = async () => {
    if (!disabled) {
      await playSound(require('../assets/audio/frog.wav'));
      setDisabled(true);
    }
  };

  const translateY = translateValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-20, -10, -5]
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          borderRadius:
            Math.round(
              Dimensions.get('window').width + Dimensions.get('window').height
            ) / 2,
          width: Dimensions.get('window').width * 0.55,
          height: Dimensions.get('window').width * 0.55
        }}
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          <LinearGradient
            colors={colors[0].colors}
            style={{
              borderRadius:
                Math.round(
                  Dimensions.get('window').width +
                    Dimensions.get('window').height
                ) / 2,
              borderColor: colors[0].borderColor,
              width: Dimensions.get('window').width * 0.5,
              height: Dimensions.get('window').width * 0.5,
              backgroundColor: colors[0].backgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 7
              },
              shadowOpacity: 1,
              shadowRadius: 9.11,
              elevation: 14
            }}
            onTouchStart={animateDown}
            onTouchEnd={animateUp}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
