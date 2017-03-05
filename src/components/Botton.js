import Element from './Element';
import Text from './Text';

export default class Botton extends Element{
	constructor(prop) {
		super(prop);
	}

	initialize() {
		this.botton = {
			textSize: 10,
			width: 20,
			height: 15,
			x: 20,
			y: 20,
			text: '按鈕',
			textSize: 15
		};
	}
	
	set(option = {}) {
		this.botton = option;
		this.width = this.botton.textSize * 2;
		this.height = this.botton.textSize + 10;
		this.load(this.super);

		return this;
	}

	
	load(ctx) {
		this.text = new Text(ctx).setStyle({
			x: this.botton.x,
			y: this.botton.y
		}).setText(this.botton.text);
		
	}

	draw(ctx) {
		console.log('text draw')
		this.text.draw(ctx);
	}

	click(e) {
		this.previousTouch = { x: e.x, y: e.y };
		if (this.previousTouch.x > this.botton.x && 
				this.previousTouch.x < this.botton.x + this.botton.width && 
				this.previousTouch.y > this.botton.y && 
				this.previousTouch.y < this.botton.y + this.botton.height ) {
			console.log('t')
			return true;
		}
	}
}
