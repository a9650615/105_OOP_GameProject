import GameObject from './GameObject'
import { Game } from '../constant'
import Rect from './Rectangle'
import Text from './Text'
import Button from './Button'
import Ani from '../helper/Ani'

export default class SelectCard extends GameObject {
  constructor(props) {
    super(props)
    this._parent = props;
    Object.assign(this.state, {
      offset: 0,
      card: {
        height: 200,
        width: 300
      },
      margin: 10,
      viewRange: 1
    })

    this.ani = new Ani(this).setAction({
      slide: [
        {offsetY: 0},
        {offsetY: 100}
      ]
    })

    // this.ani.call('slide')
    // this.ani.on('slide', () => {
    //   console.log('slide')
    // })
  }
  
  loadFromList(data) {
    data.forEach(function(element, i) {
      let song = element.songMeta[0]
      let name = element.songName
      let component = {
        background: new Rect(this._parent).setParent(this).set({
          width: this.state.card.width,
          height: this.state.card.height,
          y: this.state.y + (this.state.card.height+this.state.margin) * i,
          // x: this.state.x,
          background: '#4286f4'
        })
      }
      component['songTitle'] = 
        new Button(this._parent).setParent(component.background).set({
          text: name,
          x: 30,
          y: 30,
          // y: this.state.y + (this.state.card.height+this.state.margin) * i + 30,
          textColor: '#fff'
        })

      this.component.cardElement.push(component)
    }, this);
    return this
  }

  load() {
    this.component = {
      cardElement: []
    }
  }

  set(data = {}) {
    this.setState(data);
    if (data.width || data.height)
      this._tmpCanvas.resize(this.state.width, this.state.height);
    let viewNum = Math.ceil(this.state.height / (this.state.card.height + this.state.margin));
    this.setState({
      viewRange: viewNum
    })
    return this;
  }

  update() {
    this.ani.update()
  }

  render() {
    this.component.cardElement.forEach((val, i) => {
      let cutIndex = i - this.state.offset;
      
      if ( cutIndex < this.state.viewRange && cutIndex >= this.state.viewRange * -1) {
        val.background.show()
        val.background.set({
          y: (this.state.card.height+this.state.margin) * cutIndex+ Game.window.height / 2 - this.state.card.height / 2
        })
      }
      else
        val.background.hide()
    }, this)
    // this.component.background.set({
    //   y: this.state.y,
    //   x: this.state.x
    // })

    // this.component.songTitle.set({
    //   y: this.state.y + 30,
    //   text: this.state.songName
    // })
  }
}