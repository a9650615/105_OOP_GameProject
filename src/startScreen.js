import Framework, {ES6Trans} from './framework_es6';
import { Resource , Game } from './constant';
import Button from './components/Button';
import Rect from './components/Rectangle'

class startScreen extends ES6Trans {
  initialize() {
    this.audio = new Framework.Audio({
      ready:{
        mp3: Resource.sounds+'ready.wav'
      }
    })
  }

	load() {
		this.component = {
			background: new Rect(this).set({
				x: 0,
				y: 0,
				background: '#000000',
				width: Game.window.width,
				height: Game.window.height
			}),
			start: new Button(this).set({
        text: "> Press Enter or click here !!<",
        x: Game.window.width * 0.5,
        y: Game.window.height * 0.85,
        textSize: 40,
        textColor: '#ffffff',
				textFont: '微軟正黑體'
      }).setEvent('click', (e) => {
        this.audio.play({name: 'ready', loop: false})
        setTimeout(() => {
          Framework.Game.goToLevel("selectMusic")
        }, 500)
      })
		}
	}

	onkeydown(e) {
		if (e.key === 'Enter') {
      this.audio.play({name: 'ready', loop: false})
      setTimeout(() => {
        Framework.Game.goToLevel("selectMusic")
      }, 500)
    }
	}

	fresh() {

	}

  render() {
		
  }
}

export default Framework.exClass(Framework.GameMainMenu , new startScreen().transClass());