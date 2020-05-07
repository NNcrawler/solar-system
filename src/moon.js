import { Point } from 'pixi.js';
import Planet from './planet';

export default class Moon {
  constructor(screenWidth, screenHeight, texture) {
    const position = new Point(screenWidth / 3, screenHeight / 4);
    const length = 20;
    return new Planet(position, length, texture);
  }
}
