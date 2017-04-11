export default class Canvas{
  constructor() {
    this._Canvas = document.createElement('canvas');
    this._Content = this._Canvas.getContext('2d');
  }
  
  ctx() {
    return this._Content;
  }

  element() {
    return this._Canvas;
  }

  resize(w = this._Canvas.width, h = this._Canvas.height) {
    this._Canvas.width = w;
    this._Canvas.height = h;
    return this;
  }
}
