import * as PIXI from "pixi.js";
import { assets } from "./assets";

interface ParallaxParams {
  texture: PIXI.Texture;
  containerWidth: number;
  scrollSpeed?: number;
  spacing?: number;
}

export class Parallax extends PIXI.Container {
  loopWidth: number;
  scrollSpeed: number;

  constructor({
    texture,
    containerWidth,
    scrollSpeed = 1,
    spacing = 0,
  }: ParallaxParams) {
    super();

    this.loopWidth = texture.width + spacing;
    this.scrollSpeed = scrollSpeed;

    const num = Math.ceil(containerWidth / this.loopWidth) + 1;
    for (let i = 0; i < num; i++) {
      const sprite = new PIXI.Sprite(texture);
      sprite.x = i * this.loopWidth;
      this.addChild(sprite);
    }
  }

  setPosition(x: number) {
    this.x = -((x * this.scrollSpeed) % this.loopWidth);
  }
}

export class Background extends PIXI.Container {
  layers: Parallax[] = [];

  constructor(width: number, height: number) {
    super();

    const mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, width, height);
    this.mask = mask;

    const ground = new Parallax({
      texture: assets().ground,
      containerWidth: width,
    });
    ground.y = 100;
    this.addChild(ground);
    this.layers.push(ground);

    const clouds = new Parallax({
      texture: assets().cloud,
      containerWidth: width,
      scrollSpeed: 0.5,
      spacing: 400,
    });
    clouds.y = 50;

    this.addChild(clouds);
    this.layers.push(clouds);
  }

  setPosition(x: number) {
    for (const layer of this.layers) layer.setPosition(x);
  }
}
