import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { rehydrateAction } from './utility';

const NAME = 'SESSION';
const RESET = 'RESET';
const SET_PLAYERS = 'SET_PLAYERS';
const TOGGLE_SOUND = 'TOGGLE_SOUND';
const TOGGLE_TIMER = 'TOGGLE_TIMER';

export interface SessionState {
  players: number;
  sound: boolean;
  timer: boolean;
}

const initialState: SessionState = {
  players: 1,
  sound: true,
  timer: false
};

const actionCreator = actionCreatorFactory(NAME);

const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

const setPlayersAction = actionCreator<{ players: number }>(SET_PLAYERS);

export const setPlayers = (players: number) => setPlayersAction({ players });

const toggleSoundAction = actionCreator<{ on: boolean }>(TOGGLE_SOUND);

export const toggleSound = (on: boolean) => toggleSoundAction({ on });

const toggleTimerAction = actionCreator<{ on: boolean }>(TOGGLE_TIMER);

export const toggleTimer = (on: boolean) => toggleTimerAction({ on });

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }))
  .case(setPlayersAction, (state, { players }) => ({
    ...state,
    players
  }))
  .case(toggleSoundAction, (state, { on: sound }) => ({
    ...state,
    sound
  }))
  .case(toggleTimerAction, (state, { on: timer }) => ({
    ...state,
    timer
  }));
