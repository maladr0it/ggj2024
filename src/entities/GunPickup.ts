import * as PIXI from "pixi.js";
import { state } from "../state";
import {Entity} from "./Entity";
import {GROUND_LEVEL} from "../constants";
import {level} from "../level";

const animations: Record<string, PIXI.Texture[]> = {
  default: [
    await PIXI.Texture.fromURL("sprites/gun.png"),
  ],
}

export class GunPickup extends Entity {
  private initialX = 0;
  private pickedUp = false;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.sprite.anchor.set(0, 1);
    this.initialX = x;
    this.x = x;
    this.y = y;
  }

  update(_dt: number) {
    if(this.pickedUp) {
      this.y = state.dino.y;
    } else {
      this.x = this.initialX - state.distance;
    }
    if(this.isCollidingWith(state.dino.hitbox) && !this.pickedUp) {
      this.pickedUp = true;
    }
  }
}
