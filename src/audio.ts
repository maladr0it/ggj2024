import { Player } from "tone";
import { Assets, assets } from "./assets";

type AudioName = keyof Assets["audio"];
export const playSound = (name: AudioName) =>
  new Player(assets().audio[name]).toDestination().start();
