import * as PIXI from "pixi.js";

import {
  inputSource_create,
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
  inputSource_read,
} from "./inputSource";
import { log_clear, log_getContent, log_write } from "./log";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL, SCENE_SIZE } from "./constants";
import { level } from "./level";
import { Cactus } from "./entities/Cactus";
import { Score } from "./score";

import "./style.css";
import { Dino } from "./entities/Dino";
import { assets } from "./assets";
import { Background } from "./background";

await assets.load();

const canvasWrapperEl = document.getElementById("canvas-wrapper")!;
const logEl = document.getElementById("log")!;

const app = new PIXI.Application({
  width: 600,
  height: 150,
  background: "red",
});

//
// game state
//
const keyboard = inputSource_create();
const dino = new Dino();
const background = new Background(SCENE_SIZE.x, SCENE_SIZE.y);

export const state = {
  dino,
  keyboard,
  distance: 0, // distance the dino has travelled
  runSpeed: 0,
};

const score = new Score(20, 20, app.stage);
score.setValue(1020);

//
// Main loop
//
const tick = (dt: number) => {
  background.setPosition(state.distance);
  // const { activeButtons, pressedButtons } = inputSource_read(keyboard);

  dino.update(dt);

  // move the ground
  state.distance += state.runSpeed;

  log_write("distance:", state.distance);

  logEl.innerText = log_getContent();
  log_clear();
};

const start = () => {
  app.stage.addChild(background);

  dino.spawn(app.stage, 50, GROUND_LEVEL);

  for (const item of level) {
    app.stage.addChild(item.sprite);
  }

  app.ticker.add(tick);
};

//
// Add stuff to DOM
//
// @ts-ignore
canvasWrapperEl.appendChild(app.view);

document.addEventListener("keydown", event => {
  inputSource_handleKeyDown(keyboard, event.key);
});
document.addEventListener("keyup", event => {
  inputSource_handleKeyUp(keyboard, event.key);
});

start();
