import GameObject from './GameObject'
import Rect from './Rectangle'
import Text from './Text'
import Button from './Button'

export default class SelectCard extends GameObject {
  constructor(props) {
    super(props)
    this._parent = props;
    Object.assign(this.state, {
      songName: 'songName'
    })
  }

  load() {
    this.component = {
      background: new Rect(this._parent).set({
        width: this.state.width,
        height: this.state.height,
        y: this.state.y,
        x: this.state.x,
        background: '#4286f4'
      }),
      songTitle: new Button(this._parent).set({
        text: this.state.songName,
        x: this.state.x + 30,
        y: this.state.y + 30,
        textColor: '#fff'
      }),
    }
  }

  set(data) {
    this.setState(data);
    return this;
  }

  fresh() {

  }

  render() {
    this.component.background.set({
      y: this.state.y,
      x: this.state.x
    })

    this.component.songTitle.set({
      y: this.state.y + 30,
      text: this.state.songName
    })
  }
}