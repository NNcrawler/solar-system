import * as P from 'pixi.js';
import "@babel/polyfill";
import Sun from './sun.js';
import Earth from './earth.js';

document.addEventListener("DOMContentLoaded", async function(event) 
{ 
  const app = new P.Application({width: window.outerWidth, height: window.outerHeight});
  app.renderer.backgroundColor = 0x282c34
  document.body.appendChild(app.view);
  const sun = new Sun(window.outerWidth, window.outerHeight);
  const earth = new Earth(window.outerWidth, window.outerHeight);
  await sun.load(app.stage);
  await earth.load(app.stage);
  sun.rotate(app.ticker, 0.01);
  earth.rotate(app.ticker, 0.005);
});

