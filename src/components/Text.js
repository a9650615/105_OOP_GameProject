import Element from './Element';

export default class Text extends Element {
  constructor(props) {
    super(props);
  }

  initialize() {
    this.text = '';
    this.style = {};
    this.position = { x: 20, y: 20};
  }
  
  setStyle(option) {
    this.style = option;
    this.position.x = option.x;
    this.position.y = option.y;

    return this;
  }

  setText(text) {
    this.text = text;

    return this;
  }

  draw(ctx) {
    ctx.font = this.style.font || '25px Arial';
    ctx.textAlign = this.style.textAlign || 'center';
    ctx.fillStyle = this.style.color || 'black';
    ctx.fillText(this.text, this.position.x, this.position.y);
  }

  update() {
  }
}