import GameObject from './GameObject';
import Text from './Text';

export default class Botton extends GameObject {
  constructor(prop) {
		super(prop);
		this.botton = {
			textSize: 10,
			width: 20,
			height: 15,
			x: 0,
			y: 0,
			text: '按鈕',
			textSize: 15
		};
		
		this.text = new Text();
	}
	
	set(option = {}) {
		this.botton = Object.assign(this.botton, option);
		this.text.setStyle({
			x: this.botton.x,
			y: this.botton.y,
			color: 'white'
		}).setText(this.botton.text)
		this.bottonWidth = this.text.getWidth();
		this.bottonHeight = this.botton.textSize + 10;
		this.load(this.super);

		return this;
	}

	
	load() {
	}

	_checkMouseIsIn(e) {
		this.previousTouch = { x: e.x, y: e.y };
		if (this.previousTouch.x > this.botton.x && 
				this.previousTouch.x < this.botton.x + this.bottonWidth && 
				this.previousTouch.y > this.botton.y && 
				this.previousTouch.y < this.botton.y + this.bottonHeight ) 
			return true;
	}
	
	click(e) {
		return this._checkMouseIsIn(e);
	}

	draw(ctx) {
		ctx.fillStyle="#962565";
		ctx.fillRect(this.botton.x, this.botton.y, this.bottonWidth, this.bottonHeight);
		this.text.draw(ctx);
	}

	// mousemove(e) {

  // }
}