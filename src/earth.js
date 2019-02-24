import { Point } from 'pixi.js';
import earthSvg from '../assets/earth.svg';
import Planet from './planet';

export default class Earth {
  constructor(screenWidth, screenHeight) {
    const position = new Point(screenWidth / 2, screenHeight / 2);
    const length = 50;
    return new Planet(position, length, earthSvg);
  }
}
