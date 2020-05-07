import { Point } from 'pixi.js';
import Planet from './planet';

export default class Sun {
  constructor(screenWidth, screenHeight, texture) {
    const position = new Point(screenWidth / 2, screenHeight / 2);
    const length = 100;
    const planet = new Planet(position, length, texture);
    return planet;
  }
}
