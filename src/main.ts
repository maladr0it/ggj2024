import * as PIXI from "pixi.js";

import {
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
} from "./inputSource";
import { log_clear, log_getContent, log_write } from "./log";

import { GROUND_LEVEL, SCENE_SIZE } from "./constants";
import { level } from "./level";
import { Score, ScoreTicker } from "./score";

import "./style.css";
import { assets } from "./assets";
import { Background } from "./background";
import { state } from "./state";
import * as Tone from "tone";

await assets.load();

const canvasWrapperEl = document.getElementById("canvas-wrapper")!;
const logEl = document.getElementById("log")!;

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundAlpha: 0,
});

const scene = new PIXI.Container();
app.stage.addChild(scene);

//
// game state
//
const background = new Background(SCENE_SIZE.x, SCENE_SIZE.y);

const SCORE_MULTIPLIER = 0.005; // Modifies rate score increases relative to distance
const scoreTicker = new ScoreTicker(450, 10, scene);

//
// Main loop
//
const tick = (dt: number) => {
  background.setPosition(state.distance);
  // const { activeButtons, pressedButtons } = inputSource_read(keyboard);

  state.dino.update(dt);

  // move the ground
  state.distance += state.runSpeed;

  scoreTicker.setScore(Math.floor(state.distance * SCORE_MULTIPLIER));

  log_write("distance:", state.distance);

  logEl.innerText = log_getContent();
  log_clear();
};

const start = () => {
  scene.addChild(background);

  state.dino.spawn(scene, 50, GROUND_LEVEL);

  for (const item of level) {
    scene.addChild(item.sprite);
  }

  app.ticker.add(tick);
};

const onResize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  scene.x = (window.innerWidth - SCENE_SIZE.x) / 2;
  scene.y = 150;
};

//
// Add stuff to DOM
//
// @ts-ignore
canvasWrapperEl.appendChild(app.view);

window.addEventListener("resize", onResize);
document.addEventListener("keydown", event => {
  Tone.start();
  inputSource_handleKeyDown(state.keyboard, event.key);
});
document.addEventListener("keyup", event => {
  inputSource_handleKeyUp(state.keyboard, event.key);
});

onResize();
start();
