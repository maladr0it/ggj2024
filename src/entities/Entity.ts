import * as PIXI from "pixi.js";

const ANIMATION_SPEED = 0.1;

export abstract class Entity {
  private spawned = false;
  sprite: PIXI.AnimatedSprite;
  animations: Record<string, PIXI.Texture[]>;

  constructor(
    animations: Record<string, PIXI.Texture[]>,
    defaultAnimation: string
  ) {
    this.animations = animations;

    this.sprite = new PIXI.AnimatedSprite(this.animations[defaultAnimation]);
    this.sprite.anchor.set(0, 1);
    this.sprite.animationSpeed = ANIMATION_SPEED;
  }

  spawn(container: PIXI.Container, x: number, y: number) {
    container.addChild(this.sprite);
    this.x = x;
    this.y = y;
    this.sprite.play();

    this.spawned = true;
  }

  set x(x: number) {
    this.sprite.x = x;
  }

  set y(y: number) {
    this.sprite.y = y;
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }

  get hitbox() {
    return this.sprite.getBounds();
  }

  get w() {
    return this.sprite.getBounds().width;
  }

  get h() {
    return this.sprite.getBounds().height;
  }

  despawn() {
    this.sprite.parent.removeChild(this.sprite);
  }

  playAnimation(animName: string) {
    if (!this.spawned) {
      throw new Error("Entity must be spawned first");
    }
    const anim = this.animations[animName];
    if (!anim) {
      throw new Error(
        `Animation name ${animName} doesn't exist on this entity`
      );
    }
    this.sprite.textures = this.animations[animName];

    this.sprite.play();
  }

  update(_dt: number) {}
}
