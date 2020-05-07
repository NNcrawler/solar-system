import * as P from 'pixi.js';
import '@babel/polyfill';
import Sun from './sun.js';
import Earth from './earth.js';
import Moon from './moon.js';
import Meteor from './meteor.js';

import Loader from './asset-loader';

import Movement from './ricochetMovement.js';
import Collision from './collision.js';
import SpawnMeteorButton from './spawnMeteorButton.js';

function spawnRandomMeteor(
  windowWidth,
  windowHeight,
  sunCollision,
  ticker,
  stage,
  meteorTexture
) {
  const meteor = Meteor.withRandomPosition(windowWidth, windowHeight, meteorTexture);
  meteor.setMovement(new Movement(6, windowWidth, windowHeight));
  meteor.setup(stage);

  const meteorAnimation = () => {
    meteor.shoot();
    if (meteor.collide(sunCollision)) {
      ticker.remove(meteorAnimation);
      meteor.destroy();
    }
  };

  ticker.add(meteorAnimation);
}

document.addEventListener('DOMContentLoaded', async function (event) {
  const app = new P.Application({
    width: window.outerWidth - 20,
    height: window.outerHeight - 135
  });
  app.renderer.backgroundColor = 0x071335;
  document.body.appendChild(app.view);

  const { width: appWidth, height: appHeight } = app.screen;

  await Loader.load();
  const sun = new Sun(appWidth, appHeight, Loader.map.sun);
  const earth = new Earth(appWidth, appHeight, Loader.map.earth);
  const moon = new Moon(appWidth, appHeight, Loader.map.moon);
  const spawnMeteorButton = new SpawnMeteorButton({
    x: 100,
    y: appHeight / 10
  }, Loader.map.trigger);

  const sunCollision = new Collision([sun]);

  sun.setup(app.stage);
  earth.setup(app.stage);
  moon.setup(app.stage);
  spawnMeteorButton.setup(app.stage);

  sun.spin(app.ticker, 0.05);
  earth.spin(app.ticker, 0.02);
  moon.spin(app.ticker, 0.005);
  const buttonShake = spawnMeteorButton.shake(3, 3);

  app.ticker.add(buttonShake);

  spawnMeteorButton.onClick(
    () =>
      spawnRandomMeteor(
        appWidth,
        appHeight,
        sunCollision,
        app.ticker,
        app.stage,
        Loader.map.meteor
      )
  );

  earth.rotate(app.ticker, 300, 0.006, sun);
  moon.rotate(app.ticker, 100, 0.05, earth);
});
