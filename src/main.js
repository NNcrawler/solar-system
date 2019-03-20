import * as P from 'pixi.js';
import '@babel/polyfill';
import Sun from './sun.js';
import Earth from './earth.js';
import Moon from './moon.js';
import Meteor from './meteor.js';

import Movement from './ricochetMovement.js';
import Collision from './collision.js';

document.addEventListener('DOMContentLoaded', async function(event) {
  const app = new P.Application({
    width: window.outerWidth,
    height: window.outerHeight
  });
  app.renderer.backgroundColor = 0x071335;
  document.body.appendChild(app.view);

  const sun = new Sun(window.outerWidth, window.outerHeight);
  const earth = new Earth(window.outerWidth, window.outerHeight);
  const moon = new Moon(window.outerWidth, window.outerHeight);

  const meteor = new Meteor(750, 500, 17);
  meteor.setMovement(new Movement(1, window.outerWidth, window.outerHeight))
  const sunCollision = new Collision([sun]);

  await sun.load(app.stage);
  await earth.load(app.stage);
  await moon.load(app.stage);
  await meteor.load(app.stage);

  sun.spin(app.ticker, 0.05);
  earth.spin(app.ticker, 0.02);
  moon.spin(app.ticker, 0.005);

  const meteorAnimation = () => {
    
    meteor.shoot();
    if (meteor.collide(sunCollision)) {
      app.ticker.remove(meteorAnimation);
      meteor.destroy();
    }
  }
  
  app.ticker.add(meteorAnimation)
  
  earth.rotate(app.ticker, 300, 0.006, sun);
  moon.rotate(app.ticker, 100, 0.05, earth);
});
