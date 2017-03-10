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
		let FrameWork = {};
		Core(FrameWork);
		FrameWork = Config(FrameWork);
		FrameWork = Record(FrameWork);
		FrameWork = Replay(FrameWork);
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

		return FrameWork;
	}
}

class ObjectCompare {
  _compareInside(objA, objB, param) {
    var param_objA = objA[param],
    param_objB = (typeof objB[param] === "undefined") ? false : objB[param];

    switch(typeof objA[param]){
      case "object": return (compare_objects(param_objA, param_objB));
      case "function": return (param_objA.toString() === param_objB.toString());
      default: return (param_objA.toString() === param_objB.toString());
    }
  }

  compare(obj1, obj2) {
    let parameter_name;
  
    if (!obj1 || !obj2) return true; /* obj1 and obj2 are not null */
  
    for(parameter_name in obj1){
      if(typeof obj2[parameter_name] === "undefined" || !this._compareInside(obj1, obj2, parameter_name)){
        return false;
      }
    }
  
    for(parameter_name in obj2){
      if(typeof obj1[parameter_name] === "undefined" || !this._compareInside(obj1, obj2, parameter_name)){
        return false;
      }
    }

    return true;
  }
}

export let ES6Trans =  class Es6Trans {
	// 將 class 轉換成 Object
	transClass() {
		let props = {};
		let obj;

		Object.getOwnPropertyNames(Object.getPrototypeOf(this))
			.forEach((val) => {
				props[val] = this[val];
			})

		props['state'] = Object();
		props['setState'] = this.setState;
		props['draw'] = this.draw;
		props['update'] = this.update;

		return props;
	}
	// 繪製畫面
	draw(parentCtx) { 
      //this.rootScene.draw();一定要在第一行
			this.ctx = parentCtx;
      this.rootScene.draw(parentCtx);
			this.render(parentCtx);
  }

	update() {
		this.rootScene.update();
	}

	/**
   * 更改狀態 並判斷更新畫面
   * @param {Object} state 
	 * @return {Boolen} true
   */
  setState(state = {}) {
		let res = new ObjectCompare().compare(
      this.state,
			state
    );

		if (res)
			this.state = Object.assign(this.state, state);

		if (this.ctx) 
			this.draw(this.ctx);
		return res;
  }
}

Game.ES6Trans = ES6Trans;
export default new Game;
