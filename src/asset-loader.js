import { loader } from 'pixi.js';
import sun from '~/assets/sun.svg';
import earth from '~/assets/earth.svg';
import moon from '~/assets/moon.svg';
import trigger from '~/assets/trigger.png';
import meteor from '~/assets/star.png';
import text from '~/assets/TEXT.png';

export default {
  load: () => {
    return new Promise((resolve, reject) => {
      loader
        .add([
          sun,
          earth,
          moon,
          trigger,
          meteor,
          text
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
    meteor,
    text
  }
}
