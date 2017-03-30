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
			buttonHeight: 0,
			buttonWidth: 0,
			background: null
		};
		
		this.text = new Text();
	}
	
	set(option = {}) {
		this.text.setStyle(Object.assign(this.state, option)).setText(option.text||this.state.text);

		this.setState(Object.assign(option, {
			buttonWidth: this.text.getWidth(),
			buttonHeight: this.text.getHeight()
		}));
		this.load(this.super);

		return this;
	}

	getWidth() {return this.text.getWidth();}
	getHeight() {return this.text.getHeight();}
	
	load() {
	}

	_checkMouseIsIn(e) {
		this.previousTouch = { x: e.x, y: e.y };
		if (this.previousTouch.x > this.state.x && 
				this.previousTouch.x < this.state.x + this.state.buttonWidth && 
				this.previousTouch.y > this.state.y && 
				this.previousTouch.y < this.state.y + this.state.buttonHeight ) 
			return true;
			
		return false;
	}
	
	checkClick(e) {
		return this._checkMouseIsIn(e);
	}

	render(ctx) {
		if(this.state.background) {
			ctx.save();
			ctx.fillStyle = this.state.background;
			ctx.fillRect(this.state.x, this.state.y, this.state.buttonWidth, this.state.buttonHeight);
			ctx.restore();
		}
		this.text.render(ctx);
	}

	// mousemove(e) {

  // }
}