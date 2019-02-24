import { Point, loader, Sprite } from 'pixi.js';
import earthSvg from '../assets/earth.svg';

export default class Earth {
  constructor(screenWidth, screenHeight) {
    this.position = new Point(screenWidth / 3, screenHeight / 3);
    this.length = 50;
    this.pSpriteObj;
  }

  load(stage) {
    return new Promise((resolve, reject) => {
      try {
        loader.add(earthSvg).load(() => {
          this.pSpriteObj = new Sprite(loader.resources[earthSvg].texture);
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
