import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { rehydrateAction } from './utility';

const NAME = 'SESSION';
const RESET = 'RESET';
const SET_BUZZER_LAYOUT = 'SET_BUZZER_LAYOUT';
const TOGGLE_SOUND = 'TOGGLE_SOUND';
const TOGGLE_TIMER = 'TOGGLE_TIMER';

export interface SessionState {
  buzzerLayout: 'linear' | 'grid';
  sound: boolean;
  timer: boolean;
}

const initialState: SessionState = {
  buzzerLayout: 'grid',
  sound: true,
  timer: false
};

const actionCreator = actionCreatorFactory(NAME);

const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

const setBuzzerLayoutAction = actionCreator<{ layout: 'linear' | 'grid' }>(
  SET_BUZZER_LAYOUT
);

export const setBuzzerLayout = (layout: 'linear' | 'grid') =>
  setBuzzerLayoutAction({ layout });

const toggleSoundAction = actionCreator<{ on: boolean }>(TOGGLE_SOUND);

export const toggleSound = (on: boolean) => toggleSoundAction({ on });

const toggleTimerAction = actionCreator<{ on: boolean }>(TOGGLE_TIMER);

export const toggleTimer = (on: boolean) => toggleTimerAction({ on });

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }))
  .case(setBuzzerLayoutAction, (state, { layout: buzzerLayout }) => ({
    ...state,
    buzzerLayout
  }))
  .case(toggleSoundAction, (state, { on: sound }) => ({
    ...state,
    sound
  }))
  .case(toggleTimerAction, (state, { on: timer }) => ({
    ...state,
    timer
  }));
