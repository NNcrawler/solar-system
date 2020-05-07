import { loader } from 'pixi.js';
import sun from '~/assets/sun.svg';
import earth from '~/assets/earth.svg';
import moon from '~/assets/moon.svg';
import trigger from '~/assets/trigger.png';
import meteor from '~/assets/star.png';

export default {
  load: () => {
    return new Promise((resolve, reject) => {
      loader
        .add([
          sun,
          earth,
          moon,
          trigger,
          meteor
        ])
        .load(() => {
          resolve({
            sun
          })
        })
    })
  },
  map: {
    sun,
    earth,
    moon,
    trigger,
    meteor
  }
}
