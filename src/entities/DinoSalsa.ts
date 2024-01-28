import * as PIXI from "pixi.js";
import { Entity } from "./Entity";

const animations: Record<string, PIXI.Texture[]> = {
  spread: [
    await PIXI.Texture.fromURL("sprites/dino-salsa1.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa2.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa3.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa4.png"),
    await PIXI.Texture.fromURL("sprites/dino-salsa5.png"),
  ],
};

export class DinoSalsa extends Entity {
  constructor() {
    super(animations, "spread");
  }

  update(_dt: number) {}
}
