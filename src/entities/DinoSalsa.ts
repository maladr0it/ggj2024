import * as PIXI from "pixi.js";
import { Entity } from "./Entity";

const ANIAMATION_SPEED = 0.2;

const animations: Record<string, PIXI.Texture[]> = {
  spread: [
    await PIXI.Texture.fromURL("sprites/dino-salsa1.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa2.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa3.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa4.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa5.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa6.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa7.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa8.png"),
  ],
};

export class DinoSalsa extends Entity {
  constructor() {
    super(animations, "spread");
    // override animation speed
    this.sprite.loop = false;
    // this.sprite.scale = { x: 1, y: 1 };
    this.sprite.animationSpeed = ANIAMATION_SPEED;
  }

  update(_dt: number) {}
}
