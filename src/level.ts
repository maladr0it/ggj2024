import { Cactus } from "./entities/Cactus";

import { Entity } from "./entities/Entity";
import { Car } from "./entities/Car";
import { DEBUG } from "./constants";
import { Tornado } from "./entities/Tornado";
import { UFO } from "./entities/UFO";

export const generateLevel = (): Entity[] => {
  let x = 0;
  const i = (n: number) => {
    x += n;
    return x;
  };

  if (DEBUG) {
    return [new UFO(i(1000))];
  }

  return [
    new Cactus(i(800)),
    new Cactus(i(800)),
    new Cactus(i(800)),
    // car surprise
    new Car(i(200)),
    // double cactus
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
    new Cactus(i(150)),

    // // give gun and teach to use it
    // new GunPickup(3500),
    // new Cactus(4000),
    // new Cactus(4300),
    // new Cactus(4600),
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
