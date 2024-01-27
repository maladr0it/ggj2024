//
// game state
//
import {Dino} from "./entities/Dino";
import {inputSource_create} from "./inputSource";

const keyboard = inputSource_create();
const dino = new Dino();

export const state = {
  dino,
  keyboard,
  distance: 0, // distance the dino has travelled
  runSpeed: 0,
};
