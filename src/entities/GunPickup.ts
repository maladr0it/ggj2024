import * as PIXI from "pixi.js";
import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { Bullet } from "./Bullet";
import { playSound } from "../audio";

const animations: Record<string, PIXI.Texture[]> = {
  default: [await PIXI.Texture.fromURL("sprites/gun.png")],
};

export class GunPickup extends Entity {
  private initialX = 0;
  private pickedUp = false;
  private coolOffTimer = 0;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.sprite.anchor.set(0, 1);
    this.initialX = x;
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    if (this.pickedUp) {
      this.y = state.dino.y;
      this.x = state.dino.x + state.dino.hitbox.width - 15;
      if (
        state.keyboard.activeButtons.has("right") &&
        this.coolOffTimer > 0.5
      ) {
        this.coolOffTimer = 0;
        const bullet = new Bullet();
        playSound("bang", true);
        bullet.spawn(
          this.sprite.parent,
          this.x + this.hitbox.width,
          this.y - this.hitbox.height
        );
      }
      this.coolOffTimer += dt;
    } else {
      this.x = this.initialX - state.distance;
    }

    if (this.isCollidingWith(state.dino.hitbox) && !this.pickedUp) {
      this.pickedUp = true;
    }
  }
}
