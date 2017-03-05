import Framework, {ES6Trans} from './framework_es6';
import mainMenu from './mainMenu';

Framework.Game.addNewLevel({menu: new mainMenu()});
Framework.Game.start();