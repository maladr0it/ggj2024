import * as PIXI from "pixi.js";
import { GameStatus, setGameStatus, state } from "../state";
import {Entity} from "./Entity";
import {GROUND_LEVEL} from "../constants";

const animations: Record<string, PIXI.Texture[]> = {
  default: [
    await PIXI.Texture.fromURL("sprites/cactus1.png"),
  ],
}

export class Cactus extends Entity {
  private initialX = 0;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.sprite.anchor.set(0, 1);
    this.initialX = x;
    this.x = x;
    this.y = y;
  }

  isCollidingWith(hitbox: PIXI.Rectangle) {
    return this.sprite.getBounds().intersects(hitbox);
  }

  update(_dt: number) {
    this.x = this.initialX - state.distance;
    if(this.isCollidingWith(state.dino.hitbox)) {
      state.dino.dieWithDecapitation();
      setGameStatus(GameStatus.Dying)
    }
  }
}
