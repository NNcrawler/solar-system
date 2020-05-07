import { loader, Sprite, Circle } from 'pixi.js';

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

  setup(stage) {
    const { position, length, assetSource } = this.spriteOptions;
    this.pSpriteObj = new Sprite(loader.resources[assetSource].texture);
    this.pSpriteObj.position = position;
    this.pSpriteObj.width = this.pSpriteObj.height = length;
    this.pSpriteObj.anchor.set(0.5, 0.5);
    this.pSpriteObj.hitArea = new Circle(position.x, position.y, length / 2);
    stage.addChild(this.pSpriteObj);
  }

  spin(ticker, radians) {
    ticker.add(() => {
      this.pSpriteObj.rotation += radians;
    });
  }

  position() {
    return this.pSpriteObj.transform.position;
  }

  collideWith(x, y) {
    return this.pSpriteObj.hitArea.contains(x, y);
  }

  rotate(ticker, r, speedFactor, planetObject) {
    ticker.add(() => {
      this.count = this.count + speedFactor;
      this.pSpriteObj.x = planetObject.position().x + r * Math.cos(this.count);
      this.pSpriteObj.y = planetObject.position().y + r * Math.sin(this.count);
    });
  }
}
