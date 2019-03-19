import Vector from 'victor';

class RicochetMovement {
  constructor(speedFactor, windowWidth, windowHeight) {
    this.speedFactor = speedFactor;
    this.windowHeight = windowHeight;
    this.windowWidth = windowWidth;

    this.invertX = false;
    this.invertY = false;
  }

  toggleInvertX(curX) {
    if (curX + 1 > this.windowWidth && !this.invertX) {
      this.invertX = !this.invertX;
    };
    if (curX + 1 < 0 && this.invertX) {
      this.invertX = !this.invertX;
    };
  }

  toggleInvertY(curY) {
    if (curY + 1 > this.windowHeight && !this.invertY) {
      this.invertY = !this.invertY;
    };
    if (curY + 1 < 0 && this.invertY) {
      this.invertY = !this.invertY;
    };
  }

  vectorAdder(currentPosition) {
    const {x, y} = currentPosition;
    const { speedFactor } = this;
    const vector = new Vector(speedFactor + 10, speedFactor + 10);
    this.toggleInvertY(y);
    this.toggleInvertX(x);
    this.invertY && vector.invertY();
    this.invertX && vector.invertX();
    return vector;
  }

  nextPosition(currentPosition) {
    const currentVector = new Vector(currentPosition.x, currentPosition.y);
    currentVector.add(this.vectorAdder(currentPosition));
    return currentVector;
  }
}

export default RicochetMovement;
