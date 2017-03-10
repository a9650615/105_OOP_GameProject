import GameObject from './GameObject';
import Text from './Text';

export default class Botton extends GameObject {
  constructor(prop) {
		super(prop);
		this.state = {
			textSize: 10,
			width: 20,
			height: 15,
			x: 0,
			y: 0,
			text: '按鈕',
			textColor: null,
			textSize: 25,
			bottonHeight: 0,
			bottonWidth: 0,
			background: '#962565'
		};
		
		this.text = new Text();
	}
	
	set(option = {}) {
		this.text.setStyle(Object.assign(this.state, option)).setText(option.text);

		this.setState(Object.assign(option, {
			bottonWidth: this.text.getWidth(),
			bottonHeight: this.text.getHeight()
		}));
		this.load(this.super);

		return this;
	}

	
	load() {
	}

	_checkMouseIsIn(e) {
		this.previousTouch = { x: e.x, y: e.y };
		if (this.previousTouch.x > this.state.x && 
				this.previousTouch.x < this.state.x + this.bottonWidth && 
				this.previousTouch.y > this.state.y && 
				this.previousTouch.y < this.state.y + this.bottonHeight ) 
			return true;
	}
	
	click(e) {
		return this._checkMouseIsIn(e);
	}

	render(ctx) {
		ctx.fillStyle = this.state.background;
		ctx.fillRect(this.state.x, this.state.y, this.state.bottonWidth, this.state.bottonHeight);
		this.text.render(ctx);
	}

	// mousemove(e) {

  // }
}