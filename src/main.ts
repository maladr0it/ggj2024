import * as PIXI from "pixi.js";

import {
  inputSource_create,
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
  inputSource_read,
} from "./inputSource";

import { log_clear, log_getContent, log_write } from "./log";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "./constants";
import { Cactus } from "./entities/Cactus";
import { Score } from "./score";

import "./style.css";

const canvasWrapperEl = document.getElementById("canvas-wrapper")!;
const logEl = document.getElementById("log")!;

const app = new PIXI.Application({
  width: 600,
  height: 150,
  background: "red",
});

//
// Load assets
//
const runAnim = [
  PIXI.Texture.from("sprites/dino-run1.png"),
  PIXI.Texture.from("sprites/dino-run2.png"),
];
const jumpAnim = [PIXI.Texture.from("sprites/dino-jump1.png")];

const CACTI = [Cactus.create(500)];

//
// game state
//
const keyboard = inputSource_create();

const dino = {
  state: "",
  sprite: new PIXI.AnimatedSprite(runAnim),
  dy: 0,
  dx: 0,
};
dino.sprite.anchor.set(0, 1);
dino.sprite.animationSpeed = 0.1;

let distance = 0; // distance the dino has travelled
let runSpeed = 0;

const score = new Score(20, 20, app.stage);
score.setValue(1020);

//
// Main loop
//
const tick = (dt: number) => {
  log_write("isplaying", dino.sprite.playing);

  const { activeButtons, pressedButtons } = inputSource_read(keyboard);

  // Apply forces
  const prevDinoY = dino.sprite.y;
  dino.dy += GRAVITY * dt;

  dino.sprite.y = Math.min(dino.sprite.y + dino.dy * dt, GROUND_LEVEL);
  // dino hit the ground
  if (prevDinoY < GROUND_LEVEL && dino.sprite.y === GROUND_LEVEL) {
    dino.sprite.textures = runAnim;
    dino.sprite.play();
  }

  // dino jumped
  if (pressedButtons.has("up") && dino.sprite.y === GROUND_LEVEL) {
    dino.dy = JUMP_VEL;
    dino.sprite.textures = jumpAnim;
    dino.sprite.play();
  }

  // move the ground
  distance += runSpeed;

  log_write("distance:", distance);

  logEl.innerText = log_getContent();
  log_clear();
};

const start = () => {
  app.stage.addChild(dino.sprite);
  dino.sprite.textures = runAnim;
  dino.sprite.x = 50;
  dino.sprite.y = GROUND_LEVEL;
  dino.sprite.play();

  for (const cactus of CACTI) {
    app.stage.addChild(cactus.sprite);
  }

  app.ticker.add(tick);
};

for (const cactus of CACTI) {
  app.stage.addChild(cactus.sprite);
}

//
// Add stuff to DOM
//
// @ts-ignore
canvasWrapperEl.appendChild(app.view);

document.addEventListener("keydown", (event) => {
  inputSource_handleKeyDown(keyboard, event.key);
});
document.addEventListener("keyup", (event) => {
  inputSource_handleKeyUp(keyboard, event.key);
});

start();
