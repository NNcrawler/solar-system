import { Sprite, loader, Point } from 'pixi.js';
import starPng from '../assets/star.png';

export default class Meteor {
  constructor(x, y, length) {
    this.options = {
      position: new Point(x, y),
      length
    };
  }

  setMovement(movement) {
    this.movement = movement;
  }

  load(stage) {
    return new Promise((resolve, reject) => {
      try {
        loader.add(starPng).load(() => {
          this.pSpriteObj = new Sprite(loader.resources[starPng].texture);
          this.pSpriteObj.position = this.options.position;
          this.pSpriteObj.width = this.pSpriteObj.height = this.options.length;
          stage.addChild(this.pSpriteObj);
          console.log(this.pSpriteObj);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  destroy() {
    this.pSpriteObj.destroy();
  }

  collide(collision) {
    return collision.isCollide(this.pSpriteObj.position);
  }

  shoot(mvmnt) {
    const movement = this.movement || mvmnt
    const { x: nextX, y: nextY } = movement.nextPosition(
      this.pSpriteObj.position
    );
    this.pSpriteObj.x = nextX;
    this.pSpriteObj.y = nextY;
  }
}
