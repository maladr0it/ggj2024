import { Cactus } from "./entities/Cactus";

import { Entity } from "./entities/Entity";
import { Car } from "./entities/Car";
import { DEBUG } from "./constants";
import { Tornado } from "./entities/Tornado";
import { UFO } from "./entities/UFO";
import { Goal } from "./entities/Goal";
import { SurpriseCactus } from "./entities/SurpriseCactus";
import { Spider } from "./entities/Spider";
import { GhostCactus } from "./entities/GhostCactus";
import { CactusWithGun } from "./entities/CactusWithGun";
import { GunPickup } from "./entities/GunPickup";

export const generateLevel = (): Entity[] => {
  let x = 0;
  const i = (n: number) => {
    x += n;
    return x;
  };

  if (DEBUG) {
    return [
      new Goal(i(1000)),
    ];
  }

  return [
    new Cactus(i(800)),
    new Cactus(i(800)),
    new Cactus(i(800)),

    //
    // car surprise
    new Car(i(200)),
    new Cactus(i(200)),
    new Cactus(i(25)),

    //
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
    new Cactus(i(150)),
    // cactus gap
    new Cactus(i(150)),
    // surprise
    new Car(i(650)),

    // ghost cactuses
    new GhostCactus(i(400)),
    new GhostCactus(i(400)),
    new GhostCactus(i(400)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new GhostCactus(i(25)),
    new Car(i(300)),
    new Car(i(50)),
    //
    // jump scare
    new Cactus(i(200)),
    new Cactus(i(200)),
    new Cactus(i(200)),
    new Spider(i(150)),

    new Cactus(i(250)),
    new Cactus(i(50)),
    new Cactus(i(200)),
    new Cactus(i(200)),

    new SurpriseCactus(i(400)),
    new GunPickup(i(600)),
    new Cactus(i(400)),
    new Cactus(i(400)),
    new Cactus(i(400)),
    new Cactus(i(125)),
    new Cactus(i(125)),

    new CactusWithGun(i(400)),
    //

    new Goal(i(800)),
  ];
};
