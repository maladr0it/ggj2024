import * as PIXI from "pixi.js";
import { Entity } from "./Entity";
import { state } from "../state";
import { GROUND_LEVEL } from "../constants";

const animations = {
  default: [await PIXI.Texture.fromURL("sprites/gun.png")],
};

export class Trigger extends Entity {
  offset: number;
  onHit: () => void;
  constructor(offset: number, onHit: () => void = () => console.log("bang!")) {
    super(animations, "default");
    this.offset = offset;
    this.y = GROUND_LEVEL;
    this.sprite.visible = false;
    this.onHit = onHit;
  }
  fired = false;
  update() {
    if (this.fired) return;
    this.x = this.offset - state.distance;
    if (this.isCollidingWith(state.dino.hitbox)) {
      this.onHit();
      this.fired = true;
    }
  }
}
