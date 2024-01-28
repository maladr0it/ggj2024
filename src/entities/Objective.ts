import { Entity } from "./Entity";
import { state } from "../state";
import { GROUND_LEVEL, SCENE_SIZE } from "../constants";
import { Dino } from "./Dino";
import * as PIXI from "pixi.js";
import { sprites } from "../assets";

export class Objective extends Entity {
  offset: number;
  onCompleted: () => void;
  total_time = 0;
  constructor(
    offset: number,
    textures: PIXI.Texture[],
    onCompleted: () => void = () => console.log("well done")
  ) {
    super({ default: textures }, "default");
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
  update(dt: number) {
    this.total_time += dt;
    this.y = GROUND_LEVEL / -4 + Math.sin(this.total_time * 5) * 60;
    this.x = this.offset - state.distance;
    if (state.distance > this.offset) {
      this.x = SCENE_SIZE.x + (this.x % SCENE_SIZE.x);
    }
  }
}

export const createEthCableObjective = (x: number) =>
  new Objective(x, [sprites["eth-cable.png"]], () => {
    document
      .querySelector(".objective-eth-cable")!
      .classList.add("objective-complete");
  });

export const createModemObjective = (x: number) =>
  new Objective(x, [sprites["eth-cable.png"]], () => {
    document
      .querySelector(".objective-modem")!
      .classList.add("objective-complete");
  });

export const createRouterObjective = (x: number) =>
  new Objective(x, [sprites["eth-cable.png"]], () => {
    document
      .querySelector(".objective-router")!
      .classList.add("objective-complete");
  });

export const createReconnectObjective = (x: number) =>
  new Objective(x, [sprites["eth-cable.png"]], () => {
    document
      .querySelector(".objective-reconnect")!
      .classList.add("objective-complete");
  });

export const resetObjectives = () => {
  for (const element of document.querySelectorAll(".objective")) {
    element.classList.remove("objective-complete");
  }
};
