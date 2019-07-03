import { Audio } from 'expo-av';
import { PlaybackSource } from 'expo-av/build/AV';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableWithoutFeedback, View, Animated, Easing } from 'react-native';
import { Layout } from '../constants';

export interface BuzzerButtonProps {
  disabled?: boolean;
  onPress: () => void;
}

export const BuzzerButton: React.FC<BuzzerButtonProps> = ({
  disabled,
  onPress
}) => {
  const [pressed, setPressed] = React.useState(false);
  const [translateValue] = React.useState<Animated.Value>(
    new Animated.Value(0)
  );

  const { height, width } = Layout.window;

  const animateDown = () => {
    if (!pressed) {
      Animated.timing(translateValue, {
        duration: 10,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true
      }).start();
    }
  };

  const animateUp = () => {
    if (!pressed) {
      Animated.timing(translateValue, {
        duration: 100,
        easing: Easing.linear,
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  };

  const color = {
    backgroundColor: '#f00',
    borderColor: '#c71212',
    colors: ['#ff4242', '#ff0000', '#d11b1b', '#a11616']
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
    if (!pressed) {
      await playSound(require('../assets/audio/frog.wav'));
      setPressed(true);
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
          borderRadius: Math.round(width + height) / 2,
          width: width * 0.55,
          height: width * 0.55
        }}
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          <LinearGradient
            colors={color.colors}
            style={{
              alignItems: 'center',
              backgroundColor: color.backgroundColor,
              borderRadius: Math.round(width + height) / 2,
              borderColor: color.borderColor,
              height: width * 0.5,
              justifyContent: 'center',
              width: width * 0.5
            }}
            onTouchStart={animateDown}
            onTouchEnd={animateUp}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
