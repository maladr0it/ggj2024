import { Cactus } from "./entities/Cactus";

import { GunPickup } from "./entities/GunPickup";
import { Entity } from "./entities/Entity";
import { Car } from "./entities/Car";
import { PopUpTrigger } from "./entities/PopUpTrigger";

export const generateLevel = (): Entity[] => [
  new Cactus(1000),
  new PopUpTrigger({
    x: 1200,
    title: "Problem",
    text: "⚠️<br />No network",
  }),
  new PopUpTrigger({
    x: 1600,
    title: "Problem",
    text: "🛜<br />Can't reach server",
  }),
  new Cactus(2000),
  new GunPickup(3000),
  new Cactus(3150),
  new Cactus(3200),
  new Cactus(3500),
  new Cactus(3800),
  new Cactus(4100),
  new Car(10_000),
];
