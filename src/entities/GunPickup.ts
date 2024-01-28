import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { Bullet } from "./Bullet";
import { playSound } from "../audio";
import { lerp } from "../utils/math";
import { sprites } from "../assets";
import { Dino } from "./Dino";

const animations = {
  default: [sprites["gun.png"]],
};

export class GunPickup extends Entity {
  private initialX = 0;
  private pickedUp = false;
  private coolOffTimer = 0.5;

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
      this.x = state.dino.x + state.dino.w - 15;
      if (
        state.keyboard.activeButtons.has("right") &&
        this.coolOffTimer > 0.5
      ) {
        this.coolOffTimer = 0;
        const bullet = new Bullet();

        const sound = playSound("bang");
        sound.playbackRate = lerp(0.8, 1.2, Math.random());

        bullet.spawn(this.sprite.parent, this.x + this.w, this.y - this.h);
      }
      this.coolOffTimer += dt;
    } else {
      this.x = this.initialX - state.distance;
    }
  }

  onCollide(other: Entity): void {
    if (other instanceof Dino) {
      this.pickedUp = true;
    }
  }
}
