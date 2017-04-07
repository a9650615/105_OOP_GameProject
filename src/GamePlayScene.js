import Framework, {ES6Trans} from './framework_es6';
import {Resource, Game} from './constant';
import BeatsMapParser from './modules/BeatsMapParser';
import Img from './components/Img';
import Sprite from './components/Sprite';
import Stage from './components/Stage';

class GamePlayScene extends ES6Trans {
  initializeProgressResource() {
    this.state = {
      frame: 0,
      hp: 100 //百分比
    };
    new BeatsMapParser(Resource.songs+'沢井美空 - カラフル/沢井美空 - カラフル[default].json').then((data) => {
      console.log(data);
    });
  }

  characterUpdate() {
    let list = [1,2,3,4,5,6,4,3,2,1];
    this.setState({
      frame: this.state.frame+0.1
    });
    if(this.state.frame>list.length) 
      this.setState({
        frame: 1
      });
    this.component.character.showPiece(list[parseInt(this.state.frame)]);
  }

  load() {
    let GameWidth = Game.window.width, GameHeight = Game.window.height;
    new Img(this).set({
      url: Resource.image+'/background.jpg',
      x: 0,
      y: -200,
      width: 1920
    });
    this.component.stage = new Stage(this);
    this.component.character = new Sprite(this).set({
      url: Resource.image+'bisca_battler_rpg_maker_mv_by_retrospriteresources-dagd3xg.png',
      wPiece: 9,
      hPiece: 6,
      sprWidth: 120,
      sprHeight: 120,
      x: (Game.window.width-120)/2,
      y: GameHeight * 0.2
    });

  }

  update() {
    this.characterUpdate();
    if(this.state.hp>0) {
      // 扣血範例
      this.setState({
        hp: this.state.hp - 0.01
      });
    }
  }

  render() {
    this.component.stage.set({
      hp: this.state.hp
    });
  }
}

export default Framework.exClass(Framework.Level , new GamePlayScene().transClass());
