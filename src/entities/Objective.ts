import { Entity } from "./Entity";
import { state } from "../state";
import { GROUND_LEVEL } from "../constants";
import { Dino } from "./Dino";
import * as PIXI from "pixi.js";
import { sprites } from "../assets";

export class Objective extends Entity {
  offset: number;
  onCompleted: () => void;
  constructor(
    offset: number,
    texture: PIXI.Texture,
    onCompleted: () => void = () => console.log("well done")
  ) {
    super({ default: [texture] }, "default");
    this.x = offset;
    this.offset = offset;
    this.sprite.y = GROUND_LEVEL;
    this.onCompleted = onCompleted;
  }
  onCollide(other: Entity): void {
    if (other instanceof Dino) {
      this.onCompleted();
      this.despawn();
    }
  }
  update() {
    this.x = this.offset - state.distance;
  }
}

export const createObjective1 = (x: number) =>
  new Objective(x, sprites["cactus-burn1.png"], () => {
    document.querySelector(".objective-1")!.classList.add("objective-complete");
  });

export const createObjective2 = (x: number) =>
  new Objective(x, sprites["cactus-burn1.png"], () => {
    document.querySelector(".objective-2")!.classList.add("objective-complete");
  });

export const createObjective3 = (x: number) =>
  new Objective(x, sprites["cactus-burn1.png"], () => {
    document.querySelector(".objective-3")!.classList.add("objective-complete");
  });

export const createObjective4 = (x: number) =>
  new Objective(x, sprites["cactus-burn1.png"], () => {
    document.querySelector(".objective-4")!.classList.add("objective-complete");
  });

export const resetObjectives = () => {
  for (const element of document.querySelectorAll(".objective")) {
    element.classList.remove("objective-complete");
  }
};
