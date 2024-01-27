import * as PIXI from "pixi.js";

import {
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
} from "./inputSource";
import { log_clear, log_getContent, log_write } from "./log";

import { GROUND_LEVEL, SCENE_SIZE } from "./constants";
import { level } from "./level";
import { Score } from "./score";

import "./style.css";
import { assets } from "./assets";
import { Background } from "./background";
import {state} from "./state";

await assets.load();

const canvasWrapperEl = document.getElementById("canvas-wrapper")!;
const logEl = document.getElementById("log")!;

const app = new PIXI.Application({
  width: 600,
  height: 150,
  background: "red",
});


const score = new Score(20, 20, app.stage);
score.setValue(1020);
const background = new Background(SCENE_SIZE.x, SCENE_SIZE.y);

//
// Main loop
//
const tick = (dt: number) => {
  background.setPosition(state.distance);
  // const { activeButtons, pressedButtons } = inputSource_read(keyboard);

  state.dino.update(dt);

  // move the ground
  state.distance += state.runSpeed;

  log_write("distance:", state.distance);

  logEl.innerText = log_getContent();
  log_clear();
};

const start = () => {
  app.stage.addChild(background);

  state.dino.spawn(app.stage, 50, GROUND_LEVEL);

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
  inputSource_handleKeyDown(state.keyboard, event.key);
});
document.addEventListener("keyup", event => {
  inputSource_handleKeyUp(state.keyboard, event.key);
});

start();
