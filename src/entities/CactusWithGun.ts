import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { Bullet } from "./Bullet";
import { sprites } from "../assets";
import * as PIXI from "pixi.js";

const animations = {
  default: [sprites["cactus1.png"]],
  burn: [sprites["cactus-burn1.png"], sprites["cactus-burn2.png"]],
};

export enum CactusState {
  Alive,
  Dead,
}

export class CactusWithGun extends Entity {
  state = CactusState.Alive;
  killedBy: Bullet | null = null;
  gunSprite: PIXI.Sprite;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.x = x;
    this.y = y;
    this.gunSprite = PIXI.Sprite.from(sprites["gun.png"]);
    this.gunSprite.scale.y = -1;
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;
  }

  onCollide(other: Entity): void {
    if (other instanceof Bullet) {
      this.playAnimation("burn");
      this.killedBy ??= other;
      this.state = CactusState.Dead;
    }
  }
}
