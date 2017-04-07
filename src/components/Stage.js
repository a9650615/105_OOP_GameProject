import GameObject from './GameObject';
import {Resource, Game} from '../constant';
import Rectangle from './Rectangle';

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
      offsetY: 0
    };
  }

  set(data) {
    let newState = Object.assign({}, this.state, data);
    this.setState(newState);
  }

  load() {
    let GameWidth = Game.window.width, GameHeight = Game.window.height;
    let offsetX = this.state.offsetX;
    this._tmpCanvas.resize(GameWidth, GameHeight);
    // 元件集合包, 但是由於不了解 framework GameObject 運作, 只能添加到主場景, 管理難度可能增加
    this.component = {
      stageBg: new Rectangle(this._parent).set({
          x: 0,
          y: GameHeight * 0.5,
          width: GameWidth,
          height: GameHeight * 0.5,
          background: '#222222'
        }),
      stageBlock: new Rectangle(this._parent).set({
          x: offsetX + 10,
          y: GameHeight * 0.525,
          width: GameWidth - 20,
          height: (GameHeight*0.45),
          background: '#cfcfcf'
        }),
      stageCentLine: new Rectangle(this._parent).set({
          x: (GameWidth - 10)/2,
          y: GameHeight*0.5,
          width: 10,
          height: GameHeight * 0.5,
          background: '#fff'
        }),
      stageCentLineBlood: new Rectangle(this._parent).set({
          x: (GameWidth - 10)/2,
          y: GameHeight - (GameHeight/2)*(this.state.hp/100),
          width: 10,
          height: (GameHeight/2)*(this.state.hp/100),
          background: 'green'
        }),
    };
  }

  render() {
    let GameWidth = Game.window.width, GameHeight = Game.window.height;
    this.component.stageCentLineBlood.set({
       height: (GameHeight/2)*(this.state.hp/100),
       y: GameHeight - (GameHeight/2)*(this.state.hp/100)
    });
  }
};
