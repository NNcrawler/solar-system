import * as P from 'pixi.js';
import Sun from './sun.js';

document.addEventListener("DOMContentLoaded", function(event) 
{ 
  const app = new P.Application({width: window.outerWidth, height: window.outerHeight});
  app.renderer.backgroundColor = 0x282c34
  document.body.appendChild(app.view);
  const sun = new Sun(window.outerWidth, window.outerHeight);
  sun.load(app.stage);
});

