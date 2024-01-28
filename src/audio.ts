import { Player } from "tone";
import { Assets, assets } from "./assets";
import { lerp } from "./utils/math";

type AudioName = keyof Assets["audio"];
export const playSound = (name: AudioName, varyPitch = false) => {
  const player = new Player(assets().audio[name]);
  if (varyPitch) player.playbackRate = lerp(0.8, 1.2, Math.random());
  player.toDestination().start();
};
