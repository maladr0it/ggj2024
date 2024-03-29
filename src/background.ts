import * as PIXI from "pixi.js";
import { Tween } from "./utils/tween";
import { assets } from "./assets";
import { SCENE_TOP } from "./constants";

interface ParallaxParams {
  texture: PIXI.Texture;
  containerWidth: number;
  offset?: number;
  scrollSpeed?: number;
  spacing?: number;
}

export class Parallax {
  container: PIXI.Container;
  loopWidth: number;
  scrollSpeed: number;
  offset: number;

  constructor({
    texture,
    containerWidth,
    offset = 0,
    scrollSpeed = 1,
    spacing = 0,
  }: ParallaxParams) {
    this.container = new PIXI.Container();

    this.loopWidth = texture.width + spacing;
    this.scrollSpeed = scrollSpeed;
    this.offset = offset;

    const num = Math.ceil(containerWidth / this.loopWidth) + 1;
    for (let i = 0; i < num; i++) {
      const sprite = new PIXI.Sprite(texture);
      sprite.x = i * this.loopWidth;
      this.container.addChild(sprite);
    }

    this.setPosition(0);
  }

  setPosition(x: number) {
    const position = (x + this.offset) * this.scrollSpeed;
    this.container.x = -(position % this.loopWidth);
  }
}

export const initBackground = (width: number) => {
  const ground = new Parallax({
    texture: assets().sprites.ground,
    containerWidth: width,
  });
  ground.container.y = 90;
  const clouds = new Parallax({
    texture: assets().sprites.cloud,
    containerWidth: width,
    scrollSpeed: 0.5,
    spacing: 400,
    offset: 100,
  });
  clouds.container.y = 50;
  return [ground, clouds];
};

export class Clipping {
  container: PIXI.Container;
  width: number;
  height: number;

  mask: PIXI.Graphics;

  constructor(width: number, height: number) {
    this.container = new PIXI.Container();

    this.width = width;
    this.height = height;

    this.mask = new PIXI.Graphics();
    this.container.addChild(this.mask);
    this.container.mask = this.mask;
    this.update(0);
  }

  private initialWidth = 45;
  private revealTween = new Tween(0.5);
  private revealed = false;

  reveal(animated = false) {
    this.revealTween = new Tween(animated ? 0.5 : 0);
    this.revealed = true;
  }

  update(dt: number) {
    if (this.revealed) this.revealTween.update(dt);
    this.mask.beginFill(0xffffff);
    const revealedWidth = this.revealTween.lerp(this.initialWidth, this.width);
    this.mask.drawRect(0, -SCENE_TOP, revealedWidth, this.height + SCENE_TOP);
  }
}
