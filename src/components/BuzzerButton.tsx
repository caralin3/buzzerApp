import { Audio } from 'expo-av';
import { PlaybackSource } from 'expo-av/build/AV';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableWithoutFeedback, View, Animated, Easing } from 'react-native';
import { Layout } from '../constants';
import { BuzzerColor, ColorTypes } from '../types';

export interface BuzzerButtonProps {
  disabled?: boolean;
  color: ColorTypes;
  rotateX?: string;
  onPress: () => void;
}

export const BuzzerButton: React.FC<BuzzerButtonProps> = ({
  color,
  disabled,
  rotateX,
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

  const gradientMap: BuzzerColor = {
    yellow: ['#f1e767', '#feb645'],
    purple: ['#cb60b3', '#de47ac', '#ad1283'],
    lightPink: ['#febbbb', '#fe9090', '#ff5c5c'],
    pink: ['#ff5db1', '#ef017c'],
    orange: ['#ffa84c', '#ff7b0d'],
    lightGreen: ['#c9de96', '#8ab66b', '#398235'],
    lightBlue: ['#87e0fd', '#53cbf1', '#05abe0'],
    blue: ['#7db9e8', '#2989d8', '#207cca', '#1e5799'],
    green: ['#83c783', '#52b152', '#008a00', '#005700'],
    red: ['#ff4242', '#ff0000', '#d11b1b', '#a11616'],
    darkGray: ['#cedce7', '#596a72'],
    gray: ['#fefefe', '#d1d1d1', '#dbdbdb', '#e2e2e2'],
    lightGray: ['#f2f6f8', '#d8e1e7', '#b5c6d0', '#e0eff9'],
    black: [
      '#474747',
      '#2c2c2c',
      '#000000',
      '#4c4c4c',
      '#595959',
      '#666666',
      '#111111',
      '#2b2b2b',
      '#1c1c1c',
      '#131313'
    ]
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
      <LinearGradient
        colors={gradientMap['black']}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Math.round(width + height) / 2,
          height: width * 0.55,
          transform: [{ rotateX: rotateX || '0deg' }],
          width: width * 0.55
        }}
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          <LinearGradient
            colors={gradientMap[color]}
            style={{
              alignItems: 'center',
              backgroundColor: '#f00',
              borderRadius: Math.round(width + height) / 2,
              height: width * 0.5,
              justifyContent: 'center',
              width: width * 0.5
            }}
            onTouchStart={animateDown}
            onTouchEnd={animateUp}
          />
        </Animated.View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};
