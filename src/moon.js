import { Point } from 'pixi.js';
import moonSvg from '../assets/moon.svg';
import Planet from './planet';

export default class Moon {
  constructor(screenWidth, screenHeight) {
    const position = new Point(screenWidth / 3, screenHeight / 4);
    const length = 20;
    return new Planet(position, length, moonSvg);
  }
}
