import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { state } from "../state";
import { playSound } from "../audio";
import { DinoHead } from "./DinoHead";
import { Entity } from "./Entity";

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
  private dy = 0;
  private dx = 0;
  private prev_jumping = false;

  deathState: "ALIVE" | "DYING" | "DEAD" = "ALIVE";
  deathTimer = 2;

  constructor() {
    super(animations, "jumping");
  }

  update(dt: number) {
    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL);

    if (this.deathState === "DYING") {
      this.deathTimer -= dt;
      if (this.deathTimer <= 0) {
        this.deathState = "DEAD";
      }
      return;
    }

    if (this.deathState === "DEAD") return;

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
    if (this.deathState !== "ALIVE") return;
    this.deathState = "DYING";
    this.playAnimation("decapitate");
    playSound("die");
    const head = new DinoHead();
    head.spawn(this.sprite.parent, state.dino.x + state.distance, state.dino.y);
    state.level.push(head);
  }

  dieFromCar() {
    if (this.deathState !== "ALIVE") return;
    this.deathState = "DYING";
  }
}
