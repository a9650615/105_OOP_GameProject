import Framework from '../framework_es6';
import GameObject from './GameObject';
import {Resource} from '../constant';

class Img extends GameObject {
  constructor(prop) {
    super(prop);
    this.state = {
      x: 10,
      y: 10,
      width: null,
      height: null,
      url: null
    };
    
  }

  set(setting) {
    //let img = new Framework.Sprite(`${Resource.image}${setting.image}`);
    let t = this;
    Framework.ResourceManager.loadImage({id: this._gameObject.uid, url: setting.url})
      .then(() => {
        let img = Framework.ResourceManager.getResource(this._gameObject.uid);
        let obj = Object.assign(
          {},
          this.state,
          setting
        );
        
        this.component.preLoadImg = img;
        obj['width'] = img.naturalWidth;
        obj['height'] = img.naturalHeight;
        this._tmpCanvas.resize(obj['width'], obj['height']);
        this.setState(Object.assign(
          this.state,
          setting
        ));
      });
    return this;
  }

  render(ctx) {
    ctx.drawImage(this.component.preLoadImg, 0, 0);
  }

}

export default Img;
