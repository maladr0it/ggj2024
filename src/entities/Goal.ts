import { Entity } from "./Entity";
import { state } from "../state";
import { GROUND_LEVEL } from "../constants";
import { sprites } from "../assets";

export class Goal extends Entity {
  offset: number;
  constructor(offset: number) {
    super(
      {
        default: [
          sprites["modem/modem-broken1.png"],
          sprites["modem/modem-broken2.png"],
          sprites["modem/modem-broken3.png"],
          sprites["modem/modem-broken4.png"],
        ],
        working: [
          sprites["modem/modem-working1.png"],
          sprites["modem/modem-working2.png"],
          sprites["modem/modem-working3.png"],
          sprites["modem/modem-working4.png"],
        ],
      },
      "default"
    );
    this.x = offset;
    this.offset = offset;
    this.sprite.y = GROUND_LEVEL;
  }
  completed = false;
  update() {
    this.x = this.offset - state.distance;
  }
}
