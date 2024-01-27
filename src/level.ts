import { Cactus } from "./entities/Cactus";
import * as PIXI from "pixi.js";

export interface LevelEntity {
  update(dt: number): void;
  sprite: PIXI.AnimatedSprite;
}

export const level: LevelEntity[] = [Cactus.spawn(1000), Cactus.spawn(2000)];
