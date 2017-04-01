import GameObject from './GameObject';

export default class Rectangle extends GameObject {
  constructor(prop) {
    super(prop);

    this.state = {
      background: null,
      borderWidth: 0,
      borderColor: null,
      borderRadius: 0,
      x: 0,
      y: 0,
      width: 10,
      height: 10
    };
  }

  set(style) {
    let newObj = Object.assign(
      this.state,
      style
    );
    this._tmpCanvas.resize(this.state.width, this.state.height);
    this.setState(newObj);
    
    return this;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = this.state.background;
		ctx.fillRect(0, 0, this.state.width, this.state.height);
    ctx.restore();
  }
}