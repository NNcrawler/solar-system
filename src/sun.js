import { Point } from 'pixi.js';
import Planet from './planet';
import sunSvg from '../assets/sun.svg';

export default class Sun {
  constructor(screenWidth, screenHeight) {
    const position = new Point(screenWidth / 2, screenHeight / 2);
    const length = 100;
    const planet = new Planet(position, length, sunSvg);
    return planet;
  }
}
