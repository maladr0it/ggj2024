import * as PIXI from "pixi.js";

type Entity = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  sprite: PIXI.AnimatedSprite;
  _spriteHandle: PIXI.AnimatedSprite | null;
};

export const entity_create = (sprite: PIXI.AnimatedSprite) => {
  return {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    sprite,
    _spriteHandle: null,
  };
};

export const entity_render = (entity: Entity, stage: PIXI.Container) => {
  if (entity._spriteHandle === null) {
    entity._spriteHandle = stage.addChild(entity.sprite);
  }

  if (entity.sprite !== entity._spriteHandle) {
    stage.removeChild(entity._spriteHandle);
    entity._spriteHandle = stage.addChild(entity.sprite);
  }

  entity._spriteHandle.x = entity.x;
  entity._spriteHandle.y = entity.y;
};
