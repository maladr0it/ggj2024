import * as PIXI from "pixi.js";
import { assets } from "./assets";

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

const groundTexture = PIXI.Texture.from("sprites/ground.png");
const cloudTexture = PIXI.Texture.from("sprites/cloud.png");

export class Background {
  container: PIXI.Container;
  width: number;
  height: number;

  mask: PIXI.Graphics;

  layers: Parallax[] = [];

  constructor(width: number, height: number) {
    this.container = new PIXI.Container();

    this.width = width;
    this.height = height;

    this.mask = new PIXI.Graphics();
    this.container.addChild(this.mask);
    this.container.mask = this.mask;
  
    this.reveal(0);
    
    const ground = new Parallax({
      texture: groundTexture,
      containerWidth: this.width,
    });
    ground.container.y = 80;

    this.container.addChild(ground.container);
    this.layers.push(ground);

    const clouds = new Parallax({
      texture: cloudTexture,
      containerWidth: this.width,
      scrollSpeed: 0.5,
      spacing: 400,
      offset: 100,
    });
    clouds.container.y = 50;

    this.container.addChild(clouds.container);
    this.layers.push(clouds);
  }

  setPosition(x: number) {
    for (const layer of this.layers) layer.setPosition(x);
  }

  private revealedWidth = 70;
  reveal(dt: number) {
    this.revealedWidth = Math.min(this.width, this.revealedWidth + 10 * dt);
    this.mask.beginFill(0xffffff);
    this.mask.drawRect(0, 0, this.revealedWidth, this.height);
  }
}
