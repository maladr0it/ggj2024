import { Cactus } from "./entities/Cactus";

import { GunPickup } from "./entities/GunPickup";
import { Entity } from "./entities/Entity";
import { Car } from "./entities/Car";
import { PopUpTrigger } from "./entities/PopUpTrigger";
import { DEBUG } from "./constants";
import { UFO } from "./entities/UFO";
import { Tornado } from "./entities/Tornado";

export const generateLevel = (): Entity[] => {
  if (DEBUG) {
    return [new Tornado(1000)];
  }

  return [
    // normal game
    new Cactus(800),
    new Cactus(1600),
    new Cactus(2400),

    // car surprise
    new Car(2600),

    // triple cactus
    new Cactus(2800),
    new Cactus(2825),
    new Cactus(2850),

    // give gun and teach to use it
    new GunPickup(3500),
    new Cactus(4000),
    new Cactus(4300),
    new Cactus(4600),

    // // many cacti, shoot them
    // new Cactus(4000),
    // new Cactus(4010),
    // new Cactus(4020),
    // new Cactus(4030),

    // new PopUpTrigger({
    //   x: 4200,
    //   title: "Problem",
    //   text: "⚠️<br />No network",
    // }),
    // new PopUpTrigger({
    //   x: 4600,
    //   title: "Problem",
    //   text: "🛜<br />Can't reach server",
    // }),

    // new Cactus(3200),
    // new Cactus(3500),
    // new Cactus(3800),
    // new Cactus(4100),
    // new GunPickup(3000),
  ];
};
