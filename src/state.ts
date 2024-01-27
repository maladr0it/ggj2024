//
// game state
//
import {Dino} from "./entities/Dino";
import {inputSource_create} from "./inputSource";

const keyboard = inputSource_create();
const dino = new Dino();

export enum GameStatus {
  Unstarted,
  Playing,
  GameOver,
}

let status = GameStatus.Unstarted; // Don't mutate directly! Use e.g. startGame(), gameOver() functions.

export function getStatus() {
  return status;
}

export function startGame() {
  status = GameStatus.Playing;

  state.runSpeed = 10;
  state.dino.sprite.play();
}

export function gameOver() {
  status = GameStatus.GameOver;

  state.runSpeed = 0;
  state.dino.sprite.stop();
}

export const state = {
  dino,
  keyboard,
  distance: 0, // distance the dino has travelled
  runSpeed: 0,
};
