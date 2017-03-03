import Framework from './framework_es6/index';
import define from './define';

class Pratice {
  
  load() {
    this.pic = new Framework.Sprite(`${define.imagePath}stone.png`);
    this.pic.position = {
      x: 100,
      y: 100
    }
    this.pic.rotation = 0;
    this.position = {
      x: 100,
      y: 100
    }
    this.rotation = 0;
  }

  initialize () {

  }

  update () {
    this.position = {
      x: this.position.x + 0.5,
      y: this.position.y
    }
    this.rotation += 2;
    this.pic.position = this.position
    this.pic.rotation = this.rotation
  }

  draw(ctx) {
    this.pic.draw(ctx)
  }
}

export default Pratice;
