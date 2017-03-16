import Framework, {ES6Trans} from './framework_es6';
import DebugTest from './DebugTest';
import mainMenu from './mainMenu';
import beatsMapMaker from './beatsMapMaker';

//Framework.Game.addNewLevel({menu: new mainMenu()});
Framework.Game.addNewLevel({beatsMapMaker: new beatsMapMaker()});
Framework.Game.start();
Framework.Game.goToLevel("beatsMapMaker")