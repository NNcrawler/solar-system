import { Sprite, loader, Point } from 'pixi.js';
import starPng from '../assets/star.png';

export default class Meteor {
  constructor(x, y, length) {
    this.options = {
      position: new Point(x, y),
      length
    };
  }

  load(stage) {
    return new Promise((resolve, reject) => {
      try {
        loader.add(starPng).load(() => {
          this.pSpriteObj = new Sprite(loader.resources[starPng].texture);
          this.pSpriteObj.position = this.options.position;
          this.pSpriteObj.width = this.pSpriteObj.height = this.options.length;
          stage.addChild(this.pSpriteObj);
          console.log(this.pSpriteObj)
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  shoot(ticker, movement) {
    ticker.add(() => {
      const {x: nextX, y: nextY} = movement.nextPosition(this.pSpriteObj.position);
      this.pSpriteObj.x = nextX;
      this.pSpriteObj.y = nextY;
    })
  }
}
