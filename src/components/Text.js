import GameObject from './GameObject';

export default class Text extends GameObject {
  constructor(props = {}) {
    super(props);
    this.text = '';
    this.style = {};
    this.position = { x: 20, y: 20};
    this.textWidth = undefined;
  }
  
  setStyle(option) {
    this.style = option;
    this.position.x = option.x;
    this.position.y = option.y;

    return this;
  }

  setText(text) {
    this.text = text;
    this.textWidth = this._tmpContent.measureText(text).width * 2.5;
    this._tmpCanvas.resize(this.textWidth);

    return this;
  }

  draw(ctx) {
    let painter = ctx || Framework.Game._context;
    let content = this._tmpContent;
    content.textBaseline = 'top';
    content.font = this.style.font || '25px Arial';
    content.textAlign = this.style.textAlign || 'left';
    content.fillStyle = this.style.color || 'black';
    content.fillText(this.text, 0, 0);
    painter.drawImage(this._tmpCanvas.element(), this.position.x, this.position.y);
  }

  getWidth() {
    return this.textWidth;
  }

}