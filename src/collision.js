class Collision {
  constructor(objects) {
    this.objects = objects;
  }

  isCollide(objectPosition) {
    for(let element of this.objects) {
      if (element.collideWith(objectPosition.x, objectPosition.y)) {
        return true;
      }
    }
    return false;
  }
}

export default Collision;
