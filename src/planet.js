import { loader, Sprite } from 'pixi.js';

export default class Planet {
  constructor(position, length, assetSource) {
    this.position = position;
    this.length = length;
    this.assetSource = assetSource;
    this.pSpriteObj;
  }

  load(stage) {
    return new Promise((resolve, reject) => {
      try {
        loader.add(this.assetSource).load(() => {
          this.pSpriteObj = new Sprite(loader.resources[this.assetSource].texture);
          this.pSpriteObj.position = this.position;
          this.pSpriteObj.width = this.pSpriteObj.height = this.length;
          this.pSpriteObj.anchor.set(0.5, 0.5);
          stage.addChild(this.pSpriteObj);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });

  }
  rotate(ticker, radians) {
    ticker.add(() => {
      this.pSpriteObj.rotation += radians;
    });
  }
}
