import GameObject from './GameObject'
import { Game, Resource } from '../constant'
import Rect from './Rectangle'
import Text from './Text'
import Button from './Button'
import Ani from '../helper/Ani'
import Img from './Img';

export default class SelectCard extends GameObject {
  constructor(props) {
    super(props)
    this._parent = props;
    Object.assign(this.state, {
      offset: 0,
      aniOffset: null,
      card: {
        height: 200,
        width: 300
      },
      margin: 10,
      viewRange: 1
    })

    this.ani = new Ani(this)
    // this.ani = new Ani(this).setAction({
    //   slide: [
    //     {offsetY: 0},
    //     {offsetY: 70},
    //     {offsetY: 100}
    //   ]
    // })

    // this.ani.call('slide', 2)
    
    // this.ani.on('slide', (data) => {
    //   console.log(data)
    // })
  }
  
  loadFromList(data) {
    data.forEach(function(element, i) {
      let song = element.songMeta[0]
      let name = element.songName
      // console.log(element.songMeta[0].difficulty)
      let color ='rgba(47,47,47,0.7)'
      switch(element.songMeta[0].difficulty){
        case "default":
          color = 'rgba(32,32,255,0.7)';
        break;
        case "easy":
          color = 'rgba(0,192,0,0.7)';
        break; 
        case "normal":
          color = 'rgba(255,128,0,0.7)';
        break; 
        case "hard":
          color = 'rgba(216,0,0,0.7)';
        break; 
      }
      let component = {
        background: new Rect(this._parent).setParent(this).set({
          width: this.state.card.width,
          height: this.state.card.height,
          y: this.state.y + (this.state.card.height+this.state.margin) * i,
          // x: this.state.x,
          background: color
        })
      }
      component['songTitle'] = 
        new Button(this._parent).setParent(component.background).set({
          text: name + "[" + element.songMeta[0].difficulty+ "]",
          x: 20,
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
    // if (data.offset && data.offset !== this.state.offset) {
    //   this.ani.fromTo({aniOffset: this.state.aniOffset}, {aniOffset: data.offset}, 1, (data) => {
    //     console.log(data)
    //     this.setState(data)
    //   }, 'sildeTest')
    // }
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
      let cutIndex = i - (this.state.aniOffset || this.state.offset);
      
      if ( cutIndex < this.state.viewRange && cutIndex >= this.state.viewRange * -1) {
        if (parseInt(cutIndex) == 0) {
          // this.ani.fromTo({width: this.state.card.width}, {width: 400}, 1, data => {
          //   val.background.set(data)
          // }, 'menu')
          val.background.set({width: 400})
        } else {
          val.background.set({width: this.state.card.width})
        }
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