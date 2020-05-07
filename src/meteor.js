import { Sprite, loader, Point } from 'pixi.js';
import Vector from 'victor';

export default class Meteor {
  static withRandomPosition(windowWidth, windowHeight, texture) {
    const { x, y } = new Vector().randomize(
      Vector(0, 0),
      Vector(windowWidth, windowHeight)
    );
    const diameter = Math.random() * 50;
    return new Meteor(x, y, diameter, texture);
  }

  constructor(x, y, length, texture) {
    this.options = {
      position: new Point(x, y),
      length
    };
    this.texture = texture
  }

  setMovement(movement) {
    this.movement = movement;
  }

  setup(stage) {
    this.pSpriteObj = new Sprite(loader.resources[this.texture].texture);
    this.pSpriteObj.position = this.options.position;
    this.pSpriteObj.width = this.pSpriteObj.height = this.options.length;
    stage.addChild(this.pSpriteObj);
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
