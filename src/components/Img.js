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
      naturalHeight: null,
      naturalWidth: null,
      url: null
    };
    
  }

  _getAutoSize(w = null, h = null, naturalWidth = 0, naturalHeight = 0) {
    let scale = 1;
    if (w&&!h) {
      scale = w/naturalWidth;
    } else if(h&&!w) {
      scale = h/naturalHeight;
    } else if(!h&&!w) {
      return {width: null, height: null};
    };
    
    return {
      width: naturalWidth * scale,
      height: naturalHeight * scale
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
        let scaleSize = this._getAutoSize(obj['width'], obj['height'], img.naturalWidth, img.naturalHeight);
        obj['width'] = scaleSize['width'];
        obj['height'] = scaleSize['height'];
        this.preLoadImg = img;
        obj['naturalWidth'] = img.naturalWidth;
        obj['naturalHeight'] = img.naturalHeight;
        this._tmpCanvas.resize(obj['width']||obj['naturalWidth'], obj['height']||obj['naturalHeight']);
        this.setState(Object.assign(setting, obj));
      });
    return this;
  }

  render(ctx) {
    let obj = this.state;
    ctx.drawImage(this.preLoadImg, 0, 0, 
      obj['width']||obj['naturalWidth'], 
      obj['height']||obj['naturalHeight']);
  }

}

export default Img;
