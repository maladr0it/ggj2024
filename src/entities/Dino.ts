import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { GameStatus, setGameStatus, state } from "../state";
import { playSound } from "../audio";
import { DinoHead } from "./DinoHead";
import { Entity } from "./Entity";
import { DinoSalsa } from "./DinoSalsa";
import { Cactus, CactusState } from "./Cactus";
import { Car } from "./Car";

// Assets
const animations: Record<string, PIXI.Texture[]> = {
  running: [
    await PIXI.Texture.fromURL("sprites/dino-run1.png"),
    await PIXI.Texture.fromURL("sprites/dino-run2.png"),
  ],
  jumping: [await PIXI.Texture.fromURL("sprites/dino-jump1.png")],
  decapitate: [await PIXI.Texture.fromURL("sprites/dino-decap.png")],
  roadkill: [await PIXI.Texture.fromURL("sprites/dino-roadkill1.png")],
};

export class Dino extends Entity {
  public alive = true;
  private prev_jumping = false;
  private head: DinoHead | null = null;
  private salsa: DinoSalsa | null = null;

  constructor() {
    super(animations, "jumping");
  }

  despawn(): void {
    if (this.head) {
      this.head.despawn();
    }
    if (this.salsa) {
      this.salsa.despawn();
    }
    super.despawn();
  }

  update(dt: number) {
    // update head
    if (this.head) {
      this.head.update(dt);
    }

    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL);

    if (!this.alive) return;

    const isGrounded = this.y === GROUND_LEVEL;

    if (isGrounded) {
      if (state.keyboard.activeButtons.has("jump") && !this.prev_jumping) {
        this.prev_jumping = true;
        this.dy = JUMP_VEL;
        playSound("jump");
      } else {
        this.playAnimation("running");
      }
    } else {
      this.playAnimation("jumping");
    }

    if (state.keyboard.activeButtons.has("jump")) {
      this.prev_jumping = true;
    } else {
      this.prev_jumping = false;
    }
  }

  dieWithDecapitation() {
    if (this.alive) {
      this.alive = false;
      this.playAnimation("decapitate");

      this.head = new DinoHead(state.distance);
      this.head.spawn(state.scene, this.x, this.y);
    }
  }

  dieFromCar() {
    if (this.alive) {
      this.alive = false;
      this.playAnimation("roadkill");

      this.salsa = new DinoSalsa();
      this.salsa.spawn(state.scene, this.x - 120, GROUND_LEVEL);
    }
  }

  onCollide(other: Entity): void {
    if (other instanceof Cactus && other.state === CactusState.Alive) {
      this.dieWithDecapitation();
      setGameStatus(GameStatus.GameOver);
    }
    if (other instanceof Car) {
      this.dieFromCar();
      setGameStatus(GameStatus.GameOver);
    }
  }
}
