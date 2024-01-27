import * as PIXI from "pixi.js";

import {
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
} from "./inputSource";
import { log_clear, log_getContent, log_write } from "./log";

import { GROUND_LEVEL, SCENE_SIZE } from "./constants";
import { level } from "./level";
import { ScoreTicker } from "./score";

import "./style.css";
import { assets } from "./assets";
import { Background } from "./background";
import * as Tone from "tone";
import { GameStatus, getGameStatus, setGameStatus, state } from "./state";

await assets.load();

PIXI.settings.ROUND_PIXELS = false;

const canvasWrapperEl = document.getElementById("canvas-wrapper")!;
const logEl = document.getElementById("log")!;

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundAlpha: 0,
  antialias: false,
});

const scene = new PIXI.Container();
app.stage.addChild(scene);

//
// game state
//
const background = new Background(SCENE_SIZE.x, SCENE_SIZE.y);

state.scoreTicker.spawn(450, 10, scene);

//
// Main loop
//
const tick = (dt: number) => {
  // const { activeButtons, pressedButtons } = inputSource_read(keyboard);

  switch (getGameStatus()) {
    case GameStatus.Unstarted:
      if (state.keyboard.activeButtons.has("jump")) {
        setGameStatus(GameStatus.Initializing);
      }

      break;

    // After game starts have dino jump once before dino starts moving
    case GameStatus.Initializing:
      state.dino.update(dt);

      if (state.dino.currentAnimation !== "jumping") {
        setGameStatus(GameStatus.Playing);
      }
      
      break;
    
    case GameStatus.Playing:
      state.dino.update(dt);

      // Move the ground.
      state.distance += state.runSpeed;
      background.setPosition(state.distance);
      for (const item of level) {
        item.update(dt);
      }

      // Update score.
      state.scoreTicker.update();

      break;
    
    case GameStatus.GameOver:
      break;
  }

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
