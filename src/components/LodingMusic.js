import GameObject from './GameObject'
import Button from './Button'
import {Game} from '../constant'
import Rect from './Rectangle'
import Ani from '../helper/Ani'

class LoadingMusic extends GameObject {
	constructor(props) {
		super(props)
		this._parent = props
		Object.assign(this.state, {
			songName: '歌曲名稱',
			x: 0,
			y: Game.window.height * 0.7
		})
		
		this.component = {
			background: new Rect(this._parent).setParent(this).set({
				background: 'rgba(96, 157, 178, 0.5)',
				x: 0,
				y: 0,
				width: Game.window.width,
				height: Game.window.height * 0.3
			}),
			songText: new Button(this._parent).setParent(this).set({
        x: 100,
        y: 30,
				textSize: 40,
        textColor: 'white',
        text: 'Song Name'
      }),
		}

		this._tmpCanvas.resize(Game.window.width, Game.window.height * 0.3)

		this.ani = new Ani()
		// document.body.appendChild(this._tmpCanvas.element())
	}
	
	slideIn() {
		this.ani.fromTo({per: 100}, {per: 70}, 0.4, (data) => {
			this.setState({
				y: Game.window.height * data.per/100
			})
		}, 'slide')
	}

	slideOut() {
		return this.ani.fromTo({per: 70}, {per: 100}, 0.4, (data) => {
			this.setState({
				y: Game.window.height * data.per/100
			})
		}, 'slide', 2)
	}

	update() {
		this.ani.update()
	}

	set(data) {
		this.setState(data)
	}
	
	render() {
		this.component.songText.set({
			text: this.state.songName
		})
	}
}

export default LoadingMusic