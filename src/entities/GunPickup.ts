import * as PIXI from "pixi.js";
import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { Bullet } from "./Bullet";
import { level } from "../level";

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
      if (state.keyboard.activeButtons.has("right") && this.coolOffTimer > 20) {
        this.coolOffTimer = 0;
        const bullet = new Bullet();
        bullet.spawn(
          this.sprite.parent,
          this.x + this.hitbox.width,
          this.y - this.hitbox.height
        );
        level.push(bullet);
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
