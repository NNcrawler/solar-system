import { Sprite, loader, Point } from 'pixi.js';

export default class SpawnMeteorButton {
  constructor(position, texture) {
    this.position = new Point(position.x, position.y);
    this.texture = texture;
  }

  setup(stage) {
    this.pSpriteObj = new Sprite(
      loader.resources[this.texture].texture
    );
    this.pSpriteObj.position = this.position;
    this.pSpriteObj.anchor.set(0.5);

    this.pSpriteObj.interactive = true;
    this.pSpriteObj.on('mouseover', () => {
      this.pSpriteObj.width = this.pSpriteObj.width * 1.15;
      this.pSpriteObj.height = this.pSpriteObj.height * 1.15;
    })
    this.pSpriteObj.on('mouseout', () => {
      this.pSpriteObj.width = this.pSpriteObj.width * 0.85;
      this.pSpriteObj.height = this.pSpriteObj.height * 0.85;
    })

    stage.addChild(this.pSpriteObj);
  }

  shake(maxY, adder) {
    let offset = 1;
    let isInvert = false;
    return () => {
      if (offset <= maxY && !isInvert) {
        this.pSpriteObj.y += adder;
        offset++;
      } else if (offset >= 0 && isInvert) {
        this.pSpriteObj.y -= adder;
        offset--;
      }
      console.log(isInvert);
      console.log(this.position.y);
      console.log(offset);
      
      
      
      if ((offset > maxY && !isInvert) || (offset <= 0  && isInvert)) {
        isInvert = !isInvert;
      }
    };
  }

  onClick(callback) {
    this.pSpriteObj.on('mouseover', callback);
    this.pSpriteObj.on('click', callback);
  }
}
