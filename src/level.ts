import { Cactus } from "./entities/Cactus";

import { GunPickup } from "./entities/GunPickup";
import { Entity } from "./entities/Entity";
import { UFO } from "./entities/UFO";
import { Car } from "./entities/Car";

export const generateLevel = (): Entity[] => [
  new Cactus(1000),
  new Cactus(2000),
  // new UFO(2000),
  new Car(10_000),
  // new GunPickup(3000),
  // new Cactus(3150),
];
