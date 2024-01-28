import * as PIXI from "pixi.js";
import { ToneAudioBuffer } from "tone";

const SPRITE_PATHS = [
  // dino
  "dino/dino-decap.png",
  "dino/dino-duck1.png",
  "dino/dino-duck2.png",
  "dino/dino-head.png",
  "dino/dino-jump.png",
  "dino/dino-roadkill.png",
  "dino/dino-run1.png",
  "dino/dino-run2.png",
  "dino/dino-salsa1.png",
  "dino/dino-salsa2.png",
  "dino/dino-salsa3.png",
  "dino/dino-salsa4.png",
  "dino/dino-salsa6.png",
  "dino/dino-salsa7.png",
  "dino/dino-salsa5.png",
  "dino/dino-salsa8.png",
  "dino/dino-explode1.png",
  "dino/dino-explode2.png",
  "dino/dino-explode3.png",
  "dino/dino-explode4.png",
  "dino/dino-explode5.png",
  "dino/dino-explode6.png",
  "dino/dino-explode7.png",

  // text
  "text/0.png",
  "text/1.png",
  "text/0.png",
  "text/2.png",
  "text/3.png",
  "text/4.png",
  "text/5.png",
  "text/6.png",
  "text/7.png",
  "text/8.png",
  "text/9.png",
  "text/game-over.png",
  "text/hi.png",

  // ufo
  "ufo/ufo1.png",
  "ufo/ufo2.png",
  "ufo/ufo3.png",
  "ufo/ufo4.png",
  "ufo/ufo5.png",
  "ufo/ufo6.png",
  "ufo/ufo7.png",
  "ufo/ufo8.png",
  "ufo/ufo9.png",
  "ufo/ufo10.png",
  "ufo/ufo11.png",

  // tornado
  "tornado/tornado-1.png",
  "tornado/tornado-2.png",
  "tornado/tornado-3.png",
  "tornado/tornado-4.png",
  "tornado/tornado-5.png",

  // misc sprites
  "bullet.png",
  "cactus-burn1.png",
  "cactus-burn2.png",
  "cactus1.png",
  "cloud.png",
  "ground.png",
  "gun.png",
  "eth-cable.png",
] as const;

const AUDIO_PATHS = ["bang.mp3", "car.mp3", "die.mp3", "jump.mp3"] as const;

const spriteData = await Promise.all(
  SPRITE_PATHS.map(path => PIXI.Texture.fromURL(`sprites/${path}`))
);
const _sprites: Record<string, PIXI.Texture> = {};
for (let i = 0; i < SPRITE_PATHS.length; i += 1) {
  _sprites[SPRITE_PATHS[i]] = spriteData[i];
}
export const sprites = _sprites as Record<
  (typeof SPRITE_PATHS)[number],
  PIXI.Texture
>;

const audioData = await Promise.all(
  AUDIO_PATHS.map(path => new ToneAudioBuffer().load(`audio/${path}`))
);
const _audio: Record<string, ToneAudioBuffer> = {};
for (let i = 0; i < AUDIO_PATHS.length; i += 1) {
  _audio[AUDIO_PATHS[i]] = audioData[i];
}
export const audio = _audio as Record<
  (typeof AUDIO_PATHS)[number],
  ToneAudioBuffer
>;

const loadAssets = async () =>
  awaitValues({
    sprites: awaitValues({
      ground: PIXI.Texture.fromURL("sprites/ground.png", {
        scaleMode: PIXI.SCALE_MODES.NEAREST,
      }),
      cloud: PIXI.Texture.fromURL("sprites/cloud.png", {
        scaleMode: PIXI.SCALE_MODES.NEAREST,
      }),
    }),
    audio: awaitValues({
      jump: new ToneAudioBuffer().load("audio/jump.mp3"),
      die: new ToneAudioBuffer().load("audio/die.mp3"),
      bang: new ToneAudioBuffer().load("audio/bang.mp3"),
      car: new ToneAudioBuffer().load("audio/car.mp3"),
      win: new ToneAudioBuffer().load("audio/win.mp3"),
    }),
  });

export type Assets = Awaited<ReturnType<typeof loadAssets>>;

let _assets: Assets | null = null;

export const assets = () => {
  if (_assets === null) throw new Error("Assets are not loaded");
  return _assets;
};

assets.load = async () => {
  try {
    _assets = await loadAssets();
  } catch (e) {
    console.error("Error loading assets");
    console.error(e);
    throw e;
  }
};

type AwaitedValues<T extends object> = {
  [K in keyof T]: Awaited<T[K]>;
};

const awaitValues = async <T extends object>(
  obj: T
): Promise<AwaitedValues<T>> => {
  const result: Partial<AwaitedValues<T>> = {};
  const keys = Object.keys(obj) as (keyof T)[];
  await Promise.all(
    keys.map(async key => {
      result[key] = await obj[key];
    })
  );
  return result as AwaitedValues<T>;
};
