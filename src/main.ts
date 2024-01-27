import * as PIXI from "pixi.js";

import {
  inputSource_create,
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
  inputSource_read,
} from "./inputSource";

import { entity_create, entity_render } from "./entity";

import "./style.css";

const GRAVITY = 0.1;
const GROUND_LEVEL = 100;
const JUMP_VEL = -3;

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

//
// game state
//
const keyboard = inputSource_create();

let runSpeed = 0;

const dino = entity_create(jumpSprite);
const ground1 = entity_create(groundSprite1);
const ground2 = entity_create(groundSprite2);

//
// Main loop
//
const tick = (dt: number) => {
  const { activeButtons, pressedButtons } = inputSource_read(keyboard);

  if(pressedButtons.has("start/jump") && runSpeed === 0) {
    runSpeed = 3;
    runSprite.play();
  }

  // dino is in the air
  if (dino.y < GROUND_LEVEL) {
    dino.dy += GRAVITY * dt;
  }

  dino.y = Math.min(dino.y + dino.dy * dt, GROUND_LEVEL);

  // dino landed on the ground
  if (dino.y === GROUND_LEVEL && runSpeed > 0) {
    dino.sprite = runSprite;
  }

  // dino jumped
  if ((pressedButtons.has("up") || pressedButtons.has("start/jump")) && dino.y === GROUND_LEVEL) {
    dino.dy = JUMP_VEL;
    dino.sprite = jumpSprite;
  }

  // move the ground
  // TODO: make the ground cycle forever
  ground1.x -= runSpeed;
  ground2.x -= runSpeed;

  // render (update sprites)
  //
  entity_render(ground1, app.stage);
  entity_render(ground2, app.stage);
  entity_render(dino, app.stage);
};

dino.x = 50;
dino.y = GROUND_LEVEL;

ground1.y = GROUND_LEVEL;
ground1.x = 0;
ground2.y = GROUND_LEVEL;
ground2.x = ground1.sprite.width;

app.ticker.add(tick);

//
// Add stuff to DOM
//
// @ts-ignore
document.body.querySelector("#app").appendChild(app.view);

document.addEventListener("keydown", (event) => {
  inputSource_handleKeyDown(keyboard, event.key);
});
document.addEventListener("keyup", (event) => {
  inputSource_handleKeyUp(keyboard, event.key);
});

