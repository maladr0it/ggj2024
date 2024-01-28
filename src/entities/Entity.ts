import * as PIXI from "pixi.js";
import { state } from "../state";

const DEFAULT_ANIMATION_SPEED = 0.2;

export abstract class Entity {
  private spawned = false;
  sprite: PIXI.AnimatedSprite;
  animations: Record<string, PIXI.Texture[]>;
  currentAnimation: string;

  constructor(
    animations: Record<string, PIXI.Texture[]>,
    defaultAnimation: string
  ) {
    this.animations = animations;
    this.currentAnimation = defaultAnimation;

    this.sprite = new PIXI.AnimatedSprite(this.animations[defaultAnimation]);
    this.sprite.anchor.set(0, 1);
    this.sprite.animationSpeed = DEFAULT_ANIMATION_SPEED;
  }

  spawn(container: PIXI.Container, x: number, y: number) {
    container.addChild(this.sprite);
    this.x = x;
    this.y = y;

    this.spawned = true;

    this.sprite.play();

    state.entities.add(this);
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
    const { entities } = state;
    const { sprite } = this;
    sprite.parent.removeChild(sprite);
    entities.delete(this);
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
    if (animName === this.currentAnimation) return;
    this.currentAnimation = animName;
    this.sprite.textures = this.animations[animName];

    this.sprite.play();
  }

  update(_dt: number) {}

  isCollidingWith(hitbox: PIXI.Rectangle) {
    return this.sprite.getBounds().intersects(hitbox);
  }
}
