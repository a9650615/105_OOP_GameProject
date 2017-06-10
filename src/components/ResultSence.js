import GameObject from './GameObject'
import Button from './Button';
import { Game } from '../constant'
import Rect from './Rectangle'

export default class ResultSence extends GameObject {
  constructor(props) {
    super(props)
    this._parent = props;
    // Object.assign(this.state, {

    // })
    this.component = {
        box : new Rect(this._parent).set({
        background: 'rgba(0,0,0,0)',
        width: Game.window.width,
        height: Game.window.height,
        x: 0,
        y: 0
      })
    }
  }

  hide() {
    this._gameObject.hide = true
    this.component.box.hide()
    return this
  }

  show() {
    this._gameObject.hide = false
    this.component.box.show()
    return this
  }

  set(data) {
    this.setState(data)
  }

  setScore(data) {
    this.component.result.set({
            text:'Total:' + data
    });
  }

  load() {
    this._tmpCanvas.resize(Game.window.width, Game.window.height);
    Object.assign(this.component,{
      // background: new Rect(this._parent).setParent(this).set({
      //   background: 'rgba(0,0,0,0.4)',
      //   width: Game.window.width,
      //   height: Game.window.height,
      //   x: 0,
      //   y: 0
      // }),
      menu: new Rect(this._parent).setParent(this.component.box).set({
        background: '#101010',
        width: Game.window.width * 0.9,
        height: Game.window.height * 0.8,
        x: Game.window.width * 0.05,
        y: Game.window.width * 0.05
      })
    })
    Object.assign(this.component, {
      back: new Button(this._parent).setParent(this.component.box).set({
        text: "回主選單",
          x: Game.window.width * 0.46,
          y: Game.window.width * 0.45,
          textColor: 'white'
      }).setEvent('click', (e) => {
        Framework.Game.goToLevel("mainMenu")
      })
    })
    Object.assign(this.component, {
      result: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
          x: Game.window.width * 0.15,
          y: Game.window.width * 0.25,
          textColor: 'white'
      })
    })
    // document.body.appendChild(this._tmpCanvas.element()) 
  }

  update() {
    this.component.back._gameObject.hide = this._gameObject.hide
  }

  render() {
    
  }
}