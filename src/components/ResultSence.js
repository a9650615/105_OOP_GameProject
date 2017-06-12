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

    this.audio = new Framework.Audio({
      
    });
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
    this.component.score.set({
      text: data
    });
    this.component.numberCritGreat.set({
      text: hit[0]+'x'
    });
    this.component.numberGreat.set({
      text: hit[1]+'x'
    });
    this.component.numberGood.set({
      text: hit[2]+'x'
    });
    this.component.numberBad.set({
      text: hit[3]+'x'
    });
    this.component.numberMiss.set({
      text: hit[4]+'x'
    });
    if(data >= 1000000){
      this.component.score.set({
        textColor: 'yellow',
        x: Game.window.width * 0.14,
      });
      this.component.rank.set({url: Resource.image+'rankX.png'})
      this.audio.play({name: 'complete', loop: false})
    }
    if(data >= 700000 && data < 1000000){
      this.component.score.set({
        textColor: 'white',
        x: Game.window.width * 0.15,
      });
      if(data >= 900000){
        this.component.rank.set({url: Resource.image+'rankS.png'})
      }
      if(data >= 850000 && data < 900000){
        this.component.rank.set({url: Resource.image+'rankA.png'})
      }
      if(data >= 800000 && data < 850000){
        this.component.rank.set({url: Resource.image+'rankB.png'})
      }
      if(data < 800000){
        this.component.rank.set({url: Resource.image+'rankC.png'})
      }
      this.audio.play({name: 'complete', loop: false})
    }
    if(data < 700000){
      this.component.score.set({
        textColor: 'red',
        x: Game.window.width * 0.15,
      });
      this.component.rank.set({url: Resource.image+'rankD.png'})
      this.audio.play({name: 'fail', loop: false})
    }
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
      rank: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'rankN.png',
        x: Game.window.width * 0.11,
        y: Game.window.width * 0.20          
      }),
      beatsCritGreat: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Critical_Great.png',
        x: Game.window.width * 0.45,
        y: Game.window.width * 0.10       
      }),
      numberCritGreat: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.57,
        y: Game.window.width * 0.0875,
        textColor: 'white',
        textSize: 64
      }),

      beatsGreat: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Great.png',
        x: Game.window.width * 0.70,
        y: Game.window.width * 0.10       
      }),
      numberGreat: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.82,
        y: Game.window.width * 0.0875,
        textColor: 'white',
        textSize: 64
      }),

      beatsGood: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Good.png',
        x: Game.window.width * 0.45,
        y: Game.window.width * 0.22,      
      }),
      numberGood: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.57,
        y: Game.window.width * 0.2075,
        textColor: 'white',
        textSize: 64
      }),

      beatsBad: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Bad.png',
        x: Game.window.width * 0.70,
        y: Game.window.width * 0.22      
      }),
      numberBad: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.82,
        y: Game.window.width * 0.2075,
        textColor: 'white',
        textSize: 64
      }),

      beatsMiss: new Img(this._parent).setParent(this.component.box).set({
        url: Resource.image+'Miss.png',
        x: Game.window.width * 0.45,
        y: Game.window.width * 0.34      
      }),
      numberMiss: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.57,
        y: Game.window.width * 0.3275,
        textColor: 'white',
        textSize: 64
      }),

      result: new Button(this._parent).setParent(this.component.box).set({
        text: "RANK:",
        x: Game.window.width * 0.09,
        y: Game.window.width * 0.1,
        textColor: 'white',
        textSize: 64
      }),

      score: new Button(this._parent).setParent(this.component.box).set({
        text: "debugtext",
        x: Game.window.width * 0.16,
        y: Game.window.width * 0.36,
        textColor: 'white',
        textSize: 64
      })
    })
    Object.assign(this.component, {
      back: new Button(this._parent).setParent(this.component.box).set({
        text: "回主選單",
        x: Game.window.width * 0.46,
        y: Game.window.width * 0.45,
        textColor: 'white'
      }).setEvent('click', (e) => {
        this.audio.pause('complete')
        Framework.Game.goToLevel("selectMusic")
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