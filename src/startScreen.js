import Framework, {ES6Trans} from './framework_es6';
import Button from './components/Button';
import Rect from './components/Rectangle'
import {Game} from './constant';

class startScreen extends ES6Trans {
  initialize() {

  }

	load() {
		this.component = {
			background: new Rect(this).set({
				x: 0,
				y: 0,
				background: '#222',
				width: Game.window.width,
				height: Game.window.height
			}),
			toturial: new Button(this).set({
        text: "上下選擇歌曲, Enter 鍵進入, q e 進行遊戲, esc 暫停選單",
        x: Game.window.width * 0.4,
        y: Game.window.height * 0.9,
        textColor: '#91dfff',
				textFont: '微軟正黑體'
      }),
			start: new Button(this).set({
        text: "開始遊戲",
        x: Game.window.width * 0.45,
        y: Game.window.height * 0.5,
        textColor: '#91dfff',
				textFont: '微軟正黑體'
      }).setEvent('click', (e) => {
        Framework.Game.goToLevel("selectMusic")
      })
		}
	}

	onkeydown(e) {
		if (e.key === 'Enter') {
      this.audio.play({name: 'ready', loop: false})
      setTimeout(() => {
        Framework.Game.goToLevel("GamePlayScene")
      }, 500)
    }
	}

	fresh() {

	}

  render() {
		
  }
}

export default Framework.exClass(Framework.GameMainMenu , new startScreen().transClass());