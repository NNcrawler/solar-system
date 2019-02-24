import * as P from 'pixi.js';
import '@babel/polyfill';
import Sun from './sun.js';
import Earth from './earth.js';
import Moon from './moon.js';

document.addEventListener('DOMContentLoaded', async function(event) {
  const app = new P.Application({
    width: window.outerWidth,
    height: window.outerHeight
  });
  app.renderer.backgroundColor = 0x282c34;
  document.body.appendChild(app.view);
  const sun = new Sun(window.outerWidth, window.outerHeight);
  const earth = new Earth(window.outerWidth, window.outerHeight);
  const moon = new Moon(window.outerWidth, window.outerHeight);
  await sun.load(app.stage);
  await earth.load(app.stage);
  await moon.load(app.stage);
  sun.spin(app.ticker, 0.05);
  earth.spin(app.ticker, 0.02);
  moon.spin(app.ticker, 0.005);
  earth.rotate(app.ticker, 300, 0.006, sun);
  moon.rotate(app.ticker, 100, 0.05, earth);
});
