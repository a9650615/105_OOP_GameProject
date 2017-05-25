import GameObject from './GameObject'
import { Game } from '../constant'
import Rect from './Rectangle'

export default class SystemMenu extends GameObject {
  constructor(props) {
    super(props)
    this._parent = props;
    // Object.assign(this.state, {

    // })
    this.component = {
        box : new Rect(this._parent).set({
        background: 'rgba(0,0,0,0.5)',
        width: Game.window.width,
        height: Game.window.height,
        x: 0,
        y: 0
      })
    }
  }

  hide() {
    this.component.box.hide()
    return this
  }

  show() {
    this.component.box.show()
    return this
  }

  set(data) {
    this.setState(data)
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
        background: '#ffffff',
        width: Game.window.width * 0.4,
        height: Game.window.height* 0.5,
        x: Game.window.width * 0.3,
        y: Game.window.width * 0.1
      })
    })
    // document.body.appendChild(this._tmpCanvas.element()) 
  }

  fresh() {
    
  }

  render() {
    let state = this.state
    this.component.box.set({
      opacity: state.opacity,
    })
    this.component.menu.set({
      width: state.menuScale?state.menuScale * 0.4 * Game.window.width: 0.4 * Game.window.width,
      x: (state.menuScale?((1-state.menuScale) * 0.5):0) * Game.window.width * 0.4 + Game.window.width * 0.3
    })
    // console.log('caller render')
  }
}