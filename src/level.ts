import { Cactus } from "./entities/Cactus";

import { GunPickup } from "./entities/GunPickup";
import { Entity } from "./entities/Entity";
import { UFO } from "./entities/UFO";

export const generateLevel = (): Entity[] => [
  new Cactus(1000),
  new Cactus(2000),
  new GunPickup(3000),
  new Cactus(3150),
  new UFO(2000),
];
