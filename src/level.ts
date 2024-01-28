import { Cactus } from "./entities/Cactus";

import { Entity } from "./entities/Entity";
import { Car } from "./entities/Car";
import { DEBUG } from "./constants";
import { Tornado } from "./entities/Tornado";
import { UFO } from "./entities/UFO";
import { Goal } from "./entities/Goal";
import { SurpriseCactus } from "./entities/SurpriseCactus";
import { Spider } from "./entities/Spider";

export const generateLevel = (): Entity[] => {
  let x = 0;
  const i = (n: number) => {
    x += n;
    return x;
  };

  if (DEBUG) {
    return [new Spider(i(1000))];
    // return [new SurpriseCactus(i(1000))],
  }

  return [
    new Cactus(i(800)),
    new Cactus(i(800)),
    new Cactus(i(800)),

    // car surprise
    new Car(i(200)),

    new Cactus(i(200)),
    new Cactus(i(25)),

    // tornado
    new Tornado(i(300)),
    new Cactus(i(75)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    // cactus gap
    new Cactus(i(125)),
    new Cactus(i(25)),
    new Cactus(i(25)),
    // surprise
    new Car(i(600)),

    // thread the needle
    new Cactus(i(1000)),
    new Cactus(i(125)),
  ];
};
