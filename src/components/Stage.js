import GameObject from './GameObject';
import {Resource, Game} from '../constant';
import Rect from './Rectangle';

export default class Stage extends GameObject{
  constructor(props) {
    super(props);
    this._parent = props;
    this.state = {
      x: 0,
      y: 0,
      width: null,
      height: null, // 以上為必須選項
      hp: 100, // 百分比
      offsetX: 0,
      offsetY: 0,
      hpWidth: 10,
      leftClick: 0,
      rightClick: 0
    };
  }

  set(data) {
    let newState = Object.assign({}, this.state, data);
    this.setState(newState);
    return this;
  }

  load() {
    let GameWidth = Game.window.width, GameHeight = Game.window.height;
    let offsetX = this.state.offsetX;
    let hpWidth = this.state.hpWidth;
    this._tmpCanvas.resize(GameWidth, GameHeight);
    // 元件集合包, 但是由於不了解 framework GameObject 運作, 只能添加到主場景, 管理難度可能增加
    this.component = {
      stageBg: new Rect(this._parent).set({
          x: 0,
          y: GameHeight * 0.5,
          width: GameWidth,
          height: GameHeight * 0.5,
          background: '#222222'
        }),
      stageBlock: new Rect(this._parent).set({
          x: offsetX + 10,
          y: GameHeight * 0.525,
          width: GameWidth - 20,
          height: (GameHeight*0.45),
          background: '#cfcfcf'
        }),
      stageCentLine: new Rect(this._parent).set({
          x: (GameWidth - hpWidth)/2,
          y: GameHeight*0.5,
          width: hpWidth,
          height: GameHeight * 0.5,
          background: '#fff'
        }),
      stageCentLineBlood: new Rect(this._parent).set({
          x: (GameWidth - hpWidth)/2,
          y: GameHeight - (GameHeight/2)*(this.state.hp/100),
          width: hpWidth,
          height: (GameHeight/2)*(this.state.hp/100),
          background: 'green'
        }),
      stageLeftClick: new Rect(this._parent).set({
        x: ((GameWidth - hpWidth)/2) * 0.5,
        y: (GameHeight * 0.5) + 15,
        width: ((GameWidth - hpWidth)/2) * 0.5,
        height: (GameHeight * 0.5) - 30,
        gradientBackground: [
          'rgba(244, 66, 116, 0)',
          'rgba(244, 66, 116, 0.5)'
        ]
      }).hide(),
      stageRightClick: new Rect(this._parent).set({
        x: ((GameWidth + hpWidth)/2),
        y: (GameHeight * 0.5) + 15,
        width: ((GameWidth - hpWidth)/2) * 0.5,
        height: (GameHeight * 0.5) - 30,
        gradientBackground: [
          'rgba(244, 66, 116, 0.5)',
          'rgba(244, 66, 116, 0)'
        ]
      }).hide()
    };
  }

  clickEffect(type = null) {
    // if (type !== null) {
    //   let element = (type)? this.component.stageRightClick: this.component.stageLeftClick
    //   element.hide()
    // }
  }

  fresh() {
    let state = this.state
    if (state.leftClick === 1)
      state.leftClick++
    else if(state.leftClick === 2)
      state.leftClick = 0
    if (state.rightClick === 1)
      state.rightClick++
    else if(state.rightClick === 2)
      state.rightClick = 0
  }

  render() {
    let GameWidth = Game.window.width, GameHeight = Game.window.height;
    this.component.stageCentLineBlood.set({
       height: (GameHeight/2)*(this.state.hp/100),
       y: GameHeight - (GameHeight/2)*(this.state.hp/100)
    });
    // if (this.state.leftClick)
    //   this.component.stageLeftClick.show()
    // else
    //   this.component.stageLeftClick.hide()
    // if (this.state.rightClick)
    //   this.component.stageRightClick.show()
    // else
    //   this.component.stageRightClick.hide()
  }
};
