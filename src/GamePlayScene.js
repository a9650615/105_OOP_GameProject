import Framework, {ES6Trans} from './framework_es6';
import {Resource} from './constant';
import Img from './components/Img';

class GamePlayScene extends ES6Trans {
  constructor(props) {
    super(props);
    
  }

  load() {
    new Img(this).set({
      url: Resource.image+'background.jpg'
    }).show();
    console.log(this.rootScene);
  }

  render() {

  }
}

export default Framework.exClass(Framework.Level , new GamePlayScene().transClass());