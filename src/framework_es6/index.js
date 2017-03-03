import Core from '../../framework/core.js';
//import '../../framework/loadFramework';
import Config from  '../../framework/config.js';
import Record from '../../framework/Record.js';
import Replay from '../../framework/Replay.js';
import EqualCondition from '../../framework/EqualCondition.js';
import Util from '../../framework/Util.js';
import DebugInfo from '../../framework/DebugInfo.js';
import FpsAnalysis from '../../framework/FpsAnalysis.js';
import Point from  '../../framework/Point.js';
import GameObject from '../../framework/GameObject.js';
import Sprite from '../../framework/Sprite.js';
import AnimationSprite from '../../framework/animationSprite.js';
import Scene from '../../framework/Scene.js';
import ResourceManager from '../../framework/ResourceManager.js';
import Level from '../../framework/level.js';
import GameCore from '../../framework/Game.js'; //部分未修改完成
import MouseManager from '../../framework/MouseManager.js';
import KeyBoardManager from '../../framework/KeyBoardManager.js';
import TouchManager from '../../framework/TouchManager.js';
import GameMainMenu from '../../framework/gameMainMenu.js';
import Audio from '../../framework/Audio.js';
// import '../../framework/Box2dWeb-2.1.a.3.js';
import Box2D from '../../framework/Box2D.js';
import CircleComponent from '../../framework/circleComponent.js';
import PolygonComponent from '../../framework/polygonComponent.js';
import SquareComponent from '../../framework/squareComponent.js';
import TriangleComponent from '../../framework/triangleComponent.js';

class Game {
	constructor() {
		let FrameWork = Core;
		FrameWork = Config(FrameWork);
		FrameWork = Record(FrameWork);
		FrameWork = Record(FrameWork);
		FrameWork = EqualCondition(FrameWork);
		FrameWork = Util(FrameWork);
		FrameWork = DebugInfo(FrameWork);
		FrameWork = FpsAnalysis(FrameWork);
		FrameWork = Point(FrameWork);
		FrameWork = GameObject(FrameWork);
		FrameWork = Sprite(FrameWork);
		FrameWork = AnimationSprite(FrameWork);
		FrameWork = Scene(FrameWork);
		FrameWork = ResourceManager(FrameWork);
		FrameWork = Level(FrameWork);
		FrameWork = GameCore(FrameWork);
		FrameWork = MouseManager(FrameWork);
		FrameWork = KeyBoardManager(FrameWork);
		FrameWork = TouchManager(FrameWork);
		FrameWork = GameMainMenu(FrameWork);
		FrameWork = Audio(FrameWork);
		FrameWork = CircleComponent(FrameWork);
		FrameWork = PolygonComponent(FrameWork);
		FrameWork = SquareComponent(FrameWork);
		FrameWork = TriangleComponent(FrameWork);
		console.log(FrameWork)
	}
}

export default Game;