import { loader, Sprite, Point } from 'pixi.js';

export default class Planet {
  constructor(position, length, assetSource) {
    this.position = position;
    this.length = length;
    this.assetSource = assetSource;
    this.pSpriteObj;
    this.count = 0
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

  spin(ticker, radians) {
    ticker.add(() => {
      this.pSpriteObj.rotation += radians;
    });
  }

  rotate(ticker, r) {
    const originalPosition = this.pSpriteObj.position;
    ticker.add(() => {
      this.count = this.count + 1 ;
      this.pSpriteObj.x = (r * Math.cos(this.count/10)) + originalPosition.x;
      this.pSpriteObj.y = (r * Math.sin(this.count/10)) + originalPosition.y;
      // this.pSpriteObj.x = (this.count - 500) * (this.count - 500)/ r*r;
      // this.pSpriteObj.y = (this.count - 500) * (this.count - 500)/ r*r;
      // console.log(this.count)
      // console.log(this.pSpriteObj.x);
    })
  }
}
