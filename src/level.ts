import { Cactus } from "./entities/Cactus";
import * as PIXI from "pixi.js";

export interface LevelEntity {
  update(dt: number): void;
  sprite: PIXI.AnimatedSprite;
}

export const level: LevelEntity[] = [new Cactus(1000), new Cactus(2000)];
