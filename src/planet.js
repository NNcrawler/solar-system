import { loader, Sprite } from 'pixi.js';

export default class Planet {
  constructor(position, length, assetSource) {
    this.spriteOptions = {
      position,
      length,
      assetSource
    };
    this.pSpriteObj;
    this.count = 0;
  }

  load(stage) {
    return new Promise((resolve, reject) => {
      const { position, length, assetSource } = this.spriteOptions;
      try {
        loader.add(assetSource).load(() => {
          this.pSpriteObj = new Sprite(loader.resources[assetSource].texture);
          this.pSpriteObj.position = position;
          this.pSpriteObj.width = this.pSpriteObj.height = length;
          this.pSpriteObj.anchor.set(0.5, 0.5);
          stage.addChild(this.pSpriteObj);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  spin(ticker, radians) {
    ticker.add(() => {
      this.pSpriteObj.rotation += radians;
    });
  }

  position() {
    return this.pSpriteObj.transform.position;
  }

  rotate(ticker, r, speedFactor, planetObject) {
    ticker.add(() => {
      this.count = this.count + speedFactor;
      this.pSpriteObj.x = planetObject.position().x + r * Math.cos(this.count);
      this.pSpriteObj.y = planetObject.position().y + r * Math.sin(this.count);
    });
  }
}
