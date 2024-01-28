import * as PIXI from "pixi.js";
import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { Bullet } from "./Bullet";

const animations: Record<string, PIXI.Texture[]> = {
  default: [await PIXI.Texture.fromURL("sprites/cactus1.png")],
  burn: [
    await PIXI.Texture.fromURL("sprites/cactus-burn1.png"),
    await PIXI.Texture.fromURL("sprites/cactus-burn2.png"),
  ],
};

export enum CactusState {
  Alive,
  Dead,
}

export class Cactus extends Entity {
  state = CactusState.Alive;
  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;
  }

  onCollide(other: Entity): void {
    if (other instanceof Bullet) {
      this.playAnimation("burn");
      this.state = CactusState.Dead;
    }
  }
}
