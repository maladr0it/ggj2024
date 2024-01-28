import * as PIXI from "pixi.js";
import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";

const animations: Record<string, PIXI.Texture[]> = {
  default: [await PIXI.Texture.fromURL("sprites/cactus1.png")],
};

export class Cactus extends Entity {
  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;
  }

  onCollide(other: Entity): void {}
}
