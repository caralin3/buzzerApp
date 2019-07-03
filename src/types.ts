import { PlaybackSource } from 'expo-av/build/AV';

export type ColorTypes =
  | 'black'
  | 'blue'
  | 'darkGray'
  | 'gray'
  | 'green'
  | 'lightBlue'
  | 'lightGray'
  | 'lightGreen'
  | 'lightPink'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'yellow';

export type BuzzerColor = {
  [key in ColorTypes]: string[];
};

export interface Buzzer {
  color?: BuzzerColor;
  disabled: boolean;
  id: number;
  name?: string;
  sound: PlaybackSource;
}
