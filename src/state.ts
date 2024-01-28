//
// game state
//
import { assets } from "./assets";
import { Clipping, Parallax, initBackground } from "./background";
import {
  GROUND_LEVEL,
  SCENE_SIZE,
  SCORE_MULTIPLIER,
  RUN_SPEED,
} from "./constants";
import { Car } from "./entities/Car";
import { Dino } from "./entities/Dino";
import { InputSource, inputSource_create } from "./inputSource";
import { LevelEntity, generateLevel } from "./level";
import { ScoreTicker } from "./score";
import * as PIXI from "pixi.js";

await assets.load();

export const scene = new PIXI.Container();

export let state: GameState = generateFreshGameState();

type GameState = {
  scoreTicker: ScoreTicker;
  dino: Dino;
  clipping: Clipping;
  clipContainer: PIXI.Container;
  background: Parallax[];
  keyboard: InputSource;
  distance: number;
  runSpeed: number;
  gameStatusTimer: number;
  car: Car;
  level: LevelEntity[];
};

function generateFreshGameState(): GameState {
  const clipping = new Clipping(SCENE_SIZE.x, SCENE_SIZE.y);
  const background = initBackground(SCENE_SIZE.x);
  for (const layer of background) clipping.container.addChild(layer.container);

  const dino = new Dino();
  const keyboard = inputSource_create();
  const car = new Car();

  return {
    scoreTicker: new ScoreTicker(),
    dino,
    clipping,
    clipContainer: clipping.container,
    keyboard,
    background,
    car,
    distance: 0, // distance the dino has travelled
    runSpeed: 0,
    gameStatusTimer: 0,
    level: generateLevel(),
  };
}

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

  state.gameStatusTimer = 0;
  if (status === GameStatus.Initializing) {
    state.dino.sprite.play();
  } else if (status === GameStatus.Playing) {
    state.runSpeed = RUN_SPEED;
  } else if (status === GameStatus.GameOver) {
    state.runSpeed = RUN_SPEED / 10;
    state.dino.sprite.stop();

    // Update high score if previous one was beaten.
    if (getScore() > getHighScore()) {
      saveHighScore(getScore());
      state.scoreTicker.setHighScore(getScore());
    }
  }
}

export function resetGame() {
  scene.removeChildren();
  state = generateFreshGameState();

  scene.addChild(state.clipContainer);

  state.dino.spawn(scene, 0, GROUND_LEVEL);

  for (const item of state.level) {
    state.clipContainer.addChild(item.sprite);
  }

  setGameStatus(GameStatus.Unstarted);

  // setGameStatus(GameStatus.Unstarted);

  // state.scene.removeChildren();
  // state.background.container.removeChildren();
  // state.scene.addChild(state.background.container);

  // state.background.spawn();
  // state.dino.spawn(state.scene, 20, GROUND_LEVEL);

  // for (const item of level) {
  //   state.scene.addChild(item.sprite);
  // }

  // state.scene.addChild(state.background.container);

  // state.dino.spawn(state.scene, 20, GROUND_LEVEL);

  // for (const item of level) {
  //   state.scene.addChild(item.sprite);
  // }

  // background.container.removeChildren();
  // scene.removeChildren();

  // // state.dino.spawn(scene, 20, GROUND_LEVEL);

  // for (const item of level) {
  //   scene.removeChild(item.sprite);
  // }
}

export function getScore() {
  return Math.floor(state.distance * SCORE_MULTIPLIER);
}

export function getHighScore() {
  return parseInt(window.localStorage.getItem("dino-score") ?? "0");
}

export function saveHighScore(newHighScore: number) {
  window.localStorage.setItem("dino-score", JSON.stringify(newHighScore));
}
