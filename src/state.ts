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

import { Dino } from "./entities/Dino";
import { Entity } from "./entities/Entity";
import { InputSource, inputSource_create } from "./inputSource";
import { generateLevel } from "./level";
import { ScoreTicker } from "./score";
import * as PIXI from "pixi.js";

await assets.load();

export const scene = new PIXI.Container();

export let state: GameState = generateFreshGameState();

type GameState = {
  scoreTicker: ScoreTicker;
  gameOverMessage: PIXI.Sprite;
  dino: Dino;
  scene: PIXI.Container;
  clipping: Clipping;
  clipContainer: PIXI.Container;
  background: Parallax[];
  keyboard: InputSource;
  distance: number;
  runSpeed: number;
  gameStatusTimer: number;
  entities: Set<Entity>;
};

function generateFreshGameState(): GameState {
  const clipping = new Clipping(SCENE_SIZE.x, SCENE_SIZE.y);
  const background = initBackground(SCENE_SIZE.x);
  for (const layer of background) clipping.container.addChild(layer.container);

  const dino = new Dino();
  const keyboard = inputSource_create();

  const scoreTicker = new ScoreTicker(450, 10, clipping.container);

  // TODO: Clean up.
  const gameOverMessage = PIXI.Sprite.from("sprites/text/game-over.png");
  gameOverMessage.x = SCENE_SIZE.x / 2 - 189 / 2; // TODO: Use get size instead of hardcoding.
  gameOverMessage.y = SCENE_SIZE.y / 2 - 20; // TODO: Use get size instead of hardcoding.
  gameOverMessage.visible = false;
  clipping.container.addChild(gameOverMessage);

  return {
    scoreTicker,
    gameOverMessage,
    dino,
    clipping,
    clipContainer: clipping.container,
    scene: scene,
    keyboard,
    background,
    distance: 0, // distance the dino has travelled
    runSpeed: 0,
    gameStatusTimer: 0,
    /** A Set instead of an Array as a conveniently gaurenteed-unique list of entities. */
    entities: new Set(generateLevel()),
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
    // Update high score if previous one was beaten.
    if (getScore() > getHighScore()) {
      saveHighScore(getScore());
      state.scoreTicker.setHighScore(getScore());
    }
  }
}

export function resetGame() {
  for (const entity of state.entities) entity.cleanup();
  scene.removeChildren();

  state = generateFreshGameState();

  scene.addChild(state.clipContainer);

  state.dino.spawn(scene, 0, GROUND_LEVEL);

  for (const item of state.entities) {
    item.spawn(state.clipContainer, item.x, item.y);
  }

  setGameStatus(GameStatus.Unstarted);
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
