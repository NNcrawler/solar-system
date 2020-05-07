import { Sprite, loader, Point } from 'pixi.js';

export default class SpawnMeteorButton {
  constructor(position, texture) {
    this.position = new Point(position.x, position.y);
    this.texture = texture;
  }

  setup(stage) {
    this.pSpriteObj = new Sprite(
      loader.resources[this.texture].texture
    );
    this.pSpriteObj.position = this.position;
    this.pSpriteObj.anchor.set(0.5);

    stage.addChild(this.pSpriteObj);
  }

  shake(maxY, adder) {
    let offset = 1;
    let isInvert = false;
    return () => {
      if (offset <= maxY && !isInvert) {
        this.pSpriteObj.y += adder;
        offset++;
      } else if (offset >= 0 && isInvert) {
        this.pSpriteObj.y -= adder;
        offset--;
      }
      if ((offset > maxY && !isInvert) || (offset < maxY && isInvert)) {
        isInvert = !isInvert;
      }
    };
  }

  onClick(callback) {
    this.pSpriteObj.interactive = true;
    this.pSpriteObj.on('mouseover', callback);
    this.pSpriteObj.on('click', callback);
  }
}
