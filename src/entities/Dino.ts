import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { state } from "../state";
import { playSound } from "../audio";
import { DinoHead } from "./DinoHead";
import { Entity } from "./Entity";
import { DinoSalsa } from "./DinoSalsa";

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
  private prev_jumping = false;

  deathState: "ALIVE" | "DYING" | "DEAD" = "ALIVE";
  deathTimer = 2;
  private head: DinoHead | null = null;

  constructor() {
    super(animations, "jumping");
  }

  despawn(): void {
    super.despawn();
    if (this.head) {
      this.head.despawn();
    }
  }

  update(dt: number) {
    // update head
    if (this.head) {
      this.head.update(dt);
    }

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
    if (this.deathState === "ALIVE") {
      this.deathState = "DYING";
      this.playAnimation("decapitate");

      this.head = new DinoHead();

      this.head.spawn(state.clipContainer, this.x, this.y);
    }
  }

  dieFromCar() {
    if (this.deathState === "ALIVE") {
      this.deathState = "DYING";
      this.playAnimation("roadkill");

      const salsa = new DinoSalsa();
      salsa.spawn(this.sprite, 0, 0);
    }
  }
}
