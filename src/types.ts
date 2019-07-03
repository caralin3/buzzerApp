import { PlaybackSource } from 'expo-av/build/AV';

export interface BuzzerColor {
  backgroundColor: string;
  borderColor: string;
  colors: string[];
}

export interface Buzzer {
  color?: BuzzerColor;
  disabled: boolean;
  id: number;
  name?: string;
  sound: PlaybackSource;
}
