import { Player } from "tone";
import { Assets, assets } from "./assets";

type AudioName = keyof Assets["audio"];
export const playSound = (name: AudioName) => {
  const player = new Player(assets().audio[name]);
  player.toDestination().start();
  return player;
};
