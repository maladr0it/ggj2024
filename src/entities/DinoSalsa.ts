import { Entity } from "./Entity";
import { sprites } from "../assets";

const ANIAMATION_SPEED = 0.2;

const animations = {
  default: [
    sprites["dino/dino-salsa1.png"],
    sprites["dino/dino-salsa2.png"],
    sprites["dino/dino-salsa3.png"],
    sprites["dino/dino-salsa4.png"],
    sprites["dino/dino-salsa5.png"],
    sprites["dino/dino-salsa6.png"],
    sprites["dino/dino-salsa7.png"],
    sprites["dino/dino-salsa8.png"],
  ],
};

export class DinoSalsa extends Entity {
  constructor() {
    super(animations, "default");
    // override animation speed
    this.sprite.loop = false;
    // this.sprite.scale = { x: 1, y: 1 };
    this.sprite.animationSpeed = ANIAMATION_SPEED;
  }

  update(_dt: number) {}
}
