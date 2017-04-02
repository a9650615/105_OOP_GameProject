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
    this.component.character = new Sprite(this).set({
      url: Resource.image+'freeze.png',
      wPiece: 10,
      hPiece: 7,
      sprWidth: 200,
      sprHeight: 200,
      x: 900,
      y: 100
    });

    new Sprite(this).set({
      url: Resource.image+'freeze.png',
      y: 100
    });
  }

  update() {
    this.setState({
      frame: this.state.frame+0.1
    });
    if(this.state.frame>69) 
      this.setState({
        frame: 0
      });
  }

  render() {
    this.component.character.showPiece(this.state.frame);
  }
}

export default Framework.exClass(Framework.Level , new GamePlayScene().transClass());