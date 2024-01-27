import * as PIXI from "pixi.js";

import {
  inputSource_create,
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
  inputSource_read,
} from "./inputSource";
import { entity_create, entity_render } from "./entity";
import { log_clear, log_getContent, log_write } from "./log";

import "./style.css";

const GRAVITY = 0.1;
const GROUND_LEVEL = 100;
const JUMP_VEL = -3;

const canvasWrapperEl = document.getElementById("canvas-wrapper");
const logEl = document.getElementById("log")!;

const app = new PIXI.Application({
  width: 600,
  height: 150,
  background: "red",
});

//
// Load assets
//
const runSprite = PIXI.AnimatedSprite.fromImages([
  "sprites/dino-run1.png",
  "sprites/dino-run2.png",
]);
runSprite.anchor.set(0, 1); // anchor to bottom so we can test for ground contact more easily
runSprite.animationSpeed = 0.1; // what does 0.1 mean exactly?

const jumpSprite = PIXI.AnimatedSprite.fromImages(["sprites/dino-jump1.png"]);
jumpSprite.anchor.set(0, 1);
jumpSprite.animationSpeed = 0.1;

const groundSprite1 = PIXI.AnimatedSprite.fromImages(["sprites/ground.png"]);
groundSprite1.anchor.set(0, 1);
const groundSprite2 = PIXI.AnimatedSprite.fromImages(["sprites/ground.png"]);
groundSprite2.anchor.set(0, 1);

const cactusSprite1 = PIXI.AnimatedSprite.fromImages(["sprites/cactus1.png"]);
cactusSprite1.anchor.set(0, 1);

//
// game state
//
const keyboard = inputSource_create();

let distance = 0; // distance the dino has travelled
let runSpeed = 10;

const dino = entity_create(runSprite);
let ground1 = entity_create(groundSprite1);
let ground2 = entity_create(groundSprite2);

//
// Main loop
//
const tick = (dt: number) => {
  const { activeButtons, pressedButtons } = inputSource_read(keyboard);

  // Apply forces
  dino.dy += GRAVITY * dt;
  dino.y = Math.min(dino.y + dino.dy * dt, GROUND_LEVEL);

  // dino landed on the ground
  if (dino.y === GROUND_LEVEL) {
    dino.sprite = runSprite;
  }

  // dino jumped
  if (pressedButtons.has("up") && dino.y === GROUND_LEVEL) {
    dino.dy = JUMP_VEL;
    dino.sprite = jumpSprite;
  }

  // move the ground
  distance += runSpeed;
  ground1.x -= runSpeed;
  ground2.x -= runSpeed;

  // if the ground has gone offscreen, move it
  if (ground1.x + ground1.sprite.width < 0) {
    ground1.x = ground2.x + ground2.sprite.width;
    const temp = ground1;
    ground1 = ground2;
    ground2 = temp;
  }

  log_write("distance:", distance);

  // render (update sprites)
  //
  entity_render(ground1, app.stage);
  entity_render(ground2, app.stage);
  entity_render(dino, app.stage);

  logEl.innerText = log_getContent();
  log_clear();
};

const startButtonClick = () => {
  dino.x = 50;
  dino.y = GROUND_LEVEL;

  ground1.y = GROUND_LEVEL;
  ground1.x = 0;
  ground2.y = GROUND_LEVEL;
  ground2.x = ground1.sprite.width;

  app.ticker.add(tick);
};

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

const startButton = document.createElement("button");
startButton.innerText = "Start";
startButton.addEventListener("click", startButtonClick);
document.body.appendChild(startButton);
