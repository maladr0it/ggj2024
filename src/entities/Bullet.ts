import * as PIXI from "pixi.js";
import { Entity } from "./Entity";

const animations: Record<string, PIXI.Texture[]> = {
  default: [await PIXI.Texture.fromURL("sprites/bullet.png")],
};

export class Bullet extends Entity {
  private dx = 10;

  constructor() {
    super(animations, "default");
    this.sprite.anchor.set(0, 0.12);
  }

  spawn(container: PIXI.Container, x: number, y: number) {
    super.spawn(container, x, y);
  }

  update(_dt: number) {
    this.x += this.dx;
  }
}
