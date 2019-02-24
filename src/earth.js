import { Point } from 'pixi.js';
import earthSvg from '../assets/earth.svg';
import Planet from './planet';

export default class Earth {
  constructor(screenWidth, screenHeight) {
    const position = new Point(screenWidth / 3, screenHeight / 3);
    const length = 50;
    return new Planet(position, length, earthSvg);
  }
}
