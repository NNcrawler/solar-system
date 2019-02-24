import { Point, loader, Sprite } from 'pixi.js';
import sunSvg from '../assets/sun.svg';

export default class Sun {
  constructor(screenWidth, screenHeight) {
    this.position = new Point(screenWidth / 2, screenHeight / 2);
    this.length = 100;
    this.pSpriteObj;
  }

  load(stage) {
    return new Promise((resolve, reject) => {
      try {
        loader.add(sunSvg).load(() => {
          this.pSpriteObj = new Sprite(loader.resources[sunSvg].texture);
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
