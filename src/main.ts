import * as PIXI from "pixi.js";

import {
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
} from "./inputSource";
import { log_clear, log_getContent, log_write } from "./log";

import { DEATH_DECEL, DEBUG, SCENE_SIZE, SCENE_TOP } from "./constants";

import * as Tone from "tone";
import {
  GameStatus,
  getGameStatus,
  resetGame,
  scene,
  setGameStatus,
  state,
} from "./state";

import "./style.css";

PIXI.settings.ROUND_PIXELS = true;

const canvasWrapperEl = document.getElementById("canvas-wrapper")!;
const logEl = document.getElementById("log")!;

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundAlpha: 0,
  antialias: false,
});

app.stage.addChild(scene);

const checkCollisions = (dt: number) => {
  const entities = [...state.entities];
  const hitboxes = entities.map(entity =>
    entity.getVelocityDependentHitbox(dt)
  );

  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      if (hitboxes[i].intersects(hitboxes[j])) {
        entities[i].onCollide(entities[j]);
        entities[j].onCollide(entities[i]);
      }
    }
  }
};

//
// Main loop
//
let then = Date.now();

const tick = () => {
  requestAnimationFrame(tick);

  const now = Date.now();
  const dt = (now - then) / 1000;
  then = now;

  if (getGameStatus() !== GameStatus.Unstarted) {
    state.clipping.update(dt);
    state.dino.update(dt);

    // Move the ground.
    state.distance += state.runSpeed * dt;
    for (const layer of state.background) layer.setPosition(state.distance);
    for (const item of state.entities) item.update(dt);

    // Update score.
    state.scoreTicker.update();
  }

  switch (getGameStatus()) {
    case GameStatus.Unstarted:
      if (state.keyboard.activeButtons.has("jump")) {
        setGameStatus(GameStatus.Initializing);
      }

      break;

    // After game starts have dino jump once before dino starts moving
    case GameStatus.Initializing:
      if (state.dino.currentAnimation !== "jumping") {
        setGameStatus(GameStatus.Playing);
        state.clipping.reveal(true);
      }

      break;

    case GameStatus.Playing:
      state.gameOverMessage.visible = false;
      state.scoreTicker.container.visible = true;

      checkCollisions(dt);
      break;

    case GameStatus.GameOver:
      state.runSpeed = Math.max(state.runSpeed - dt * DEATH_DECEL, 0);

      state.gameOverMessage.visible = true;

      if (state.runSpeed === 0 && state.keyboard.activeButtons.has("jump")) {
        resetGame();
        setGameStatus(GameStatus.Initializing);
        state.clipping.reveal(false);
      }

      break;
  }

  log_write("run speed:", state.runSpeed);
  log_write("distance:", Math.floor(state.distance));
  log_write("entity count:", state.entities.size);

  if (DEBUG) {
    logEl.innerText = log_getContent();
  }
  log_clear();
};

const start = () => {
  resetGame();

  requestAnimationFrame(tick);
};

const onResize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  scene.x = (window.innerWidth - SCENE_SIZE.x) / 2;
  scene.y = SCENE_TOP;
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
