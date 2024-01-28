import { GameStatus, getGameStatus, state } from "../state";
import { Entity } from "./Entity";
import { DINO_X_POS, GROUND_LEVEL } from "../constants";
import { Bullet } from "./Bullet";
import { sprites } from "../assets";
import * as PIXI from "pixi.js";
import { playSound } from "../audio";
import { lerp } from "../utils/math";

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
  coolOffTimer = 0;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.x = x;
    this.y = y;
    this.gunSprite = PIXI.Sprite.from(sprites["gun.png"]);
    this.gunSprite.scale.x = -1;
    this.gunSprite.x = -4;
    this.gunSprite.y = -27;
    this.sprite.addChild(this.gunSprite);
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;

    if (this.x < DINO_X_POS - 100) {
      return;
    }

    else if (this.x < DINO_X_POS + 800) {
      if (this.coolOffTimer > 0.75 && getGameStatus() === GameStatus.Playing) {
        this.coolOffTimer = 0;
        const bullet = new Bullet();

        const sound = playSound("bang");
        sound.playbackRate = lerp(0.8, 1.2, Math.random());

        bullet.spawn(this.sprite.parent, this.x - 20, this.y - 40);
        bullet.dx = -10;
      }
      this.coolOffTimer += dt;
    }
  }

  onCollide(other: Entity): void {
    if (other instanceof Bullet) {
      this.playAnimation("burn");
      this.killedBy ??= other;
      this.state = CactusState.Dead;
    }
  }
}
