import Framework, {ES6Trans} from './framework_es6';
import {Resource} from './constant';
import Img from './components/Img';
import Sprite from './components/Sprite';

class GamePlayScene extends ES6Trans {
  initializeProgressResource() {
    this.state = {
      frame: 0
    };
  }

  load() {
    new Sprite(this).set({
      url: Resource.image+'freeze.png',
      y: 0
    });
    this.component.character = new Sprite(this).set({
      url: Resource.image+'bisca_battler_rpg_maker_mv_by_retrospriteresources-dagd3xg.png',
      wPiece: 9,
      hPiece: 6,
      sprWidth: 200,
      sprHeight: 200,
      x: 900,
      y: 100
    });

  }

  update() {
    this.setState({
      frame: this.state.frame+0.1
    });
    if(this.state.frame>54) 
      this.setState({
        frame: 1
      });
    this.component.character.showPiece(this.state.frame);
  }

  render() {
  }
}

export default Framework.exClass(Framework.Level , new GamePlayScene().transClass());