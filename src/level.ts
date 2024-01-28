import { Cactus } from "./entities/Cactus";

import { GunPickup } from "./entities/GunPickup";
import { Entity } from "./entities/Entity";
import { UFO } from "./entities/UFO";
import { Car } from "./entities/Car";
import { Trigger } from "./entities/Trigger";

export const generateLevel = (): Entity[] => [
  new Cactus(1000),
  new Cactus(2000),
  new GunPickup(3000),
  new Cactus(3150),
  new Cactus(3200),
  new Cactus(3500),
  new Cactus(3800),
  new Cactus(4100),
  new Car(10_000),
];
