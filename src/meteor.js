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
      const loaderCallback = () => {
        this.pSpriteObj = new Sprite(loader.resources[starPng].texture);
        this.pSpriteObj.position = this.options.position;
        this.pSpriteObj.width = this.pSpriteObj.height = this.options.length;
        stage.addChild(this.pSpriteObj);
      };
      try {
        loader.add(starPng).load(() => {
          loaderCallback();
          resolve();
        });
      } catch (e) {
        loaderCallback();
        resolve();
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
    const movement = this.movement || mvmnt;
    const { x: nextX, y: nextY } = movement.nextPosition(
      this.pSpriteObj.position
    );
    this.pSpriteObj.x = nextX;
    this.pSpriteObj.y = nextY;
  }
}
