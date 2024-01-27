//
// game state
//
import { SCORE_MULTIPLIER } from "./constants";
import { Dino } from "./entities/Dino";
import { inputSource_create } from "./inputSource";
import { ScoreTicker } from "./score";

const keyboard = inputSource_create();
const dino = new Dino();

export const state = {
  scoreTicker: new ScoreTicker(),
  dino,
  keyboard,
  distance: 0, // distance the dino has travelled
  runSpeed: 10,
  gameStatusTimer: 0,
};

export enum GameStatus {
  Unstarted,
  Initializing, // Initial jump
  Playing,
  Dying,
  GameOver,
}

let status = GameStatus.Unstarted; // Don't mutate directly! Use e.g. startGame(), gameOver() functions.

export function getGameStatus() {
  return status;
}


export function setGameStatus(newStatus: GameStatus) {
  status = newStatus;

  state.gameStatusTimer = 0;
  if (status === GameStatus.Initializing) {
    state.dino.sprite.play();
  } else if (status === GameStatus.Playing) {
    state.runSpeed = 10;
  } else if (status === GameStatus.Dying) {
    state.runSpeed = 3;
  } else if (status === GameStatus.GameOver) {
    state.runSpeed = 0;
    state.dino.sprite.stop();

    // Update high score if previous one was beaten.
    if (getScore() > getHighScore()) {
      saveHighScore(getScore());
      state.scoreTicker.setHighScore(getScore());
    }
  }
}

export function restartGame() {
  
}

export function getScore() {
  return Math.floor(state.distance * SCORE_MULTIPLIER);
}

export function getHighScore() {
  return parseInt(window.localStorage.getItem('dino-score') ?? '0');
}

export function saveHighScore(newHighScore: number) {
  window.localStorage.setItem('dino-score', JSON.stringify(newHighScore));
}
