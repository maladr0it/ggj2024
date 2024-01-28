import * as PIXI from "pixi.js";
import { Entity } from "./Entity";
import { SCENE_SIZE } from "../constants";
import { Cactus, CactusState } from "./Cactus";
import { sprites } from "../assets";

const animations = {
  default: [sprites["bullet.png"]],
};

export class Bullet extends Entity {
  dx = 10;
  constructor() {
    super(animations, "default");
    this.sprite.anchor.set(0, 0.12);
  }

  spawn(container: PIXI.Container, x: number, y: number) {
    super.spawn(container, x, y);
  }

  update(_dt: number) {
    this.x += this.dx;
    if (this.x > SCENE_SIZE.x) {
      this.despawn();
    }
  }

  onCollide(other: Entity): void {
    if (
      other instanceof Cactus &&
      (other.killedBy === this || other.state === CactusState.Alive)
    ) {
      this.despawn();
    }
  }
}
