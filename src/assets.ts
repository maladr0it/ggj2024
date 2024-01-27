import * as PIXI from "pixi.js";

const loadAssets = async () =>
  awaitValues({
    ground: PIXI.Texture.fromURL("sprites/ground.png"),
    cloud: PIXI.Texture.fromURL("sprites/cloud.png"),
  });

let _assets: Awaited<ReturnType<typeof loadAssets>> | null = null;

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
