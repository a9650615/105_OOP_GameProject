import GameObject from './GameObject';

export default class Rectangle extends GameObject {
  constructor(prop) {
    super(prop);
    Object.assign(this.state, {
      background: null,
      borderWidth: 0,
      borderColor: null,
      borderRadius: 0,
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      gradientBackground: null
    })
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
    if (this.state.gradientBackground !== null) {
      let grad = ctx.createLinearGradient(0, this.state.height*0.5, this.state.width, this.state.height*0.5)
      let divide = 1/this.state.gradientBackground.length;
      grad.addColorStop(0, this.state.gradientBackground[0])
      for (let i in this.state.gradientBackground) {
        if (i > 0)
        grad.addColorStop((parseInt(i)+1)*divide, this.state.gradientBackground[i])
      }
      ctx.fillStyle = grad
    }
    else
      ctx.fillStyle = this.state.background;
		ctx.fillRect(0, 0, this.state.width, this.state.height);
    ctx.restore();
  }
}