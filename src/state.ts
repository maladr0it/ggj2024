//
// game state
//
import { Dino } from "./entities/Dino";
import { inputSource_create } from "./inputSource";

const keyboard = inputSource_create();
const dino = new Dino();

export enum GameStatus {
  Unstarted,
  Initializing, // Initial jump
  Playing,
  GameOver,
}

let status = GameStatus.Unstarted; // Don't mutate directly! Use e.g. startGame(), gameOver() functions.

export function getGameStatus() {
  return status;
}

export function setGameStatus(newStatus: GameStatus) {
  status = newStatus;

  if (status === GameStatus.Initializing) {
    state.dino.sprite.play();
  } else if (status === GameStatus.Playing) {
    state.runSpeed = 10;
  } else if (status === GameStatus.GameOver) {
    state.runSpeed = 0;
    state.dino.sprite.stop();
  }
}

export const state = {
  dino,
  keyboard,
  distance: 0, // distance the dino has travelled
  runSpeed: 10,
};
