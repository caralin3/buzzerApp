import React from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export interface BuzzerButtonProps {}

export const BuzzerButton: React.FC<BuzzerButtonProps> = () => {
  const [borderWidth, setBorderWidth] = React.useState(5);

  const colors = {
    0: {
      backgroundColor: '#f00',
      borderColor: '#c71212',
      colors: ['#d11b1b', '#ff0000', '#a11616'] 
    },
    1: {
      backgroundColor: '#f00',
      borderColor: '#c71212',
      colors: ['#d11b1b', '#ff0000', '#a11616']
    }
  }

  return (
    <TouchableWithoutFeedback>
      <LinearGradient
        colors={colors[0].colors}
        style={{
          borderWidth,
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          borderColor: colors[0].borderColor,
          width: Dimensions.get('window').width * 0.5,
          height: Dimensions.get('window').width * 0.5,
          backgroundColor: colors[0].backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 1,
          shadowRadius: 9.11,
          elevation: 14,
        }}
        onTouchStart={() => setBorderWidth(15)}
        onTouchEnd={() => setBorderWidth(5)}
      />
    </TouchableWithoutFeedback>
  )
}
