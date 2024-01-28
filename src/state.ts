//
// game state
//
import { Background } from "./background";
import {
  GROUND_LEVEL,
  SCENE_SIZE,
  SCORE_MULTIPLIER,
  RUN_SPEED,
} from "./constants";
import { Car } from "./entities/Car";
import { Dino } from "./entities/Dino";
import { inputSource_create } from "./inputSource";
import { LevelEntity, generateLevel } from "./level";
import { ScoreTicker } from "./score";
import * as PIXI from "pixi.js";

export const scene = new PIXI.Container();

export let state: GameState = generateFreshGameState();

type GameState = {
  scoreTicker: ScoreTicker,
  gameOverMessage: PIXI.Sprite,
  dino: Dino,
  background: Background,
  keyboard: any,
  distance: number,
  runSpeed: number,
  gameStatusTimer: number,
  car: Car,
  level: LevelEntity[],
}

function generateFreshGameState(): GameState {
  const dino = new Dino();
  const keyboard = inputSource_create();
  const background = new Background(SCENE_SIZE.x, SCENE_SIZE.y);
  const car = new Car();

  const scoreTicker = new ScoreTicker(450, 10, scene);

  // TODO: Clean up.
  const gameOverMessage = PIXI.Sprite.from("sprites/text/game-over.png");
  gameOverMessage.x = SCENE_SIZE.x / 2 - 189 / 2 // TODO: Use get size instead of hardcoding.
  gameOverMessage.y = SCENE_SIZE.y / 2 - 20 // TODO: Use get size instead of hardcoding.
  gameOverMessage.visible = false;
  background.container.addChild(gameOverMessage);
  
  return {
    scoreTicker,
    gameOverMessage,
    dino,
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

  scene.addChild(state.background.container);

  state.dino.spawn(scene, 0, GROUND_LEVEL);

  for (const item of state.level) {
    scene.addChild(item.sprite);
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
