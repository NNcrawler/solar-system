import { loader, Sprite, Point } from 'pixi.js';

export default class Planet {
  constructor(position, length, assetSource) {
    this.position = position;
    this.length = length;
    this.assetSource = assetSource;
    this.pSpriteObj;
    this.count = 0;
  }

  load(stage) {
    return new Promise((resolve, reject) => {
      try {
        loader.add(this.assetSource).load(() => {
          this.pSpriteObj = new Sprite(
            loader.resources[this.assetSource].texture
          );
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

  spin(ticker, radians) {
    ticker.add(() => {
      this.pSpriteObj.rotation += radians;
    });
  }

  position2() {
    const tr = this.pSpriteObj.transform;
    return tr.position
  }

  rotate(ticker, r, speedFactor) {
    const originalPosition = new Point(this.pSpriteObj.x, this.pSpriteObj.y);
    ticker.add(() => {
      this.count = this.count + speedFactor;
      this.pSpriteObj.x = originalPosition.x + r * Math.cos(this.count);
      this.pSpriteObj.y = originalPosition.y + r * Math.sin(this.count);
    });
  }

  dynamicRotate(ticker, r, speedFactor, object) {
    ticker.add(() => {
      this.count = this.count + speedFactor;
      this.pSpriteObj.x = object.position2().x + r * Math.cos(this.count);
      this.pSpriteObj.y = object.position2().y + r * Math.sin(this.count);
    });
  }
}
