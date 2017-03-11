import Framework from '../framework_es6';
import GameObject from './GameObject';
import {Resource} from '../constant';

class Image extends GameObject {
  constructor(prop) {
    super(prop);
    this.state = {
      x: 10,
      y: 10,
      width: null,
      height: null,
      image: null
    };
  }

  set(setting) {
    let img = new Framework.Sprite(`${Resource.image}${setting.image}`);

    this.setState(Object.assign(
      setting,
      {image: img}
    ));
  }

  render(ctx) {
    if (this.state.image)
      this.state.image.draw(ctx);
  }

}

export default Image;
