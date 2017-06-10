import GameObject from './GameObject'
import Button from './Button';
import { Resource } from '../constant'
import { Game } from '../constant'
import Rect from './Rectangle'
import Img from './Img';
import SilderStage from './SilderStage';

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

  setScore(data, hit) {
    this.component.result.set({
      text: 'Total:' + data
    });
    this.component.numberCritGreat.set({
      text: hit[0]
    });
    this.component.numberGreat.set({
      text: hit[1]
    });
    this.component.numberGood.set({
      text: hit[2]
    });
    this.component.numberBad.set({
      text: hit[3]
    });
    this.component.numberMiss.set({
      text: hit[4]
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
      }),

      beatsCritGreat: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Critical_Great.png',
        x: Game.window.width * 0.40,
        y: Game.window.width * 0.10       
      }),
      numberCritGreat: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.52,
        y: Game.window.width * 0.11,
        textColor: 'white'
      }),

      beatsGreat: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Great.png',
        x: Game.window.width * 0.65,
        y: Game.window.width * 0.10       
      }),
      numberGreat: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.77,
        y: Game.window.width * 0.11,
        textColor: 'white'
      }),

      beatsGood: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Good.png',
        x: Game.window.width * 0.40,
        y: Game.window.width * 0.22,      
      }),
      numberGood: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.52,
        y: Game.window.width * 0.23,
        textColor: 'white'
      }),

      beatsBad: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Bad.png',
        x: Game.window.width * 0.65,
        y: Game.window.width * 0.22      
      }),
      numberBad: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.77,
        y: Game.window.width * 0.23,
        textColor: 'white'
      }),

      beatsMiss: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Miss.png',
        x: Game.window.width * 0.40,
        y: Game.window.width * 0.34      
      }),
      numberMiss: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.52,
        y: Game.window.width * 0.35,
        textColor: 'white'
      }),

      result: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.15,
        y: Game.window.width * 0.25,
        textColor: 'white'
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
    // document.body.appendChild(this._tmpCanvas.element()) 
  }

  update() {
    this.component.back._gameObject.hide = this._gameObject.hide
  }

  render() {
    
  }
}