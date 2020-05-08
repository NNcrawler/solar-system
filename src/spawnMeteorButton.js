import { Sprite, loader, Point } from 'pixi.js';

export default class SpawnMeteorButton {
  constructor(position, btnTexture, txtTexture) {
    this.position = new Point(position.x, position.y);
    this.btnTexture = btnTexture;
    this.txtTexture = txtTexture;
  }

  setup(stage) {
    this.pSpriteObj = this.renderBtn();

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
    stage.addChild(this.renderText());
  }

  renderBtn() {
    const btn = new Sprite(
      loader.resources[this.btnTexture].texture
    );
    btn.position = this.position;
    btn.anchor.set(0.5);

    return btn;
  }

  renderText() {
    const txt = new Sprite(
      loader.resources[this.txtTexture].texture
    );
    txt.position = this.position;
    txt.position.y = txt.position.y + 30;
    txt.anchor.set(0.5);
    return txt;
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
      if ((offset > maxY && !isInvert) || (offset <= 0 && isInvert)) {
        isInvert = !isInvert;
      }
    };
  }

  onClick(callback) {
    this.pSpriteObj.on('mouseover', callback);
    this.pSpriteObj.on('click', callback);
    this.pSpriteObj.on('tap', callback);
  }
}
